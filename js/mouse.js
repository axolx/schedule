
// Keyboard Navigation


Mouse = { 

    // How many pixels to consider something moved
    SENSITIVITY_X: 30,
    SENSITIVITY_Y: 40,

    // Namespance for moving functionality
    move: {},

    // Namespance for expand/collapse functionality
    size: {}

};

Mouse.initPhase = function(phase) {
    phase.node.addEventListener('mousedown', Mouse.move.start, false);
    phase.node.addEventListener('focus', Mouse.size.init, false);
    phase.node.addEventListener('blur', Mouse.size.end, false);
}

Mouse.move.start = function(evt) {
    if(!evt.target.hasClassName('phase')) return;
    var phase = Phase.getByNode(evt.target);
    Mouse.move.item = phase;
    Mouse.move.last = {x: evt.clientX, y: evt.clientY};
    window.addEventListener('mousemove', Mouse.move.checkMove, false);
    window.addEventListener('mouseup', Mouse.move.end, false);
    Mouse.move.item.node.addClassName('moving');
    document.body.addClassName('moving');
}

Mouse.move.checkMove = function(evt) {
    var distanceX = evt.clientX - Mouse.move.last.x;
    var distanceY = evt.clientY - Mouse.move.last.y;
    if(Math.abs(distanceX) > Mouse.SENSITIVITY_X) {
        Mouse.move.last.x = evt.clientX;
        if(distanceX > 0) Mouse.move.item.delay();
        else Mouse.move.item.advance();
    }
    if(Math.abs(distanceY) > Mouse.SENSITIVITY_Y) {
        Mouse.move.last.y = evt.clientY;
        if(distanceY > 0) Mouse.move.item.swapDown();
        else Mouse.move.item.swapUp();
    }
}

Mouse.move.end = function(evt) {
    window.removeEventListener('mousemove', Mouse.move.checkMove, false);
    window.removeEventListener('mouseup', Mouse.move.end, false);
    Mouse.move.item.node.removeClassName('moving');
    document.body.removeClassName('moving');
}

Mouse.size.init = function(evt) {
    var phase = Phase.getByNode(evt.target);
    Mouse.size.item = phase;
    phase.resizeHandle.addEventListener('mousedown', Mouse.size.start, false);
}

Mouse.size.start = function(evt) {
    Mouse.size.last = {x: evt.clientX, y: evt.clientY};
    window.addEventListener('mousemove', Mouse.size.checkMove, false);
    window.addEventListener('mouseup', Mouse.size.end, false);
    document.body.addClassName('resizing');
}

Mouse.size.checkMove = function(evt) {
    var distanceX = evt.clientX - Mouse.size.last.x;
    if(Math.abs(distanceX) > Mouse.SENSITIVITY_X) {
        Mouse.size.last.x = evt.clientX;
        if(distanceX > 0) Mouse.size.item.lengthen();
        else Mouse.size.item.shorten();
    }
}

Mouse.size.end = function(evt) {
    window.removeEventListener('mousemove', Mouse.size.checkMove, false);
    window.removeEventListener('mouseup', Mouse.size.end, false);
    document.body.removeClassName('resizing');
}
