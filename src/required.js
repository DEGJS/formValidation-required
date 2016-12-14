let required = function() {

    let messages = {
            requiredMsg: {
                attribute: 'data-validation-required-message',
                message: 'This field is required.'
            }
        },
        events = [
            'focusout',
            'submit'
        ];

    function getEvents() {
        return events;
    };

    function isRelevant(containerEl, inputEls) {
        return inputEls.every(function(el) {
            return el.getAttribute('required') !== null;
        });
    };

    function validate(matchingField) {
        return new Promise(function(resolve, reject) {
            let inputEls = matchingField.inputEls;
            if (inputEls) {
                let isValid = inputEls.every(function(el) {
                    return ((el.value) && (el.value.length > 0));
                });
                if (isValid) {
                    resolve({
                        valid: true
                    });
                } else {
                    resolve({
                        valid: false,
                        message: messages.requiredMsg,
                        matchingField: matchingField
                    });
                }
            } else {
                reject('no inputs');
            }
            
        });
    };

    return {
        events: getEvents,
        isRelevant: isRelevant,
        validate: validate
    };

};

export default required;