/**
 * @class DropdownItem
 */
function DropdownItem(title) {
    this.title = title;
    this.draw();
}

DropdownItem.prototype.draw = function() {
    this.node = document.createElement('li');
    this.node.innerHTML = this.title;
};

/**
 * @class Dropdown
 */
function Dropdown() {
    this.draw();
    this.show();
    //this.addListeners();
}

Dropdown.prototype.draw = function() {
    var n, d, c;
    n = document.createElement('menu');
    c = document.createElement('div');
    c.className = 'menu-handle';
    this.closeButton = document.createElement('div');
    this.closeButton = c;
    
    n.innerHTML = 
        '<div class="menu-handle"></div>'
        +'<header><h3>Header</h3><a class="close">D</a></header>';
    d = document.createElement('div');
    this.items = document.createElement('ul');
    d.appendChild(this.items);
    n.appendChild(d);
    n.addClassName('dropdown');
    n.addClassName('hidden');
    this.node = n;
};

Dropdown.prototype.show = function(x, y) {
    this.node.removeClassName('hidden');
};

Dropdown.prototype.hide = function(x, y) {
    this.node.addClassName('hidden');
};

/**
 * @param {DropdownItem} di A dropdown item.
 */
Dropdown.prototype.addItem = function(di) {
    this.items.appendChild(di.node);
};

/**
 * Static
 */

/**
 * Singleton instance property
 */
Dropdown._instance = null;

/**
 * One dropdown instance to rule them all
 */
Dropdown.open = function() {
    var i = Dropdown._instance;
    if (i === null) {
        i = Dropdown._instance = new Dropdown();
        i.addItem(new DropdownItem('Foo'));
        i.addItem(new DropdownItem('Bar'));
        i.addItem(new DropdownItem('Baz'));
        document.body.appendChild(i.node);
    }
    i.show();
};
