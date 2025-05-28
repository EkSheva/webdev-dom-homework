import { comments } from './comments.js'
import { userText } from '/webdev-dom-homework/index.js'

export const answerComment = () => {
    const answerElements = document.querySelectorAll("li");

    answerElements.forEach((answerElement, id) => {
      answerElement.addEventListener("click", () => {
        const commentIndex = parseInt(answerElement.dataset.answer);
        userText.value = `${comments[commentIndex].author.name}: ${comments[commentIndex].text}`;
      });
    });
  };