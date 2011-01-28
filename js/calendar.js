// Keyboard Navigation

/**
 * @class Calendar
 *      Provides the date strip at the top of the schedule maker
 */
function Calendar(type, items) {
    // defaults
    this.type = type ? type : Calendar.WEEK;
    this.items = items ? items : Calendar.MAX_ITEMS;
    this.container = document.getElementById('schedule');
    this.theme(this.spacing);
    if(document.getElementById('slider')) {
        document.getElementById('slider').addEventListener('change', this.reset.bind(this), true);
    }
};

Calendar.prototype.theme = function() {
    var spacing = 5 * Math.floor( Calendar.MAX_ITEMS / this.items );
    for(var i=0; i<this.items; i++) {
        var item = document.createElement("li")
        item.style.marginLeft = spacing * i + "%";
        item.innerHTML = i + 1;
        this.container.appendChild(item, this.container.lastChild);
    }

}
Calendar.prototype.reset = function(evt) {
    this.clear();
    this.items = evt.target.value;
    this.theme();
}

Calendar.prototype.clear = function() {
    while (this.container.hasChildNodes()) { 
        this.container.removeChild(this.container.lastChild); 
    }
}

Calendar.initDefault = function () {
    new Calendar(this.WEEK, this.MAX_ITEMS);
}

Calendar.DAY   = 1;
Calendar.WEEK  = 2;
Calendar.MONTH = 3;
Calendar.MAX_ITEMS = 20;

document.addEventListener('load', Calendar.initDefault, true);


