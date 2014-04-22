YUI.add('tests-aui-undo-redo-utils', function(Y) {
    Y.mix(Y.Test.Case.prototype, {
        string: '',
        _undoCalls: 0,
        _redoCalls: 0,

        /**
         * Resets the string to its initial state.
         */
        reset: function() {
            this.undoRedo = new Y.UndoRedo();
            this.string = '';
            this._undoCalls = 0;
            this._redoCalls = 0;
        },

        /**
         * Appends the given suffix to the string and creates a
         * new state object to represent this.
         */
        newWriteState: function(suffix, async) {
            var instance = this,
                action;

            this._appendSuffix(suffix);
            return {
                suffix: suffix,

                undo: function() {
                    action = this;
                    instance._undoCalls++;

                    if (async) {
                        return new Y.Promise(function(resolve, reject) {
                            Y.soon(function() {
                                instance._removeSuffix(action.suffix);
                                resolve();
                            });
                        });
                    }
                    else {
                        instance._removeSuffix(action.suffix);
                    }
                },
                redo: function() {
                    action = this;
                    instance._redoCalls++;

                    if (async) {
                        return new Y.Promise(function(resolve, reject) {
                            Y.soon(function() {
                                instance._appendSuffix(action.suffix);
                                resolve();
                            });
                        });
                    }
                    else {
                        instance._appendSuffix(action.suffix);
                    }
                }
            };
        },

        waitForUndoEnd: function(callback) {
            this._waitForActionEnd(this.undoRedo.AFTER_UNDO, callback);
        },

        waitForRedoEnd: function(callback) {
            this._waitForActionEnd(this.undoRedo.AFTER_REDO, callback);
        },

        assertUndoCalled: function(times) {
            Y.Assert.areEqual(times, this._undoCalls);
        },

        assertRedoCalled: function(times) {
            Y.Assert.areEqual(times, this._redoCalls);
        },

        _waitForActionEnd: function(actionType, callback) {
            var instance = this;

            this.undoRedo.once(actionType, function() {
                instance.resume(function() {
                    callback();
                });
            });
            this.wait();
        },

        _appendSuffix: function(suffix) {
            this.string += suffix;
        },

        _removeSuffix: function(suffix) {
            this.string = this.string.slice(0, this.string.length - suffix.length);
        }
    });
}, '', {
    requires: ['promise', 'timers']
});
