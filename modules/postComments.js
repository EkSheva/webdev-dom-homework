import { fetchData } from './fetchData.js';
import { host } from './fetchData.js'

export const postComments = (name, text,date) => {
    return fetch(host + "/comments", {
        method: "POST",
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