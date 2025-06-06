import { comments } from './comments.js'
import { initLike } from './initLike.js'
import { answerComment } from './answerComment.js'

export const commentsAll = document.querySelector(".comments");

const dates = new Date();
let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' };
let formattedTime = dates.toLocaleString('ru-RU', optionsTime);
let formattedDate = dates.toLocaleDateString('ru-RU', optionsDate);
const date = formattedDate + ' ' + formattedTime;

export const renderComments = () => {
    commentsAll.innerHTML = '';

    comments.forEach((user, id) => {
        const li = document.createElement('li');
        li.classList.add('comment');
        li.dataset.answer = id;

        const header = document.createElement('div');
        header.classList.add('comment-header');

        const nameDiv = document.createElement('div');
        nameDiv.textContent = user.author.name;

        const dateDiv = document.createElement('div');
        dateDiv.textContent = date;

        header.appendChild(nameDiv);
        header.appendChild(dateDiv);

        const body = document.createElement('div');
        body.classList.add('comment-body');

        const textDiv = document.createElement('div');
        textDiv.classList.add('comment-text');
        textDiv.textContent = user.text;

        body.appendChild(textDiv);

        const footer = document.createElement('div');
        footer.classList.add('comment-footer');

        const likes = document.createElement('div');
        likes.classList.add('likes');

        const counterSpan = document.createElement('span');
        counterSpan.classList.add('likes-counter');
        counterSpan.textContent = user.likes;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.dataset.id = id;

        if (user.isLiked) {
            likeButton.classList.add('-active-like');
        }

        likes.appendChild(counterSpan);
        likes.appendChild(likeButton);

        footer.appendChild(likes);

        li.appendChild(header);
        li.appendChild(body);
        li.appendChild(footer);

        commentsAll.appendChild(li);
    });

    initLike();
    answerComment();
};