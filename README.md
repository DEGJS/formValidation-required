# formValidation-required
A required field rule module for the DEGJS [formValidation](https://github.com/DEGJS/formValidation) module.


## Install
formValidation-required is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader ([SystemJS](https://github.com/systemjs/systemjs) will do the job) as part of your Javascript workflow.

If you're already using [JSPM package manager](http://jspm.io) for your project, you can install formValidation-required with the following command:

```
$ jspm install github:DEGJS/formValidation-required
```

Installing formValidation rule modules via JSPM will automatically install the base formValidation module.


## Usage
After importing, formValidation rule modules can be instantiated by passing an array of names into a formValidation options object:

```js
import formValidation from "DEGJS/formValidation";

/* Import the Required rule module */
import required from "DEGJS/formValidation-required";

let validationOptions = {
    rules: [
        required
    ]
};

/* Instantiate the formValidation module on an element */
let formElement = document.querySelector('.form');
let validationInst = formValidation(formElement, validationOptions);
```

Optionally, default rule settings can be overridden by instantiating the rule as a function and passing options as an object: 
```js
let validationOptions = {
    rules: [
        required({
        	message: 'This message will override the default rule message.',
        	events: [
        		'focusout',
        		'submit'
        	],
            events: [
                'focusout',
                'submit'
            ]
        })
    ]
};
```

formValidation-required builds upon the HTML5 `required` validation pattern. Therefore, after instantiating the rule module, a field in the validation instance will be tested by this rule simply by adding a `required` attribute to the field input.

This rule module contains its own default validation message. However, this message can be overridden by adding a data attribute at the field or form level (in that order of importance).

Sample Markup:
```html
<form class="form" data-validation-required-message="This message will override the default rule message.">
    <fieldset>
        <div class="js-validation-field" data-validation-required-message="This message will override both the default rule message and the form element message.">
            <label for="firstname">First Name</label>
            <input class="js-field-input" type="text" required id="firstname" name="firstname">
        </div>
        <button type="submit">Submit</button>
    </fieldset>
</form>
```


## Options

#### options.message
Type: `String`  
Default: `This field is required.`  
The default message displayed when a field fails this rule's validation test.

#### options.messageAttr
Type: `String`  
Default: `data-validation-required-message`  
The data attribute formValidation will check when determining [message hierarchy](https://github.com/DEGJS/formValidation#configuring-error-messages)

#### options.events
Type: `Array`  
Default: `['focusout','submit']`  
An array of DOM events that will cause the rule to run validation on a field (or the entire form, when using `submit`). NOTE: `focusout` should be used in place of `blur` due to event bubbling limitations.

For more detailed usage instructions, see the [formValidation Usage](https://github.com/DEGJS/formValidation#usage) documentation.
