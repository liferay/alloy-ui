YUI.add('tests-aui-undo-redo-utils', function(Y) {
    Y.mix(Y.Test.Case.prototype, {
        string: '',

        /**
         * Resets the string to its initial state.
         */
        reset: function() {
            this.undoRedo = new Y.UndoRedo();
            this.string = '';
        },

        /**
         * Appends the given suffix to the string and creates a
         * new state object to represent this.
         */
        newWriteState: function(suffix) {
            var instance = this;

            this._appendSuffix(suffix);

            return {
                undo: function() {
                    instance._removeSuffix(suffix);
                },
                redo: function() {
                    instance._appendSuffix(suffix);
                }
            }
        },

        _appendSuffix: function(suffix) {
            this.string += suffix;
        },

        _removeSuffix: function(suffix) {
            this.string = this.string.slice(0, this.string.length - suffix.length);
        }
    });
});