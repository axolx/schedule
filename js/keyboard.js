/**
 * Add keyboard navigation.
 * @this Keyboard
 * TODO
 *   - Namespace these function under Keyboard.
 */
function Keyboard() {
    console.log('init a keyboard');
    this.contexts = [];
    this.globalContext = null;
    window.addEventListener('keydown', this.handleKeyEvent.bind(this), true);
}

Keyboard.prototype.addContext = function(/* KeyboardContext */ kc) {
    this.contexts.push(kc);
    if(kc.name == 'global') {
        this.globalContext = kc;
    }
};

/**
 * Returns the first active keyboard context.
 * @return {KeyboardContext} The first active keyboard context, or false.
 */
Keyboard.prototype.getActiveContext = function() {
    for (var i = 0, l = this.contexts.length; i < l; ++i) {
        if (typeof this.contexts[i].isActive == 'function' &&
                this.contexts[i].isActive()) {
            return this.contexts[i];
        }
    }
    return false;
};

/**
 * Lookup and execute the keyCode in the active and global contexts.
 */
Keyboard.prototype.handleKeyEvent = function(evt) {
    var context, action;

    // Lookup the action in the active context.
    context = this.getActiveContext();
    if (context && context.actions.hasOwnProperty(evt.keyCode)) {
        action = context.actions[evt.keyCode];
        console.log('action: ' +action, 'context: ' + context.name);
        context.handleAction(evt, action);
        return true;
    }

    // If an action was not found above, look in the global context.
    context = this.globalContext;
    if (context && context.actions.hasOwnProperty(evt.keyCode)) {
        action = context.actions[evt.keyCode];
        console.log('action: ' +action, 'context: ' + context.name);
        context.handleAction(evt, action);
        return true;
    }

};

