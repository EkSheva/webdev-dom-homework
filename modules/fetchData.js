import { renderComments } from './renderComments.js'
import { updateComments} from './comments.js'

const host = 'https://wedev-api.sky.pro/api/v2/:sheverdyaeva';
const authHost = "https://wedev-api.sky.pro/api/user";

export let token ="";

export const setToken = (newToken) => {
    token = newToken
};

export let name ="";

export const setName = (newName) => {
    name = newName
};

export const fetchData = (isFirstLoader) => {
    if (isFirstLoader) {
        let container = document.querySelector(".container");

        container.textContent = 'Идет загрузка...';
    }
    return fetch(host + "/comments")
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        });
};

export const postComments = (name, text, date) => {
    return fetch(host + "/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            text,
            date,
            forceError: false,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                }
                if (response.status === 400) {
                    throw new Error('Неверный запрос')
                }
                throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
            }
        })
        .then(() => {
            return fetchData();
        })
};

export const login = (login, password) => {
    return fetch(authHost + "/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        }),
    })
};

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: "POST",
        body: JSON.stringify({
            name,
            login,
            password
        }),
    })
};


// export const like = (id) => {
//     return fetch(`/comments/${id}/toggle-like`, {
//         method: "POST"
//     })
//         .then((reponse) => {
//             return reponse.json()
//         })
//         .then((data) => {
//             updateLike(data.comments);
//             renderComments();
//         });
// };