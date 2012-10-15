/**
 * A context in which certain keyboard mappings apply.
 */
function KeyboardContext(name) {
    this.name = name;
    this.actions = {};
};

KeyboardContext.prototype.addAction = function(keyCode, actionName) {
   if (keyCode in this.actions) {
       throw new Error('keyCode ' + keyCode +
           ' already used by another action');
   }
   else {
       this.actions[keyCode] = actionName;
   }
};

KeyboardContext.prototype.addActions = function(actions) {
    for (k in actions) {
        this.addAction(k, actions[k]);
    }
};
