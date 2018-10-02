import required from '../src/required';

describe('Form Validation: required', () => {
    describe('settings', () => {
        it ('should have default message', () => {
            const expectedVal = 'This field is required.';
            const reqInst = required();
            const settings = reqInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('message');
            expect(settings.message).toEqual(expectedVal);
        });

        it('should have default messageAttr', () => {
            const expectedVal = 'data-validation-required-message';
            const reqInst = required();
            const settings = reqInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('messageAttr');
            expect(settings.messageAttr).toEqual(expectedVal);
        });

        it('should have default events', () => {
            const reqInst = required();
            const settings = reqInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('events');
            expect(settings.events).toHaveLength(2);
            expect(settings.events).toContain('focusout');
            expect(settings.events).toContain('submit');
        });

        it('should overwrite defaults, if values passed in', () => {
            const newSettings = {
                message: 'This field is probs required.'
            };
            const expectedVal = {
                message: 'This field is probs required.',
                messageAttr: 'data-validation-required-message',
                events: [
                    'focusout',
                    'submit'
                ]
            };

            const reqInst = required(newSettings);
            expect(reqInst.settings).toEqual(expectedVal);
        });
    });    

    describe('isRelevant', () => {
        it('should return true if some input has required attribute', () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => 'true'
                    }
                ]
            }
            const reqInst = required();
            expect(reqInst.isRelevant(mockField)).toEqual(true);
        });

        it('should return false if no inputs have required attribute', () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    }
                ]
            }
            const reqInst = required();
            expect(reqInst.isRelevant(mockField)).toEqual(false);
        });
    });

    describe('postprocessMessage', () => {
        it('should call postprocessMessage if defined and is function', () => {
            const settings = {
                postprocessMessage: jest.fn(msg => 'The message made it.')
            };
            const mockMessage = 'I am a mock message.';
            const reqInst = required(settings);
            const retVal = reqInst.postprocessMessage(mockMessage);

            expect(settings.postprocessMessage).toHaveBeenCalled();
            expect(settings.postprocessMessage).toHaveBeenCalledWith(mockMessage);
            expect(retVal).toEqual('The message made it.');
        });

        it('should return msg if not function', () => {
            const settings = {
                postprocessMessage: 'I am not a function'
            };
            const mockMessage = 'I am a mock message.';
            const reqInst = required(settings);
            const retVal = reqInst.postprocessMessage(mockMessage);

            expect(retVal).toEqual(mockMessage);
        });

        it('should return msg if no postprocessMessage', () => {
            const mockMessage = 'I am a mock message.';
            const reqInst = required();
            const retVal = reqInst.postprocessMessage(mockMessage);

            expect(retVal).toEqual(mockMessage);
        });
    });

    describe('validate', () => {
        it('should reject if no inputs', async () => {
            const mockField = {};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).rejects.toEqual('required: No inputs set.');
        });

        it('should return true if some checkbox is checked', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'checkbox',
                        checked: false
                    },
                    {
                        getAttribute: () => 'checkbox',
                        checked: true
                    }
                ]
            };
            const expectedResponse = {valid: true};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return false if no checkbox is checked', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'checkbox',
                        checked: false
                    },
                    {
                        getAttribute: () => 'checkbox',
                        checked: false
                    }
                ]
            };
            const expectedResponse = {valid: false};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return true if some radio is checked', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'radio',
                        checked: false
                    },
                    {
                        getAttribute: () => 'radio',
                        checked: true
                    }
                ]
            };
            const expectedResponse = {valid: true};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return false if no radio is checked', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'radio',
                        checked: false
                    },
                    {
                        getAttribute: () => 'radio',
                        checked: false
                    }
                ]
            };
            const expectedResponse = {valid: false};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return true if every text input has value', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'text',
                        value: '1'
                    },
                    {
                        getAttribute: () => 'text',
                        value: '2'
                    }
                ]
            };
            const expectedResponse = {valid: true};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return false if some text input is empty', async () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => 'text',
                        value: '1'
                    },
                    {
                        getAttribute: () => 'text',
                        value: ''
                    }
                ]
            };
            const expectedResponse = {valid: false};
            const reqInst = required();
            await expect(reqInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

    });
})