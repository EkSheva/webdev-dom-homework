import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

export const host = 'https://wedev-api.sky.pro/api/v1/:sheverdyaeva';
export const fetchData = () => {
    return fetch(host + "/comments")
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        });
};