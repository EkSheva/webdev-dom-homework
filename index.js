import { fetchData } from './modules/fetchData.js'
import { postComments } from './modules/postComments.js';
import { renderComments } from './modules/renderComments.js';
// import { handlePostClick } from './modules/handlePostClick.js';

export let userName = document.getElementById("name");
export let userText = document.getElementById("text");
export const buttonSent = document.getElementById("button");
export let commentsAll = document.querySelector(".comments");

commentsAll.textContent = 'Идет загрузка...';

fetchData();

const handlePostClick = () => {

    postComments(userName.value, userText.value)
        .catch((error) => {
            if (error.message === "Сервер сломался, попробуй позже") {
                handlePostClick();
            }
        });

};

buttonSent.addEventListener("click", () => {
    document.querySelector('.add-form-name').style.backgroundColor = 'white';
    document.querySelector('.add-form-text').style.backgroundColor = 'white';
    // let dates = new Date();
    // let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    // let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' };
    // let formattedTime = dates.toLocaleString('ru-RU', optionsTime);
    // let formattedDate = dates.toLocaleDateString('ru-RU', optionsDate);
    // let date = formattedDate + ' ' + formattedTime;

    if (userName.value === "" || userText.value === "") {
        document.querySelector('.add-form-name').style.backgroundColor = 'red';
        document.querySelector('.add-form-text').style.backgroundColor = 'red';

        alert("Заполните все поля");
        return
    }

    const form = document.querySelector('.add-form');
    form.classList.add('loading');
    const load = document.createElement('div');
    load.textContent = 'Загружаем комментарий...';
    const container = document.querySelector('.container')
    container.appendChild(load);

    postComments((userName.value), (userText.value)).then(() => {
        renderComments()
        userName.value = "";
        userText.value = "";
    })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            };
            if (error.message === 'Сервер сломался, попробуй позже') {
                alert(error.message)
                handlePostClick();
                userName.value = "";
                userText.value = "";
            };
            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий должны быть не короче 3 символов')
                userName.classList.add('-error');
                userText.classList.add('-error');

                setTimeout(() => {
                    userName.classList.remove('-error');
                    userText.classList.remove('-error');
                }, 2000)
            };
            console.log(error);
        })
        .finally(() => {
            load.classList.add('loading');
            form.classList.remove('loading');
        })
}
);