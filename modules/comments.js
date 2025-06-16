export let comments = []

export const updateComments = (newComments) => {
    comments = newComments
}
// export const getComments = () => {
//     return comments
// }

// export const updateLike = (commentIndex, newLikes, newIsLiked) => {
//     comments = comments.map((comment) => {
//         if (comment.id === commentIndex) {
//             return { ...comment, likes: newLikes, isLiked: newIsLiked }
//         }
//         return comment
//     })
// }
