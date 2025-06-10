import { comments } from './comments.js'

export const answerComment = () => {
    const answerElements = document.querySelectorAll("li");
    let userText = document.getElementById("text");

    answerElements.forEach((answerElement,id) => {
        answerElement.addEventListener("click", () => {
            const commentIndex = parseInt(answerElement.dataset.answer);
            userText.value = `${comments[commentIndex].author.name}: ${comments[commentIndex].text}`;
        });
    });
};