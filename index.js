import { fetchData } from './modules/fetchData.js'

export let userName = document.getElementById("name");
export let userText = document.getElementById("text");
export const buttonSent = document.getElementById("button");
export let commentsAll = document.querySelector(".comments");

commentsAll.textContent = 'Идет загрузка...';

fetchData();

buttonSent.addEventListener("click", () => {
    document.querySelector('.add-form-name').style.backgroundColor = 'white';
    document.querySelector('.add-form-text').style.backgroundColor = 'white';

    let dates = new Date();
    let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' };
    let formattedTime = dates.toLocaleString('ru-RU', optionsTime);
    let formattedDate = dates.toLocaleDateString('ru-RU', optionsDate);
    let date = formattedDate + ' ' + formattedTime;

    if (userName.value === "" || userText.value === "") {
        document.querySelector('.add-form-name').style.backgroundColor = 'red';
        document.querySelector('.add-form-text').style.backgroundColor = 'red';

        alert("Заполните все поля");

    } else {
        const newComment = {
            name: userName.value,
            date: date,
            text: userText.value,
            likes: 0,
            isLiked: false,
            forceError: true,
        };

        const form = document.querySelector('.add-form');
        form.classList.add('loading');
        const load = document.createElement('div');
        load.textContent = 'Загружаем комментарий...';
        const container = document.querySelector('.container')
        container.appendChild(load);

        fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments`, {
            method: "POST",
            body: JSON.stringify(newComment),
        })
            // .then((response) => {
            //     if (response.status === 201) {
            //         return response.json()
            //     } else {
            //         if (response.status === 500) {
            //             throw new Error('Сервер сломался, попробуй позже')
            //         }
            //         if (response.status === 400) {
            //             throw new Error('Имя и комментарий должны быть не короче 3 символов')
            //         }
            //         throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
            //     }
            // })
            .then(() => {
                return fetchData();
            })
            .then(() => {
                userName.value = "";
                userText.value = "";
            })
            // .catch((error) => {
            //     alert(error.message);
            //     console.log(error);
            // })
            .finally(() => {
                load.classList.add('loading');
                form.classList.remove('loading');
            })
    }
});
