YUI.add('aui-undo-redo', function (A, NAME) {

/**
 * The Undo/Redo Component
 *
 * @module aui-undo-redo
 */

/**
 * Fired after a redo has finished running.
 *
 * @event afterRedo
 */

/**
 * Fired after an undo has finished running.
 *
 * @event afterUndo
 */

/**
 * Fired right before a redo is run.
 *
 * @event beforeRedo
 * @preventable _defBeforeActionFn
 */

/**
 * Fired right before an undo is run.
 *
 * @event beforeUndo
 * @preventable _defBeforeActionFn
 */

A.UndoRedo = A.Base.create('undo-redo', A.Base, [], {
    ACTION_TYPE_REDO: 'redo',
    ACTION_TYPE_UNDO: 'undo',

    AFTER_REDO: 'afterRedo',
    AFTER_UNDO: 'afterUndo',
    BEFORE_REDO: 'beforeRedo',
    BEFORE_UNDO: 'beforeUndo',

    EVENT_PREFIX_AFTER: 'after',
    EVENT_PREFIX_BEFORE: 'before',

    /**
     * This index points to the last state that was executed. Calling undo()
     * will undo the state this index points to.
     *
     * @property _currentStateIndex
     * @type {Number}
     * @protected
     */
    _currentStateIndex: -1,

    /**
     * List of pending actions.
     *
     * @property _pendingActions
     * @type {Array}
     * @protected
     */
    _pendingActions: null,

    /**
     * List of states containing `undo` and `redo` action methods added by the
     * user through the `add` method.
     *
     * @property _states
     * @type {Array}
     * @protected
     */
    _states: null,

    /**
     * Constructor for the Undo/Redo component.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.clearHistory();

        this.publish({
            afterRedo: {},
            afterUndo: {},
            beforeRedo: {
                defaultFn: this._defBeforeActionFn,
                preventedFn: this._prevBeforeActionFn
            },
            beforeUndo: {
                defaultFn: this._defBeforeActionFn,
                preventedFn: this._prevBeforeActionFn
            }
        });

        this.after('maxUndoDepthChange', this._removeStatesBeyondMaxDepth);
    },

    /**
     * Adds a state to the stack and makes it the current state. Note that all
     * states that could be redone will be removed from the stack after this.
     * Valid states are objects that have at least 2 functions: undo and redo.
     * These functions can return promises, in which case any subsequent calls
     * will be queued, waiting for all pending promises to end.
     *
     * @method add
     * @param {Object | Function} state Object that contains `undo` and `redo`
     *     action methods (and, optionally, a 'merge' method).
     */
    add: function(state) {
        if (!state.undo || !state.redo) {
            throw new Error('Invalid state. States used in UndoRedo need to ' +
                'have both the \'undo\'  and the \'redo\' functions defined');
        }

        if (this._currentStateIndex < this._states.length - 1) {
            // First remove all states after the current one, since
            // those can't be redone anymore now that a new state was added.
            this._states = this._states.slice(0, this._currentStateIndex + 1);
        }

        if (this._tryMerge(state)) {
            // We shouldn't add the state again if it was already merged.
            return;
        }

        this._states.push(state);
        this._currentStateIndex++;
        this._removeStatesBeyondMaxDepth();
    },

    /**
     * Checks if it's possible to redo an action.
     *
     * @method canRedo
     * @return {Boolean}
     */
    canRedo: function() {
        return this._currentStateIndex < this._states.length - 1 && !this._shouldIgnoreNewActions();
    },

    /**
     * Checks if it's possible to undo an action.
     *
     * @method canUndo
     * @return {Boolean}
     */
    canUndo: function() {
        return this._currentStateIndex >= 0 && !this._shouldIgnoreNewActions();
    },

    /**
     * Resets the stack, clearing all states and pending actions.
     *
     * @method clearHistory
     */
    clearHistory: function() {
        this._states = [];
        this._pendingActions = [];
        this._currentStateIndex = -1;
    },

    /**
     * Checks if either an undo or a redo action is currently in progress.
     *
     * @method isActionInProgress
     * @return {Boolean}
     */
    isActionInProgress: function() {
        return this._pendingActions.length > 0;
    },

    /**
     * Redoes the next state.
     *
     * @method redo
     * @return {Boolean} Returns false if there was no state to be redone and
     *     true, otherwise.
     */
    redo: function() {
        if (!this.canRedo()) {
            return false;
        }

        this._currentStateIndex++;
        this._runAction({
            state: this._states[this._currentStateIndex],
            type: this.ACTION_TYPE_REDO,
            undoIndex: this._currentStateIndex - 1
        });

        return true;
    },

    /**
     * Returns the state that will be redone when calling redo().
     *
     * @method redoPeek
     * @return {Boolean}
     */
    redoPeek: function() {
        return this._states[this._currentStateIndex + 1];
    },

    /**
     * Undoes the last state.
     *
     * @method undo
     * @return {Boolean} Returns false if there was no state to be undone and
     *     true, otherwise.
     */
    undo: function() {
        if (!this.canUndo()) {
            return false;
        }

        this._runAction({
            state: this._states[this._currentStateIndex],
            type: this.ACTION_TYPE_UNDO,
            undoIndex: this._currentStateIndex
        });
        this._currentStateIndex--;

        return true;
    },

    /**
     * Returns the state that will be undone when calling undo().
     *
     * @method undoPeek
     * @return {Boolean}
     */
    undoPeek: function() {
        return this._states[this._currentStateIndex];
    },

    /**
     * Executes right after an action finishes running.
     *
     * @method _afterAction
     * @param {Object} action Object containing the `state` and action `type`
     *     (undo or redo) to be executed.
     * @protected
     */
    _afterAction: function(action) {
        this.fire(this._makeEventName(this.EVENT_PREFIX_AFTER, action.type));

        this._pendingActions.shift();
        this._removeStatesBeyondMaxDepth();
        this._runNextPendingAction();
    },

    /**
     * This is the default function for the beforeUndo and beforeRedo events.
     *
     * @method _defBeforeActionFn
     * @param {EventFacade} event
     * @protected
     */
    _defBeforeActionFn: function() {
        var action = this._pendingActions[0],
            result = action.state[action.type]();

        if (A.Promise.isPromise(result)) {
            result.then(A.bind(this._afterAction, this, action));
        }
        else {
            this._afterAction(action);
        }
    },

    /**
     * Constructs the event's name based on its prefix and the action type
     * related to it.
     *
     * @method _makeEventName
     * @return {String} Returns the camel case version of `prefix` plus
     *     `actionType`.
     * @protected
     */
    _makeEventName: function(prefix, actionType) {
        return prefix + actionType.substring(0, 1).toUpperCase() + actionType.substring(1);
    },

    /**
     * This function runs when a beforeUndo or beforeRedo event is prevented.
     *
     * @method _prevBeforeActionFn
     * @param {EventFacade} event
     * @protected
     */
    _prevBeforeActionFn: function() {
        var action = this._pendingActions[0];
        this._currentStateIndex = action.undoIndex;
        this._pendingActions = [];
        this._removeStatesBeyondMaxDepth();
    },

    /**
     * Removes states in the stack if it's over the max depth limit.
     *
     * @method _removeStatesBeyondMaxDepth
     * @protected
     */
    _removeStatesBeyondMaxDepth: function() {
        var extraCount = this._currentStateIndex + 1 - this.get('maxUndoDepth');

        // We should ignore this call if there are pending actions, as we may need
        // to roll back to a state due to the user preventing one of them.
        if (extraCount > 0 && !this._pendingActions.length) {
            this._states = this._states.slice(extraCount);
            this._currentStateIndex -= extraCount;
        }
    },

    /**
     * Executes the given action (which can be either undo or redo).
     *
     * @method _runAction
     * @param {Object} action Object containing the `state` and action `type`
     *     (undo or redo) to be executed.
     * @protected
     */
    _runAction: function(action) {
        this._pendingActions.push(action);

        if (this._pendingActions.length === 1) {
            this._runNextPendingAction();
        }
    },

    /**
     * Executes the next pending action, if one exists.
     *
     * @method _runNextPendingAction
     * @protected
     */
    _runNextPendingAction: function() {
        var action = this._pendingActions[0];
        if (!action) {
            return;
        }

        this.fire(this._makeEventName(this.EVENT_PREFIX_BEFORE, action.type));
    },

    /**
     * Checks if new actions (calls to undo/redo) should be ignored. Actions
     * should only be ignored if the `queueable` attribute is false and there
     * is currently an action in progress.
     *
     * @method _shouldIgnoreNewActions
     * @return {Boolean}
     * @protected
     */
    _shouldIgnoreNewActions: function() {
        return !this.get('queueable') && this.isActionInProgress();
    },

    /**
     * Tries to merge the given state to one at the current position in the
     * stack.
     *
     * @method _tryMerge
     * @return {Boolean} Returns true if the merge happened and false otherwise.
     * @protected
     */
    _tryMerge: function(state) {
        if (this._currentStateIndex >= 0 && A.Lang.isFunction(state.merge)) {
            return state.merge(this.undoPeek());
        }

        return false;
    }
}, {
    ATTRS: {
        /**
         * Limits the states stack size. Useful for memory optimization.
         *
         * @attribute maxUndoDepth
         * @default 100
         * @type {Number}
         */
        maxUndoDepth: {
            validator: function(depth) {
                return depth >= 1;
            },
            value: 100
        },

        /**
         * Defines how this module will behave when the user calls undo
         * or redo while an action is still in progress. If false, these
         * calls will be ignored. If true, they will be queued, running
         * in order as soon as the pending action finishes.
         *
         * @attribute queueable
         * @default false
         * @type {Boolean}
         */
        queueable: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});


}, '3.0.1', {"requires": ["base", "base-build", "promise"]});
