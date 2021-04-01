
document.addEventListener('DOMContentLoaded', () => {
    
    let tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        calk = require('./modules/calk'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider');

        tabs();
        modal();
        timer();
        cards();
        calk();
        forms();
        slider();

});
