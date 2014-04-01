/**
 * The Undo/Redo Component
 *
 * @module aui-undo-redo
 */

A.UndoRedo = A.Base.create('undo-redo', A.Base, [], {
    /**
     * Constructor for the Undo/Redo component.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._actions = [];

        // This index points to the last action that was executed. Calling
        // undo() will undo the action this index points to.
        this._currentActionIndex = -1;
    },

    /**
     * Adds an action to the stack and makes it the current action.
     * Note that all actions that could be redone will be removed
     * from the stack after this.
     *
     * @method add
     * @param action
     */
    add: function(action) {
        if (!action.undo || !action.redo) {
            throw new Error('Invalid action. Actions used in UndoRedo need to have both the \'undo\' ' +
                'and the \'redo\' functions defined');
        }

        if (this._currentActionIndex < this._actions.length - 1) {
            // First remove all actions after the current one, since
            // those can't be redone anymore now that a new action was added.
            this._actions = this._actions.slice(0, this._currentActionIndex + 1);
        }

        this._actions.push(action);
        this._currentActionIndex++;
    },

    /**
     * Undoes the last action.
     * Returns false if there was no action to be undone.
     *
     * @method undo
     */
    undo: function() {
        if (this._currentActionIndex < 0) {
            return false;
        }

        this._actions[this._currentActionIndex--].undo();
        return true;
    },

    /**
     * Redoes the next action.
     * Returns false if there was no action to be redone.
     *
     * @method redo
     */
    redo: function() {
        if (this._currentActionIndex === this._actions.length - 1) {
            return false;
        }

        this._actions[++this._currentActionIndex].redo();
        return true;
    }
});
