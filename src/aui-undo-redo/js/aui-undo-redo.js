/**
 * The Undo/Redo Component
 *
 * @module aui-undo-redo
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
     *     action methods.
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

        this._states.push(state);
        this._currentStateIndex++;
        this._removeStatesBeyondMaxDepth();
    },

    /**
     * Checks if there is a state to be redone.
     *
     * @method canRedo
     * @return {Boolean}
     */
    canRedo: function() {
        return this._currentStateIndex < this._states.length - 1;
    },

    /**
     * Checks if there is a state to be undone.
     *
     * @method canUndo
     * @return {Boolean}
     */
    canUndo: function() {
        return this._currentStateIndex >= 0;
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

        this._runAction({
            state: this._states[++this._currentStateIndex],
            type: this.ACTION_TYPE_REDO
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
            state: this._states[this._currentStateIndex--],
            type: this.ACTION_TYPE_UNDO
        });
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
        this._runNextPendingAction();
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
     * Removes states in the stack if it's over the max depth limit.
     *
     * @method _removeStatesBeyondMaxDepth
     * @protected
     */
    _removeStatesBeyondMaxDepth: function() {
        var extraCount = this._currentStateIndex + 1 - this.get('maxUndoDepth');
        if (extraCount > 0) {
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
        var instance = this,
            action = this._pendingActions[0],
            result;

        if (!action) {
            return;
        }

        this.fire(this._makeEventName(this.EVENT_PREFIX_BEFORE, action.type));
        result = action.state[action.type]();

        if (A.Promise.isPromise(result)) {
            result.then(A.bind(this._afterAction, this, action));
        }
        else {
            this._afterAction(action);
        }
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
            value: 100,
            validator: function(depth) {
                return depth >= 1;
            }
        }
    }
});
