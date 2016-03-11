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
         * Check if validator correctly validates fields with custom rules which
         * are required
         * @tests AUI-2027
         */
        'test required custom rules': function() {
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
         * Check if validator correctly passes rule value to custom rules
         * @tests AUI-2027
         */
        'test passing rule values to custom rules': function() {
            var form = Y.Node.create('<form><input name="gt50" id="gt50" type="text"></form>'),
                input = form.one('input'),
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
                        required: true
                    }
                }
            });

            input.attr('value', 'anything');

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
                        hasValue: true
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
         * Check if validator correctly validates required fields when using a
         * function as a rule value
         *
         * @tests AUI-2027
         */
        'test required fields using rule value as a function': function() {
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
         * Check if validator defaults to 'required' error message when showAllMessages is false
         * @tests AUI-2043
         */
        'test required error message is first when showAllMessages is false': function() {
            var form = Y.Node.create(
                    '<form><input name="emailAddress" id="emailAddress" type="text"></form>'),
                input = form.one('input'),
                validator,
                errorMessage,
                fieldStackErrorContainer;

            validator = new Y.FormValidator({
                boundingBox: form,
                fieldStrings: {
                    emailAddress: {
                        email: 'Please enter a valid email address.',
                        required: 'This field is required.'
                    }
                },
                rules: {
                    emailAddress: {
                        email: true,
                        required: true
                    }
                }
            });

            form.simulate('submit');

            fieldStackErrorContainer = validator.getFieldStackErrorContainer(input);

            errorMessage = fieldStackErrorContainer.text();

            Y.Assert.isTrue(errorMessage === 'This field is required.', 'errorMessage should be required');

            input.attr('value', 'not an email address');

            form.simulate('submit');

            errorMessage = fieldStackErrorContainer.text();

            Y.Assert.isTrue(errorMessage === 'Please enter a valid email address.', 'errorMessage should be email');

            input.attr('value', 'email@example.com');

            form.simulate('submit');

            Y.Assert.isFalse(validator.hasErrors(), 'Validator should have no errors');
        },

        /*
         * Check if validator deletes the field from the errors property object.
         * @tests AUI-2037
         */
        'should delete the field from the errors property object': function() {
            var form = Y.Node.create(
                    '<form><input class="my-input-keep" name="my-input-keep">' +
                    '<input class="my-input-delete" name="my-input-delete"></form>'
                ),
                inputKeep = form.one('.my-input-keep'),
                inputDelete = form.one('.my-input-delete'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form
            });

            validator.addFieldError(inputKeep, 'required');
            Y.Assert.isTrue(validator.hasErrors());

            validator.clearFieldError(inputKeep);
            Y.Assert.isFalse(validator.hasErrors());

            validator.addFieldError(inputKeep, 'required');
            Y.Assert.isTrue(validator.hasErrors());

            validator.clearFieldError('not-a-valid-field');
            Y.Assert.isTrue(validator.hasErrors());

            validator.clearFieldError('my-input-keep');
            Y.Assert.isFalse(validator.hasErrors());

            validator.addFieldError(inputDelete, 'required');
            inputDelete.remove();
            Y.Assert.isTrue(validator.hasErrors());

            validator.clearFieldError('my-input-delete');
            Y.Assert.isFalse(validator.hasErrors());
        },

        /*
         * Check if validator resets the error status of a field.
         * @tests AUI-2037
         */
        'should reset the error status of a field': function() {
            var form = Y.Node.create(
                    '<form><input class="my-input-keep" name="my-input-keep">' +
                    '<input class="my-input-delete" name="my-input-delete"></form>'
                ),
                inputKeep = form.one('.my-input-keep'),
                inputDelete = form.one('.my-input-delete'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    'my-input-keep': {
                        required: true
                    },
                    'my-input-delete': {
                        required: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors());

            validator.resetField(inputKeep);
            validator.resetField(inputDelete);

            Y.Assert.isFalse(validator.hasErrors());

            form.simulate('submit');

            inputDelete.remove();

            validator.resetField(inputKeep);
            validator.resetField(inputDelete);

            Y.Assert.isFalse(validator.hasErrors());
        },

        /*
         * Check if validator resets the error status of all fields.
         * @tests AUI-2037
         */
        'should reset the error status of all fields': function() {
            var form = Y.Node.create(
                    '<form><input class="my-input-keep" name="my-input-keep">' +
                    '<input class="my-input-delete" name="my-input-delete"></form>'
                ),
                inputDelete = form.one('.my-input-delete'),
                validator;

            validator = new Y.FormValidator({
                boundingBox: form,
                rules: {
                    'my-input-keep': {
                        required: true
                    },
                    'my-input-delete': {
                        required: true
                    }
                }
            });

            form.simulate('submit');

            Y.Assert.isTrue(validator.hasErrors());

            validator.resetAllFields();

            Y.Assert.isFalse(validator.hasErrors());

            form.simulate('submit');

            inputDelete.remove();

            validator.resetAllFields();

            Y.Assert.isFalse(validator.hasErrors());
        },

        /*
         * Check if 'aria-invalid' attribute is removed from empty input field
         * that previously had invalid input
         * @tests AUI-2055
         */
        'test aria-invalid attribute is removed from empty input field': function() {
            var form = Y.Node.create(
                    '<form><input name="emailAddress" id="emailAddress" type="text"></form>'),
                input = form.one('input');

            new Y.FormValidator({
                boundingBox: form,
                rules: {
                    emailAddress: {
                        email: true
                    }
                }
            });

            input.attr('value', 'anything');

            form.simulate('submit');

            Y.Assert.isTrue(input.hasAttribute('aria-invalid'), 'Input field with invalid input should have aria-invalid attribute');

            input.attr('value', '');

            form.simulate('submit');

            Y.Assert.isFalse(input.hasAttribute('aria-invalid'), 'Empty input field should not have aria-invalid attribute');
        },

        'shouldn\'t add success-field class in a field with no rules': function() {
            var form = Y.Node.create(
                    '<form><input name="yes" id="yes" type="text"></form>'),
                input = form.one('input');

            var formValidator = new Y.FormValidator({
                boundingBox: form
            });

            formValidator.highlight(input, true);

            Y.Assert.isFalse(input.hasClass('success-field'));

            formValidator.unhighlight(input);

            Y.Assert.isFalse(input.hasClass('success-field'));
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
