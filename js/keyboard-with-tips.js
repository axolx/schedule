/**
 * Keyboard Decorator
 * Adds visual tips for available key bindings.
 */
function KeyboardWithTips(/* Keyboard */ keyboard) {
    console.log('init a keyboard with tips');
    this.keyboard = keyboard;
    this.tipsInit();
}


/**
 * Methods introduced or modified by the decorator.
 */


/**
 * Initialize the tips drawer.
 */
KeyboardWithTips.prototype.tipsInit = function() {
    var tipsNode, tipsIcon;
    // Tips Container
    tipsNode = document.createElement('aside');
    tipsNode.id = 'keyboard-tips';
    tipsNode.addClassName('active');
    document.body.appendChild(tipsNode);
    // Tips Icon
    tipsToggle = document.createElement('span');
    tipsToggle.id = 'keyboard-tips-toggle';
    tipsToggle.addEventListener('click', function() {
        this.toggleClassName('active');
        tipsNode.toggleClassName('active');
    }, true);
    document.body.appendChild(tipsToggle);
    document.body.addEventListener('keyboardContextChange',
            this.tipsUpdate.bind(this));
    this.tipsUpdate();
    // Trigger it!
    // var ev = new CustomEvent('keyboardContextChange', {context: 'phase'});
    // document.body.dispatchEvent(ev);
};

/**
 * Update the tips
 */
KeyboardWithTips.prototype.tipsUpdate = function(ev) {
    this.tipsDrawPane();
}

/**
 * Draw tips for a context in the tips drawer 
 */
KeyboardWithTips.prototype.tipsDrawPane = function() {
}

/**
 * Initialize the tips container 
 */
KeyboardWithTips.prototype.tipsInit = function() {
    var tipsNode, tipsIcon;
    // Tips Container
    tipsNode = document.createElement('aside');
    tipsNode.id = 'keyboard-tips';
    tipsNode.addClassName('active');
    document.body.appendChild(tipsNode);
    // Tips Icon
    tipsToggle = document.createElement('span');
    tipsToggle.id = 'keyboard-tips-toggle';
    tipsToggle.addEventListener('click', function() {
        this.toggleClassName('active');
        tipsNode.toggleClassName('active');
    }, true);
    document.body.appendChild(tipsToggle);
    document.body.addEventListener('keyboardContextChange',
            this.tipsUpdate.bind(this));
    this.tipsUpdate();
    // Trigger it!
    // var ev = new CustomEvent('keyboardContextChange', {context: 'phase'});
    // document.body.dispatchEvent(ev);
};


/**
 * Methods left intact  by the decorator.
 */


KeyboardWithTips.prototype.addContext = function(/* KeyboardContext */ kc) {
    return this.keyboard.addContext(kc);
};

KeyboardWithTips.prototype.getActiveContext = function() {
    return this.keyboard.getActiveContext();
};

KeyboardWithTips.prototype.handleKeyEvent = function(evt) {
    return this.keyboard.handleKeyEvent();
};


// Initialize the keyboard object
var keyboard = new Keyboard();

// Decorate it with tips 
keyboard = new KeyboardWithTips(keyboard);

/**
 * Global keyboard context
 */
var context = new KeyboardContext('global');
context.addAction(65, 'add');

// Define handleAction hook
context.handleAction = function(/* keyboard event */ evt, action) {
    if (action == 'add') {
        Phase.factory();
    }
};

// Register it
keyboard.addContext(context);

/**
 * 'Phase' keyboard context
 */
var context = new KeyboardContext('phase');

// Define isActive hook
context.isActive = function() {
    var f = focusedElement();
    return f && f.hasClassName('phase') ? true : false;
};

// Define handleAction hook
context.handleAction = function(/* keyboard event */ evt, action) {
    var phase = Phase.getByNode(evt.target);
    phase[action]();
}

// Register available actions
context.addActions({
    107: 'lengthen',  /* 107: + */
    109: 'shorten',   /* 109: - */
    187: 'lengthen',  /* 187: + (webkit sees the 107 as the numpad + only) */
    189: 'shorten',   /* 189: - (webkit sees the 107 as the numpad - only) */
     37: 'advance',   /* 37:  left */
     39: 'delay',     /* 39:  right */
     38: 'swapUp',    /* 38:  up */
     40: 'swapDown',  /* 40:  down */
     13: 'editLabel', /* 13:  enter */
     27: 'blur',      /* 27:  escape */
      8: 'remove',    /* 8:   delete */
     46: 'remove',    /* 46:  delete */
    219: 'prevColor', /* 219: [ */
    221: 'nextColor'  /* 221: ] */
});

// Register it
keyboard.addContext(context);
delete context;

/**
 * 'Label' keyboard context
 */
var context = new KeyboardContext('label');

// Register available actions
context.addActions({
    27: 'blur'      /* 27:  escape */
});

// Define isActive hook
context.isActive = function() {
    var f = focusedElement();
    return f && f.hasClassName('label') ? true : false;
}

// Define handleAction hook
context.handleAction = function(/* keyboard event */ evt, action) {
    if (action == 'blur') {
        evt.target.blur();
    }
}

// Register it
keyboard.addContext(context);
delete context;

