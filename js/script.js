import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calk from './modules/calk';
import forms from './modules/forms';
import slider from './modules/slider';
import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        showModal( '.modal', modalTimerId);
    }, 5000);

    tabs( '.tabheader__item', '.tabcontent','.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer();
    cards();
    calk();
    forms('form', modalTimerId);
    slider();
});