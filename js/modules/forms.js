function forms() {
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

}

module.exports = forms;