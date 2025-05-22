import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'

fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments`)
    .then((reponse) => {
        return reponse.json()
    })
    .then((data) => {
        updateComments(data.comments);
        renderComments();
    });

export let userName = document.getElementById("name");
export let userText = document.getElementById("text");
export const buttonSent = document.getElementById("button");
// const commentsAll = document.querySelector(".comments");

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

        return;

    } else {
        const newComment = {
            name: userName.value,
            date: date,
            text: userText.value,
            likes: 0,
            isLiked: false
        };
        fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments`, {
            method: "POST",
            body: JSON.stringify(newComment),
        })
            .then((reponse) => {
                return reponse.json()
            })
            .then((data) => {
                updateComments(data.comments);
                renderComments();
            });

        userName.value = "";
        userText.value = "";

    }
});
