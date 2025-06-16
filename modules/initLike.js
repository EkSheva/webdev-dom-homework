import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { delay } from './delay.js'
import { token } from './fetchData.js'

export const initLike = () => {
    const buttonElements = document.querySelectorAll('.like-button')

    buttonElements.forEach((buttonElement) => {
        buttonElement.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = parseInt(buttonElement.dataset.id)
            buttonElement.classList.add('-loading-like')
            if (token) {
                delay(2000).then(() => {
                    comments[commentIndex].isLiked =
                        !comments[commentIndex].isLiked
                    if (comments[commentIndex].isLiked) {
                        comments[commentIndex].likes++
                    } else {
                        comments[commentIndex].likes--
                    }

                    renderComments()
                })
            } else {
                alert('Для лайка, авторизуйтесь, пожалуйста')
            }
        })
        buttonElement.classList.remove('-loading-like')
    })
}
