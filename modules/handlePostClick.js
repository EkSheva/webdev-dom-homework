import { postComments } from './postComments.js'

export const handlePostClick = () => {
    let userName = document.querySelector('add-form-name')
    let userText = document.querySelector('add-form-text')
    postComments(userName.value, userText.value).catch((error) => {
        if (error.message === 'Сервер сломался, попробуй позже') {
            handlePostClick()
        }
    })
}
