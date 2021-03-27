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
        modalTriger = document.querySelectorAll('[data-modal]');

    modalTriger.forEach(element => {
        element.addEventListener('click', () => {
            showModal(modal);
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
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

    function showModalScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modal);
            document.removeEventListener('scroll', showModalScroll);
        }
    }
    document.addEventListener('scroll', showModalScroll);


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

    // Cards
    const menuField = document.querySelector('.menu__field'),
        container = menuField.querySelector('.container');
    class MenuCard {
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.perent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chegeToUAH();
        }

        chegeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.perent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             alt,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, alt, title, descr, price, '.menu .container', 'menu__item').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                alt,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, alt, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });

    //forms

    // const forms = document.querySelectorAll('form');
    // const message = {
    //     loading: "загрузка",
    //     success: "Спасибо скоро мы  с вами свяжемся",
    //     failure: "Что-то пошло не так..."
    // };

    // forms.forEach(item => {
    //     postData(item);
    // });

    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('sratus');
    //         statusMessage.textContent = message.loading;
    //         form.append(statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', ' server.php');

    //         const fomData = new FormData(form);
    //         // request.setRequestHeader("Contents-type", 'multipart/form-data');

    //         request.send(fomData);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 statusMessage.textContent = message.success;
    //                 form.reset();
    //                 setTimeout(() => {
    //                     statusMessage.remove();
    //                 }, 2000);
    //             } else {
    //                 statusMessage.textContent = message.failure; 
    //             }
    //         });
    //     });
    // }


    const forms = document.querySelectorAll('form');
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо скоро мы  с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThenksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThenksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

        });
    }

    function showThenksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        showModal(modal);

        const ThenksModal = document.createElement('div');
        ThenksModal.classList.add('modal__dialog');
        ThenksModal.innerHTML = `
        <div class="modal__content">
        <div data-modalClose class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(ThenksModal);
        setTimeout(() => {
            ThenksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modal);
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    //slider
    const slides = document.querySelectorAll('.offer__slide');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    let slideIndex = 1;

    // plusSlides(0);

    // if (slides.length < 10) {
    //     total.innerHTML = `0${slides.length}`;
    // }else{
    //     total.innerHTML = slides.length;
    // }

    // function showSlide(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    //     slides[slideIndex - 1].classList.remove('show');
    //     slides[slideIndex - 1].classList.add('show');

    //     if (slides.length < 10) {
    //         current.innerHTML = `0${slideIndex}`;
    //     }else{
    //         current.innerHTML = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlide(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const sliderInner = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(sliderWrapper).width;
    let offset = 0;

    if (slides.length < 10) {
        total.innerHTML = `0${slides.length}`;
        current.innerHTML = `0${slideIndex}`;
    } else {
        total.innerHTML = slides.length;
        current.innerHTML = slideIndex;
    }

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // вирезали число 500 из строки 500px 
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.innerHTML = `0${slideIndex}`;
        } else {
            current.innerHTML = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset += deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.innerHTML = `0${slideIndex}`;
        } else {
            current.innerHTML = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    const slider = document.querySelector('.offer__slider');
    slider.style.position = 'relative';

    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');

    const dots = [];

    slider.append(indicators);

    for (let i = 1; i <= slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i);
        indicators.append(dot);
        dots.push(dot);
        if (i == 1) {
            dot.style.opacity = 1;
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.innerHTML = `0${slideIndex}`;
            } else {
                current.innerHTML = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    //Calc


    const result = document.querySelector('.calculating__result span');
    let sex ,
    height, weight, age, ratio ;

if (localStorage.getItem('sex')) {
     sex  = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    ratio   = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
   localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.classList.remove(activeClass);
    });

    elements.forEach(element => {
        if (element.getAttribute('id') == localStorage.getItem('sex')) {
            element.classList.add(activeClass);
        }
        if (element.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
            element.classList.add(activeClass);
        }

    });
}
initLocalSettings('.gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

console.log(localStorage.getItem('ratio'));
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.innerHTML = "____";
            return;
        } else {
            if (sex === 'male') {
                result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            } else {
                result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            }
        }
    }
    calcTotal();

    function getStaticInformation(selector, activityClasses) {
        const elements = document.querySelectorAll(`${selector}`);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex',e.target.getAttribute('id'));
                }
                elements.forEach(element => {
                    element.classList.remove(activityClasses);
                });
                e.target.classList.add(activityClasses);
                calcTotal();
            });
        });
    }
    getStaticInformation('.gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.backgroundColor = 'red';
            } else {
                input.style.backgroundColor = 'white';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    calcTotal();
                    break;
                case 'weight':
                    weight = +input.value;
                    calcTotal();
                    break;
                case 'age':
                    age = +input.value;
                    calcTotal();
                    break;
                default:
                    break;
            }
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
    // Минимальный уровень активности — 1.2
    // Низкий уровень активности — 1.375
    // Средний уровень активности — 1.55
    // Высокий уровень — 1.725
    // Очень высокий —  1.9

});