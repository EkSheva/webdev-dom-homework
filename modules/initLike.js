import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { delay } from './delay.js'

export const initLike = () => {
    const buttonElements = document.querySelectorAll(".like-button");

    buttonElements.forEach((buttonElement, id) => {
      buttonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const commentIndex = parseInt(buttonElement.dataset.id);
        buttonElement.classList.add('-loading-like');

        delay(2000).then(() => {
          comments[commentIndex].isLiked = !comments[commentIndex].isLiked;
          if (comments[commentIndex].isLiked) {
            comments[commentIndex].likes++;
          } else {
            comments[commentIndex].likes--;
          }
          buttonElement.classList.remove('-loading-like');

          renderComments();
        });
      });
    });
  };