CONTEXT_GLOBAL = 1;
CONTEXT_PHASE = 2;
CONTEXT_LABEL = 3;

KEYBOARD_ACTIONS_GLOBAL = {
    65:  'add'       /* 65:  add */
};

KEYBOARD_ACTIONS_PHASE = {
    107: 'lengthen',  /* 107: + */
    109: 'shorten',   /* 109: - */
    187: 'lengthen',  /* 187: + (webkit sees the 107 as the numpad + only) */
    189: 'shorten',   /* 189: - (webkit sees the 107 as the numpad - only) */
    37:  'advance',   /* 37:  left */
    39:  'delay',     /* 39:  right */
    38:  'swapUp',    /* 38:  up */
    40:  'swapDown',  /* 40:  down */
    13:  'editLabel', /* 13:  enter */
    27:  'blur',      /* 27:  escape */
    65:  'add',       /* 65:  add */
     8:  'remove',    /* 8:   delete */
    46:  'remove',    /* 46:  delete */
   219:  'prevColor', /* 219: [ */
   221:  'nextColor'  /* 221: ] */
};

KEYBOARD_ACTIONS_LABEL = {
    27:  'blur'      /* 27:  escape */
};

function getContext() {
    var focus = focusedElement();
    if(typeof focus == 'undefined') {
        return CONTEXT_GLOBAL;
    }
    else if(focus.hasClassName('phase')) {
        return CONTEXT_PHASE;
    }
    else if(focus.hasClassName('label')) {
        return CONTEXT_LABEL;
    }
    return false;
}

function getContextActions(context) {
    var focus = focusedElement();
    switch(context) {
        case CONTEXT_GLOBAL:
            return KEYBOARD_ACTIONS_GLOBAL;
        case CONTEXT_PHASE:
            return KEYBOARD_ACTIONS_PHASE;
        case CONTEXT_LABEL:
            return KEYBOARD_ACTIONS_LABEL;
    }
    return false;
}

function handleKeyboardEvent(evt) {

    var context = getContext();
    var actions = getContextActions(context);
    var action  = actions[evt.keyCode];

    if(!action) {
        return;
    }

    if (action == 'add') {
        Phase.factory();
    }
    else if(context == CONTEXT_PHASE) {
        action  = KEYBOARD_ACTIONS_PHASE[evt.keyCode];
        var phase = Phase.getByNode(evt.target);
        phase[action]();
    }
    else if(context == CONTEXT_LABEL) {
        action  = KEYBOARD_ACTIONS_PHASE[evt.keyCode];
        if(action == 'blur') {
            evt.target.blur();
        }
    }
}

// Keyboard Navigation
window.addEventListener('keydown', handleKeyboardEvent, true);

