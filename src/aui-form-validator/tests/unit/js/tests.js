YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Form Validator Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-form-validator'),
        formValidator;

    formValidator = new Y.FormValidator(
      {
        boundingBox: '#myForm',
        fieldStrings: {
          email: {
            required: 'Type your email in this field.'
          },
          name: {
            required: 'Please provide your name.'
          }
        },
        rules: {
            age: {
                required: true
            },
            email: {
                email: true,
                required: true
            },
            emailConfirmation: {
                email: true,
                equalTo: '#email',
                required: true
            },
            gender: {
                required: true
            },
            name: {
                rangeLength: [2, 50],
                required: true
            },
            picture: {
                acceptFiles: 'jpg, gif, png',
                required: true
            },
            read: {
                required: true
            },
            url: {
                required: true,
                url: true
            }
        },
        showAllMessages: true
      }
    );

    //--------------------------------------------------------------------------
    // Test Case for invalid fields
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'AUI Form Submit Form Tests',

        /*
         * Check if on submit all fields are marked as invalid
         * @tests AUI-965
         */
        'test submit form': function() {
            var buttonSubmit,
                elementWithoutError,
                form;

            form = Y.one('#myForm');

            buttonSubmit = Y.one('.btn[type="submit"]');

            buttonSubmit.simulate('click');

            elementWithoutError = Y.one('.control-group:not(.error)');

            Y.Assert.isNull(elementWithoutError, 'There shouldn\'t be any element without class error');
        },

        /**
         * Check if validator nodes render after the input and lable's textNode
         * @tests AUI-965
         */
        'test error message displayed after label': function() {
            var instance = this;

            instance._assertValidatorNextLabel('input[value=male]');

            instance._assertValidatorNextLabel('input[name=read]');
        },

        _assertValidatorNextLabel: function(input) {
            var inputNode,
                textNode;

            inputNode = Y.one(input);

            textNode = inputNode.get('nextSibling');

            Y.Assert.isTrue(textNode.get('nodeType') === 3, 'Next to the input should be a text node');

            Y.Assert.isTrue(textNode.next().hasClass('form-validator-stack'), 'Next to the input should be form validator');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-form-validator', 'node-event-simulate' ] });
