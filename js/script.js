"use strict"
document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });
        tabs.forEach((element) => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabs.forEach((element, i) => {
                if (event.target == element) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
    //Timer


    const dadline = new Date('2021-04-17');

    function getTimeRemaining(endtime) {
        const t = endtime - new Date(),
            days = t / (1000 * 60 * 60 * 24),
            hours = (t / (1000 * 60 * 60)) % 24,
            minutes = (t / (1000 * 60)) % 60,
            seconds = (t / (1000)) % 60;

        return {
            total: Math.floor(t),
            days: Math.floor(days),
            hours: Math.floor(hours),
            minutes: Math.floor(minutes),
            seconds: Math.floor(seconds)
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return (`0${num}`);
        } else {
            return (num);
        }
    }

    function setClock() {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const newTime = getTimeRemaining(dadline);

            if (newTime.t <= 0) {
                clearInterval(timeInterval);
            } else {
                days.innerHTML = getZero(newTime.days);
                hours.innerHTML = getZero(newTime.hours);
                minutes.innerHTML = getZero(newTime.minutes);
                seconds.innerHTML = getZero(newTime.seconds);
            }
        }
    }
    setClock();

    //Modal
    const modal = document.querySelector('.modal'),
        modalTriger = document.querySelectorAll('[data-modal]'),
        closeModalBtn = document.querySelectorAll('[data-modalClose]');

    modalTriger.forEach(element => {
        element.addEventListener('click', () => {
            showModal(modal);
        });
    });

    closeModalBtn.forEach(element => {
        element.addEventListener('click', () => {
            closeModal(modal);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });

    const modalTimerId = setTimeout(() => {
        showModal(modal);
    }, 5000);

    function showModalScroll () {
            if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                showModal(modal);
                document.removeEventListener('scroll',showModalScroll);
            }
    }
    document.addEventListener('scroll',showModalScroll);
    

    function showModal(params) {
        params.classList.add('show');
        params.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

    function closeModal(params) {
        params.classList.add('hide');
        params.classList.remove('show');
        document.body.style.overflow = '';
    }


});