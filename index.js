import { fetchData } from './modules/fetchData.js'
import { postComments } from './modules/fetchData.js';

// import { handlePostClick } from './modules/handlePostClick.js';

export let container = document.querySelector(".container");

fetchData(true);

const handlePostClick = () => {

    postComments(userName.value, userText.value, date)
        .catch((error) => {
            if (error.message === "Сервер сломался, попробуй позже") {
                handlePostClick();
            }
        });
};
