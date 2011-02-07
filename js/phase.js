// Amount phases are shifted (percentage of the viewport)
SHIFT_AMOUNT = 5;

function Phase(container) {
    this.container = container;
    this.draw();
    this.addListeners();
    Mouse.initPhase(this);
    Phase.phases.push(this);
    this.node.focus();
    return this;
}

Phase.prototype.draw = function() {
    var n = document.createElement("div");
    n.addClassName("phase");
    n.addClassName("green");
    n.style.marginLeft = "30%";
    n.style.marginRight = "30%";
    n.tabIndex = 1;
    this.label = new PhaseLabel(this);
    this.tools = document.createElement('span');
    this.tools.addClassName('tools');
    this.tools.setAttribute('onclick', "alert('Not quite there yet...')");
    this.tools.innerHTML = 'y';
    n.appendChild(this.label.node);
    n.appendChild(this.tools);
    this.container.appendChild(n, this.container.lastChild);
    this.node = n;
    // define resizeHandle but don't add it to the node until focus  
    this.resizeHandle = document.createElement('span');
    this.resizeHandle.addClassName('resize-handle');
    this.resizeHandle.innerHTML = '[]';
    return this;
};

Phase.prototype.addListeners = function() {
    this.node.addEventListener('focus', this.focus.bind(this), true);
    this.node.addEventListener('blur', this.blur.bind(this), true);
};

Phase.prototype.lengthen = function() {
    this.node.style.marginRight = deltaPrc(this.node.style.marginRight, -SHIFT_AMOUNT);
};

Phase.prototype.shorten = function() {
    if(parseInt(this.node.style.marginRight, 10) + 
            parseInt(this.node.style.marginLeft, 10) >= 100 - SHIFT_AMOUNT) {
        return; // enforce min width of 1 intem 
    }
    this.node.style.marginRight = deltaPrc(this.node.style.marginRight, SHIFT_AMOUNT);
};

Phase.prototype.advance = function() {
    if(parseInt(this.node.style.marginLeft, 10) < SHIFT_AMOUNT) {
        return;
    }
    this.node.style.marginLeft = deltaPrc(this.node.style.marginLeft, -SHIFT_AMOUNT);
    this.node.style.marginRight = deltaPrc(this.node.style.marginRight, SHIFT_AMOUNT);
};

Phase.prototype.delay = function() {
    if(parseInt(this.node.style.marginRight, 10) < SHIFT_AMOUNT) {
        return;
    }
    this.node.style.marginLeft = deltaPrc(this.node.style.marginLeft, SHIFT_AMOUNT);
    this.node.style.marginRight = deltaPrc(this.node.style.marginRight, -SHIFT_AMOUNT);
};

Phase.prototype.swapDown = function() {
    var i = Phase.phases.indexOf(this);
    if(i == Phase.phases.length -1)  {
        return false;
    }
    var next = Phase.phases[i+1];
    this.container.insertBefore(next.node, this.node);
    Phase.phases.swap(i, i+1);
    this.node.focus();
};

Phase.prototype.swapUp = function() {
    var i = Phase.phases.indexOf(this);
    if(i === 0) {
        return false;
    }
    var prev = Phase.phases[i-1];
    this.container.insertBefore(this.node, prev.node);
    Phase.phases.swap(i, i-1);
    this.node.focus();
};

Phase.prototype.editLabel = function() {
    this.label.focus();
};

Phase.prototype.blur = function() {
    this.resizeHandle = this.node.removeChild(this.resizeHandle);
};

Phase.prototype.focus = function() {
    this.node.appendChild(this.resizeHandle);
};

Phase.prototype.remove = function() {
    if(confirm('Delete this phase?')) {
        var i = Phase.phases.indexOf(this);
        var prev = arrayRollOver(Phase.phases, i-1);
        Phase.phases.splice(i, 1);
        this.container.removeChild(this.node);
        prev.node.focus();
        return prev;
    }
};

Phase.prototype.prevColor = function() {
    for(var i=0,l=Phase.COLORS.length; i<l; i++) {
        if(this.node.hasClassName(Phase.COLORS[i])) {
            this.node.removeClassName(Phase.COLORS[i]);
            this.color = arrayRollOver(Phase.COLORS, i-1);
            this.node.addClassName(this.color);
            return this;
        }
    }
};

Phase.prototype.nextColor = function() {
    for(var i=0,l=Phase.COLORS.length; i<l; i++) {
        if(this.node.hasClassName(Phase.COLORS[i])) {
            this.node.removeClassName(Phase.COLORS[i]);
            this.color = arrayRollOver(Phase.COLORS, i+1);
            this.node.addClassName(this.color);
            return this;
        }
    }
};

Phase.ACTIONS = [ 'lengthen', 'shorten', 'advance', 'delay', 'swapUp', 'swapDown', 
    'editLabel', 'blur', 'add', 'remove', 'prevColor', 'nextColor' ];

Phase.COLORS = [ 'green', 'red', 'yellow', 'blue' ];


Phase.factory = function() {
    var c,p;
    if(typeof Phase.phases == 'undefined') {
        Phase.phases = [];
    }
    c = document.getElementsByTagName('section')[0];
    p = new Phase(c);
    return p;
};

Phase.getByNode = function(node) {
    for(var i=0; i<Phase.phases.length; i++) {
        if(Phase.phases[i].node == node) {
            return Phase.phases[i];
        }
    }
    return false;
};
