/**
 * Utilities
 */

/**
 * @param {string} start A percentage string (e.g. 70%).
 * @param {int} delta The integer change to apply to a percenta.
 * @return {string}
 */
function deltaPrc(start, delta) {
    return parseInt(start, 10) + delta + '%';
}

/**
 * Get the focused element
 */
function focusedElement() {
    var elements = document.querySelectorAll('*:focus');
    return elements[0];
}

/**
 * @see http://github.com/jquery/jquery/blob/497fc9849e91ba8602adf7908b4febf2d36bc1c8/src/core.js
 */
function inArray(elem, array ) {
    if (array.indexOf) {
        return array.indexOf(elem);
    }
    for (var i = 0, length = array.length; i < length; i++) {
        if (array[i] === elem) {
            return i;
        }
    }
    return -1;
}

/**
 * The next sibling with nodeType 1 (Element). This is needed because the
 * built-it nextSibling property of Node returns siblings of any type, such as
 * text
 * @param Node @node
 * @todo Not sure why I wasn't able to implement this as
 *       Node.prototype.nextElementSibling
 nextElementSibling = function(node) {
 while (node != null && node.nextSibling != null)
 {
 if(node.nextSibling.nodeType == 1) return node.nextSibling;
 else node = node.nextSibling;
 }
 return null;
 }
 */

/**
 * The prev sibling with nodeType 1 (Element). This is needed because the
 * built-it prevSibling property of Node returns siblings of any type, such as
 * text
 * @param Node @node
 * @todo Not sure why I wasn't able to implement this as
 *       Node.prototype.prevElementSibling
 previousElementSibling = function(node) {
 while (node != null && node.previousSibling != null)
 {
 if(node.previousSibling.nodeType == 1) return node.previousSibling;
 else node = node.previousSibling;
 }
 return null;
 }
 */

function swapNodes(elem1,elem2) {
    elem1.parentNode.insertBefore(elem2, elem1);
}

Element.prototype.hasClassName = function(name) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(this.className);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
};

Element.prototype.toggleClassName = function(name) {
    this.hasClassName(name) ? this.removeClassName(name) :
        this.addClassName(name);
};

/**
 * If the index doesn't exist roll over
 */
arrayRollOver = function(array, index) {
    if (index == -1)
        return array[array.length - 1];
    else
        return array[index % array.length];
};

/**
 * Function.bind if browser doesn't support it
 */
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function(owner) {
        var that = this;
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return that.apply(owner,
                    args.length === 0 ? arguments : arguments.length === 0 ? args :
                    args.concat(Array.prototype.slice.call(arguments, 0))
                    );
        };
    };
}

Array.prototype.swap = function(x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
};

