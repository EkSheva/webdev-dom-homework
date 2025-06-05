import { postComments } from './postComments.js'

export const handlePostClick = () => {

    postComments(userName.value, userText.value, date)
        .catch((error) => {
            if (error.message === "Сервер сломался, попробуй позже") {
                handlePostClick();
            }
        });

};