function modal() {
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

}
module.exports = modal;