YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // ACE Editor AutoComplete Freemarker Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-ace-editor'),
        editor,
        elements,
        nativeEditor;

    editor = new Y.AceEditor({
        boundingBox: '#editor',
        plugins: [{
            fn: Y.Plugin.AceAutoComplete,
            cfg: {
                processor: new Y.AceEditor.AutoCompleteFreemarker({
                    variables: {
                        "types": {
                            "java.lang.String": {
                                "numberOfLeadingZeros": {
                                    "type": "Method",
                                    "returnType": "long",
                                    "argumentTypes": ["long"]
                                },
                                "toString": {
                                    "type": "Method",
                                    "returnType": "java.lang.String",
                                    "argumentTypes": ["long", "java.lang.String", "int"]
                                },
                                "field": {
                                    "type": "java.lang.String"
                                }
                            },
                            "com.liferay.portal.model.Group": {

                            },
                            "Method": {
                                "toString": {
                                    "type": "Method",
                                    "returnType": "java.lang.String",
                                    "argumentTypes": []
                                },
                                "indexOf": {
                                    "type": "Method",
                                    "returnType": "java.lang.Integer",
                                    "argumentTypes": []
                                }
                            }
                        },
                        "variables": {
                            "scopeGroupId": {
                                "type": "java.lang.String"
                            },

                            "scopeGroup": {
                                "type": "com.liferay.portal.model.Group"
                            },

                            "scopeGroupString": {
                                "type": "java.lang.String"
                            }
                        }}
                    }
                ),
                render: true,
                visible: false,
                width: 250,
                zIndex: 10000
            }}
        ]}
    );

    //--------------------------------------------------------------------------
    // Test Case for plugin appearance
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Freemarker tests',

        'assert editor contains the plugin': function() {
            editor.render();

            Y.Test.Assert.isNotNull(editor.hasPlugin('ace-autocomplete-plugin'));
        },
    }));

    //--------------------------------------------------------------------------
    // Test Case for directives
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Freemarker directives tests',

        'show directives': function() {
            editor.insert('<#b');

            nativeEditor = editor.getEditor();

            // Assert results list is hidden
            Y.Assert.isNotNull(Y.one('.ace-autocomplete-hidden'));

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is shown
            Y.Assert.isNull(Y.one('.ace-autocomplete-hidden'));
        },

        'check directives': function() {
            // Assert there are three directives: break, fallback and global

            elements = Y.all('.ace-autocomplete-results .ace-autocomplete-entry-container');

            Y.Assert.areEqual(3, elements.size(), 'There should be three elements only');

            Y.Assert.areEqual(elements.item(0).text(), 'break', 'The first element should be "break"');
            Y.Assert.areEqual(elements.item(1).text(), 'fallback', 'The first element should be "fallback"');
            Y.Assert.areEqual(elements.item(2).text(), 'global', 'The first element should be "global"');
        },

        'check first directive is selected': function() {
            Y.Assert.isTrue(elements.item(0).hasClass('selected'), 'The first suggesstion should be selected');
        },

        'insert directive': function() {
            elements.item(1).simulate('click');

            Y.Assert.areEqual(nativeEditor.getValue(), '<#fallback', 'The content must be replaced by "<#fallback"');

            // Assert results list is hidden
            Y.Assert.isNotNull(Y.one('.ace-autocomplete-hidden'));
        },

        'insert directive in insert mode': function() {
            var aceAutocompletePlugin = editor['ace-autocomplete-plugin'];

            aceAutocompletePlugin.set('fillMode', Y.AceEditor.AutoCompleteBase.FILL_MODE_INSERT);

            nativeEditor.setValue('<#b');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            elements = Y.all('.ace-autocomplete-results .ace-autocomplete-entry-container');

            elements.item(1).simulate('click');

            Y.Assert.areEqual(nativeEditor.getValue(), '<#bfallback', 'The content must be replaced by "<#bfallback"');

            // Restore the overwrite mode on the editor

            aceAutocompletePlugin.set('fillMode', Y.AceEditor.AutoCompleteBase.FILL_MODE_OVERWRITE);
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for variables
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Freemarker variables tests',

        'show variables': function() {
            nativeEditor.setValue('${');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is shown
            Y.Assert.isNull(Y.one('.ace-autocomplete-hidden'));

            elements = Y.all('.ace-autocomplete-results .ace-autocomplete-entry-container');

            elements.item(2).simulate('click');

            Y.Assert.areEqual(nativeEditor.getValue(), '${scopeGroupString', 'The content must be replaced by "${scopeGroupString"');
        },

        'insert second level of variable': function() {
            nativeEditor.setValue('${scopeGroupString.');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is shown
            Y.Assert.isNull(Y.one('.ace-autocomplete-hidden'));

            elements = Y.all('.ace-autocomplete-results .ace-autocomplete-entry-container');

            Y.Assert.areEqual(3, elements.size(), 'There should be three elements only');

            elements.item(2).simulate('click');

            Y.Assert.areEqual(nativeEditor.getValue(), '${scopeGroupString.toString(long, String, int)', 'The content must be replaced by "${scopeGroupString.toString(long, String, int)"');
        },

        'insert third level of variable': function() {
            nativeEditor.setValue('${scopeGroupString.toString(long, String, int).');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is shown
            Y.Assert.isNull(Y.one('.ace-autocomplete-hidden'));

            elements = Y.all('.ace-autocomplete-results .ace-autocomplete-entry-container');

            elements.item(0).simulate('click');

            Y.Assert.areEqual(nativeEditor.getValue(), '${scopeGroupString.toString(long, String, int).field', 'The content must be replaced by "${scopeGroupString.toString(long, String, int).field"');
        },

        'check no more variables': function() {
            nativeEditor.setValue('${scopeGroupString.toString(long, String, int).field.');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is not shown
            Y.Assert.isNotNull(Y.one('.ace-autocomplete-hidden'));
        },

        'check we don\'t show suggestions on fake variables': function() {
            nativeEditor.setValue('${fakeVariable.');

            nativeEditor.getSelection().clearSelection();

            nativeEditor.execCommand('showAutoComplete');

            // Assert results list is not shown
            Y.Assert.isNotNull(Y.one('.ace-autocomplete-hidden'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-ace-autocomplete-plugin', 'aui-ace-autocomplete-freemarker', 'node-event-simulate' ] });
