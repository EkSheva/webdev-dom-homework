import { renderComments } from './renderComments.js'
import { comments } from './comments.js'

export const answerComment = () => {
    const answerElements = document.querySelectorAll("li");

    answerElements.forEach((answerElement, id) => {
        answerElement.addEventListener("click", () => {
            const commentIndex = parseInt(answerElement.dataset.answer);
            userText.value = `${comments[commentIndex].author.name}: ${comments[commentIndex].text}`;
        });
        
        fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments${id}`)
            .then((reponse) => {
                return reponse.json()
            })
            .then((data) => {
                updateComments(data.comments);
                renderComments();
            });

    });
};