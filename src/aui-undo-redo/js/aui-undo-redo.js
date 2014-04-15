/**
 * The Undo/Redo Component
 *
 * @module aui-undo-redo
 */

A.UndoRedo = A.Base.create('undo-redo', A.Base, [], {
    ACTION_TYPE_UNDO: 'undo',
    ACTION_TYPE_REDO: 'redo',

    BEFORE_UNDO: 'beforeUndo',
    AFTER_UNDO: 'afterUndo',
    BEFORE_REDO: 'beforeRedo',
    AFTER_REDO: 'afterRedo',

    EVENT_PREFIX_BEFORE: 'before',
    EVENT_PREFIX_AFTER: 'after',

    /**
     * Constructor for the Undo/Redo component.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.clearHistory();
    },

    /**
     * Resets the stack, clearing all states and pending actions.
     *
     * @method clearHistory
     */
    clearHistory: function() {
        this._states = [];
        this._pendingActions = [];

        // This index points to the last state that was executed. Calling
        // undo() will undo the state this index points to.
        this._currentStateIndex = -1;
    },

    /**
     * Adds a state to the stack and makes it the current state.
     * Note that all states that could be redone will be removed
     * from the stack after this.
     * Valid states are objects that have at least 2 functions:
     * undo and redo. These functions can return promises, in which
     * case any subsequent calls will be queued, waiting for all
     * pending promises to end.
     *
     * @method add
     * @param state
     */
    add: function(state) {
        if (!state.undo || !state.redo) {
            throw new Error('Invalid state. States used in UndoRedo need to have both the \'undo\' ' +
                'and the \'redo\' functions defined');
        }

        if (this._currentStateIndex < this._states.length - 1) {
            // First remove all states after the current one, since
            // those can't be redone anymore now that a new state was added.
            this._states = this._states.slice(0, this._currentStateIndex + 1);
        }

        this._states.push(state);
        this._currentStateIndex++;
    },

    /**
     * Undoes the last state.
     * Returns false if there was no state to be undone.
     *
     * @method undo
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
     * Redoes the next state.
     * Returns false if there was no state to be redone.
     *
     * @method redo
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
     * Checks if there is a state to be undone.
     *
     * @method canUndo
     */
    canUndo: function() {
        return this._currentStateIndex >= 0;
    },

    /**
     * Checks if there is a state to be redone.
     *
     * @method canRedo
     */
    canRedo: function() {
        return this._currentStateIndex < this._states.length - 1;
    },

    /**
     * Returns the state that will be undone when calling undo().
     *
     * @method undoPeek
     */
    undoPeek: function() {
        return this._states[this._currentStateIndex];
    },

    /**
     * Returns the state that will be redone when calling redo().
     *
     * @method redoPeek
     */
    redoPeek: function() {
        return this._states[this._currentStateIndex + 1];
    },

    /**
     * Executes the given action (which can be either undo or redo).
     *
     * @method _runAction
     * @param action
     * @private
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
     * @private
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
        } else {
            this._afterAction(action);
        }
    },

    /**
     * Executes right after an action finishes running.
     *
     * @method _afterAction
     * @private
     */
    _afterAction: function(action) {
        this.fire(this._makeEventName(this.EVENT_PREFIX_AFTER, action.type));
        this._pendingActions.shift();
        this._runNextPendingAction();
    },

    /**
     * Constructs the event's name based on its prefix and the
     * action type related to it.
     *
     * @method _makeEventName
     * @private
     */
    _makeEventName: function(prefix, actionType) {
        return prefix + actionType.substring(0, 1).toUpperCase() + actionType.substring(1);
    }
});
