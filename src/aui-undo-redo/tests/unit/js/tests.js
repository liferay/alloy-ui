YUI.add('aui-undo-redo-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-undo-redo'),
        string = '',
        undoRedo;

    function WriteAction(suffix) {
        this._suffix = suffix;
    }
    WriteAction.prototype.undo = function() {
        string = string.slice(0, string.length - this._suffix.length);
    };
    WriteAction.prototype.redo = function() {
        string += this._suffix;
    }

    suite.add(new Y.Test.Case({
        name: 'Undo/Redo actions',

        setUp: function() {
            string = '';
            undoRedo = new Y.UndoRedo();
        },

        'should undo and redo the last action': function() {
            string += 'Hello';
            undoRedo.add(new WriteAction('Hello'));
            string += ' World';
            undoRedo.add(new WriteAction(' World'));
            string += ' !!!';
            undoRedo.add(new WriteAction(' !!!'));

            undoRedo.undo();
            Y.Assert.areEqual('Hello World', string);

            undoRedo.undo();
            Y.Assert.areEqual('Hello', string);

            undoRedo.redo();
            Y.Assert.areEqual('Hello World', string);
        },

        'should return false when undo/redo can\'t be done': function() {
            string += 'Hello';
            undoRedo.add(new WriteAction('Hello'));

            Y.Assert.isTrue(undoRedo.undo());
            Y.Assert.isFalse(undoRedo.undo());

            Y.Assert.isTrue(undoRedo.redo());
            Y.Assert.isFalse(undoRedo.redo());
        },

        'should clean redo stack when new action is added': function() {
            string += 'Hello';
            undoRedo.add(new WriteAction('Hello'));
            string += ' World';
            undoRedo.add(new WriteAction(' World'));

            // Action 'World' is undone here.
            undoRedo.undo();
            Y.Assert.areEqual('Hello', string);

            string += ' Earth';
            undoRedo.add(new WriteAction(' Earth'));

            // The action that adds ' World' can't be redone anymore
            // since the ' Earth' action was added in its place.
            Y.Assert.isFalse(undoRedo.redo());

            undoRedo.undo();
            Y.Assert.areEqual('Hello', string);
            undoRedo.redo();
            Y.Assert.areEqual('Hello Earth', string);
        },

        'should throw error on invalid actions': function() {
            YUITest.Assert.throwsError(Error, function(){
                undoRedo.add({});
            });
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-undo-redo' ] });
