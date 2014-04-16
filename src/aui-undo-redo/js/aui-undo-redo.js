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
        this._states = [];

        // This index points to the last state that was executed. Calling
        // undo() will undo the state this index points to.
        this._currentStateIndex = -1;
    },

    /**
     * Adds a state to the stack and makes it the current state.
     * Note that all states that could be redone will be removed
     * from the stack after this.
     *
     * @method add
     * @param state
     */
    add: function(state) {
        if (!state.undo || !state.redo) {
            throw new Error('Invalid state. states used in UndoRedo need to have both the \'undo\' ' +
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
        if (this._currentStateIndex < 0) {
            return false;
        }

        this._states[this._currentStateIndex--].undo();
        return true;
    },

    /**
     * Redoes the next state.
     * Returns false if there was no state to be redone.
     *
     * @method redo
     */
    redo: function() {
        if (this._currentStateIndex === this._states.length - 1) {
            return false;
        }

        this._states[++this._currentStateIndex].redo();
        return true;
    }
});
