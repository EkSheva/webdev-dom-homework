import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
// import { answerComment } from './answerComment.js'

export const initLike = () => {
    const buttonElements = document.querySelectorAll(".like-button");

    buttonElements.forEach((buttonElement, id) => {
        buttonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const commentIndex = parseInt(buttonElement.dataset.id);

            comments[commentIndex].isLiked = !comments[commentIndex].isLiked;
            if (comments[commentIndex].isLiked) {
                comments[commentIndex].likes++;
            } else {
                comments[commentIndex].likes--;
            }

            fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments${id}`)
                .then((reponse) => {
                    return reponse.json()
                })
                .then((data) => {
                    updateComments(data.comments);
                    renderComments();
                });

        });
    });
};