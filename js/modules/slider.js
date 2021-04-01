function slider() {
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
}

module.exports = slider;