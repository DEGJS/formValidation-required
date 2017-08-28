const required = (options) => {

    const defaults = {
        message: 'This field is required.',
        messageAttr: 'data-validation-required-message',
        events: [
            'focusout',
            'submit'
        ]
    };
    let settings = Object.assign({}, defaults, options);

    function getSettings() {
        return settings;
    }

    function isRelevant(field) {
        return field.inputEls.some(el => el.getAttribute('required') !== null);
    }

    function validate(field) {
        return new Promise(function(resolve, reject) {
            if (field.inputEls) {
                const firstInputEl = field.inputEls[0];
                const method = firstInputEl === 'checkbox' || firstInputEl === 'radio' ? 'some' : 'every';
                resolve({
                    valid: field.inputEls[method](el => {
                        const elType = el.getAttribute('type');
                        if (elType === 'checkbox' || elType === 'radio') {
                            return el.checked === true;
                        } else {
                            return el.value.length > 0;
                        }
                    })
                });
            } else {
                reject('required: No inputs set.');
            }
        });
    }

    function postprocessMessage(msg) {
        if (settings.postprocessMessage && typeof settings.postprocessMessage === 'function') {
            return settings.postprocessMessage(msg);
        } else {
            return msg;
        }
    }

    return {
        settings: getSettings(),
        isRelevant: isRelevant,
        validate: validate,
        postprocessMessage: postprocessMessage
    };

}

export default required;