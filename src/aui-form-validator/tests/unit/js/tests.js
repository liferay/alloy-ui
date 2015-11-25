YUI.add('aui-form-validator-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Form Validator Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-form-validator'),
        formValidator;

    var isImageURL = function(val) {
        var regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
        return regex.test(val);
    };

    Y.FormValidator.addCustomRules(
        {
            'imageURL': {
                condition: isImageURL,
                errorMessage: 'Please enter a valid URL that points to an image (jpg, jpeg, png, or gif).'
            }
        }
    );

    formValidator = new Y.FormValidator({
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
            'image-url': {
                imageURL: true,
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
    });

    //--------------------------------------------------------------------------
    // Test Case for invalid fields
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'AUI Form Submit Form Tests',

        /*
         * Check if on submit all fields are marked as invalid
         * Tests: AUI-965
         */
        'test submit form': function() {
            var elementWithoutError,
                forms;

            forms = Y.all('form');
            forms.each(function (form) {
                form.simulate('submit');
            });

            elementWithoutError = Y.one('.form-group:not(.has-error)');

            Y.Assert.isNull(elementWithoutError, 'There shouldn\'t be any element without class error');
        },

        /*
         * Check if validator nodes render after the input and lable's textNode
         * Tests: AUI-965
         */
        'test error message displayed after label': function() {
            var instance = this;

            instance._assertValidatorNextLabel('input[value=male]');

            instance._assertValidatorNextLabel('input[name=read]');
        },

        /*
         * Check if validator correctly validates <select> html fields
         * Tests: AUI-1204
         */
        'test submit empty select': function() {
            var form = Y.Node.create('<form><select name="gender"></select></form>'),
                select = form.one('select'),
                validOption,
                validator;

            Y.Node.create('<option value=""></option>').appendTo(select);
            validOption = Y.Node.create('<option value=\"male\">Male</option>').appendTo(select);

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    gender: {
                        required: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            validOption.attr('selected', 'selected');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates fields with custom rules
         * @tests AUI-1654
         */
        'test custom rules': function() {
            var form = Y.Node.create('<form><input name="gt50" id="gt50" type="text"></form>'),
                input = form.one('input'),
                validator,
                gt50Executed = false;

            var gt50 = function(val) {
                gt50Executed = true;

                return (val >= 50);
            };

            Y.FormValidator.addCustomRules(
                {
                    'greaterThan50': {
                        condition: gt50,
                        errorMessage: 'The digit should be >=50'
                    }
                }
            );

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    gt50: {
                        greaterThan50: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isFalse(gt50Executed, 'gt50Executed should be false');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');

            input.attr('value', '42');

            form.simulate('submit');

            Y.Assert.isTrue(gt50Executed, 'gt50Executed should be true');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', '100');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates fields with custom rules that
         * are required (using required property)
         * @tests AUI-2027
         */
        'test required (using required property) custom rules': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator,
                customFnExecuted;

            var conditionFn = function() {
                customFnExecuted = true;

                return true;
            };

            Y.FormValidator.addCustomRules(
                {
                    'myCustomRule': {
                        condition: conditionFn,
                        errorMessage: 'error message'
                    }
                }
            );

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        myCustomRule: true,
                        required: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(customFnExecuted, 'customFnExecuted should be true');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates fields with custom rules that
         * are required (using custom property)
         * @tests AUI-2027
         */
        'test required (using custom property) custom rules': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator,
                customFnExecuted;

            var conditionFn = function(val) {
                customFnExecuted = true;

                return !!val;
            };

            Y.FormValidator.addCustomRules(
                {
                    'myCustomRule': {
                        condition: conditionFn,
                        errorMessage: 'error message'
                    }
                }
            );

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        myCustomRule: true,
                        custom: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(customFnExecuted, 'customFnExecuted should be true');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates fields with custom rules that
         * are required (using requireValidation property)
         * @tests AUI-2027
         */
        'test required (using requireValidation property) custom rules': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator,
                customFnExecuted;

            var conditionFn = function(val) {
                customFnExecuted = true;

                return !!val;
            };

            Y.FormValidator.addCustomRules(
                {
                    'myCustomRule': {
                        condition: conditionFn,
                        errorMessage: 'error message'
                    }
                }
            );

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        myCustomRule: true,
                        requireValidation: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(customFnExecuted, 'customFnExecuted should be true');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly passes rule value to custom rules
         * @tests AUI-2027
         */
        'test passing rule values to custom rules': function() {
            var form = Y.Node.create('<form><input name="gt50" id="gt50" type="text"></form>'),
                validator;

            var conditionFn = function(val, node, ruleValue) {
                return ruleValue === 'my rule value';
            };

            Y.FormValidator.addCustomRules(
                {
                    'myCustomRule': {
                        condition: conditionFn,
                        errorMessage: 'error message'
                    }
                }
            );

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    gt50: {
                        myCustomRule: 'my rule value',
                        requireValidation: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates non-required fields
         * via required: false
         * @tests AUI-2027
         */
        'test non-required fields using required: false': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        required: false
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates hasValue rule
         * @tests AUI-2027
         */
        'test hasValue rule': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        hasValue: true,
                        requireValidation: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates required fields when using a
         * function as a rule value
         *
         * @tests AUI-2027
         */
        'test required (via required property) fields using rule value as a function': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        required: function() {
                            return true;
                        }
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator correctly validates required fields when using a
         * function as a rule value
         *
         * @tests AUI-2027
         */
        'test required (via requireValidation property) fields using rule value as a function ': function() {
            var form = Y.Node.create('<form><input name="inputName" type="text"></form>'),
                input = form.one('input'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    inputName: {
                        requireValidation: function() {
                            return true;
                        },
                        hasValue: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors(), 'Validator should have errors');

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        _assertValidatorNextLabel: function(input) {
            var inputNode,
                textNode;

            inputNode = Y.one(input);

            textNode = inputNode.get('nextSibling');

            Y.Assert.isTrue(textNode.get('nodeType') === 3, 'Next to the input should be a text node');

            if (Y.FormValidator.isCheckable(inputNode)) {
                textNode = inputNode.ancestor('.form-group').get('lastChild').previous();
            }

            Y.Assert.isTrue(
                textNode.next().hasClass('form-validator-stack'),
                'Next to the input should be form validator');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-form-validator', 'node-event-simulate']
});
