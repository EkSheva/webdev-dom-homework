import { comments } from './comments.js'
import { token, name, postComments, setToken } from './fetchData.js'
import { initLike } from './initLike.js'
import { answerComment } from './answerComment.js'
import { container } from '../index.js'
import { renderLogin } from './renderLogin.js'
import { handlePostClick } from './handlePostClick.js'

const dates = new Date()
let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false }
let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' }
let formattedTime = dates.toLocaleString('ru-RU', optionsTime)
let formattedDate = dates.toLocaleDateString('ru-RU', optionsDate)
const date = formattedDate + ' ' + formattedTime

export const renderComments = () => {
    container.innerHTML = ''

    const ul = document.createElement('ul')
    ul.classList.add('comments')
    container.appendChild(ul)

    comments.forEach((user, id) => {
        const li = document.createElement('li')
        li.classList.add('comment')
        li.dataset.answer = id

        const header = document.createElement('div')
        header.classList.add('comment-header')

        const nameDiv = document.createElement('div')
        nameDiv.textContent = user.author.name

        const dateDiv = document.createElement('div')
        dateDiv.textContent = date

        header.appendChild(nameDiv)
        header.appendChild(dateDiv)

        const body = document.createElement('div')
        body.classList.add('comment-body')

        const textDiv = document.createElement('div')
        textDiv.classList.add('comment-text')
        textDiv.textContent = user.text

        body.appendChild(textDiv)

        const footer = document.createElement('div')
        footer.classList.add('comment-footer')

        const likes = document.createElement('div')
        likes.classList.add('likes')

        const counterSpan = document.createElement('span')
        counterSpan.classList.add('likes-counter')
        counterSpan.textContent = user.likes

        const likeButton = document.createElement('button')
        likeButton.classList.add('like-button')
        likeButton.dataset.id = id

        if (user.isLiked) {
            likeButton.classList.add('-active-like')
        }

        likes.appendChild(counterSpan)
        likes.appendChild(likeButton)

        footer.appendChild(likes)

        li.appendChild(header)
        li.appendChild(body)
        li.appendChild(footer)

        ul.appendChild(li)
    })

    const formDiv = document.createElement('div')
    formDiv.classList.add('add-form')

    const userName = document.createElement('input')
    userName.classList.add('add-form-name')
    userName.id = 'name'
    userName.type = 'text'
    userName.placeholder = 'Введите ваше имя'
    userName.readOnly = true
    userName.value = `${name}`

    const userText = document.createElement('textarea')
    userText.id = 'text'
    // textareaElement.type = 'textarea';
    userText.classList.add('add-form-text')
    userText.placeholder = 'Введите ваш комментарий'
    userText.rows = 4
    userText.value = ''

    const formButton = document.createElement('div')
    formButton.classList.add('add-form-row')
    const sentButton = document.createElement('button')
    sentButton.classList.add('add-form-button')
    sentButton.id = 'button'
    sentButton.textContent = 'Написать'

    formButton.appendChild(sentButton)

    formDiv.appendChild(userName)
    formDiv.appendChild(userText)
    formDiv.appendChild(formButton)

    const pEl = document.createElement('p')
    pEl.textContent = 'Чтобы отправить комментарий,'
    const spanEl = document.createElement('span')
    spanEl.classList.add('link-login')
    spanEl.textContent = 'войдите,'
    pEl.appendChild(spanEl)

    if (token) {
        container.appendChild(formDiv)
        setToken(token)
        initLike()
        answerComment()
    } else {
        container.appendChild(pEl)
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }

    sentButton.addEventListener('click', () => {
        document.querySelector('.add-form-name').style.backgroundColor = 'white'
        document.querySelector('.add-form-text').style.backgroundColor = 'white'

        const dates = new Date()
        let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false }
        let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' }
        let formattedTime = dates.toLocaleString('ru-RU', optionsTime)
        let formattedDate = dates.toLocaleDateString('ru-RU', optionsDate)
        const date = formattedDate + ' ' + formattedTime

        if (userName.value === '' || userText.value === '') {
            document.querySelector('.add-form-name').style.backgroundColor =
                'red'
            document.querySelector('.add-form-text').style.backgroundColor =
                'red'

            alert('Заполните все поля')
            return
        }

        const form = document.querySelector('.add-form')
        form.classList.add('loading')
        const load = document.createElement('div')
        load.textContent = 'Загружаем комментарий...'
        const container = document.querySelector('.container')
        container.appendChild(load)

        postComments(userName.value, userText.value, date)
            .then(() => {
                renderComments()
                userName.value = ''
                userText.value = ''
            })
            .catch((error) => {
                if (error.message === 'Failed to fetch') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }
                if (error.message === 'Сервер сломался, попробуй позже') {
                    alert(error.message)
                    handlePostClick()
                    userName.value = ''
                    userText.value = ''
                }
                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                    userName.classList.add('-error')
                    userText.classList.add('-error')

                    setTimeout(() => {
                        userName.classList.remove('-error')
                        userText.classList.remove('-error')
                    }, 2000)
                }
                console.log(error)
            })
            .finally(() => {
                load.classList.add('loading')
                form.classList.remove('loading')
            })
    })
}
