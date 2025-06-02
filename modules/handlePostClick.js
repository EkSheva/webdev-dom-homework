import { postComments } from './postComments.js'

export const handlePostClick = () => {

    postComments(userName.value, userText.value)
        .catch((error) => {
            if (error.message === "Сервер сломался, попробуй позже") {
                handlePostClick();
            }
        });

};