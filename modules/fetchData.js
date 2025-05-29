import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

export const fetchData = () => {
    fetch(`https://wedev-api.sky.pro/api/v1/:sheverdyaeva/comments`)
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        });
};