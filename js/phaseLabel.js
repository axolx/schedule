function PhaseLabel(phase) {
    this.phase = phase;
    this.draw();
    this.addListeners();
    return this;
}

PhaseLabel.prototype.draw = function() {
    l = document.createElement('span');
    l.addClassName('label');
    l.setAttribute('tabindex', '-1');
    l.innerHTML = 'Click to Rename';
    this.node = l;
};

PhaseLabel.prototype.addListeners = function() {
    this.node.addEventListener('focus', this.focus.bind(this), true);
    this.node.addEventListener('blur', this.blur.bind(this), true);
};

PhaseLabel.prototype.focus = function() {
    this.node.setAttribute('contenteditable', 'true');
    this.node.focus();
};

PhaseLabel.prototype.blur = function() {
    this.node.setAttribute('contenteditable', 'false');
    this.node.blur();
    this.phase.node.focus();
};
