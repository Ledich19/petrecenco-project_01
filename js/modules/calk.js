function calk() {
    //Calc


    const result = document.querySelector('.calculating__result span');
    let sex,
        height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
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
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
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
}

module.exports = calk;