import { container } from '../index.js';
import { login, setToken, setName, fetchData } from './fetchData.js';
import { renderRegistr } from './renderRegistr.js';

export const renderLogin = () => {
    container.innerHTML = "";
    const section = document.createElement('section');
    section.classList.add('add-form')

    const title = document.createElement('h1');
    title.textContent = 'Форма входа';
    section.appendChild(title);

    const inputLogin = document.createElement('input');
    inputLogin.classList.add('add-form-name');
    inputLogin.id = 'login';
    inputLogin.type = 'text';
    inputLogin.placeholder = 'Введите логин';
    inputLogin.required = true;


    const inputPassword = document.createElement('input');
    inputPassword.classList.add('add-form-name');
    inputPassword.id = 'password';
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Введите пароль';
    inputPassword.required = true;


    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('add-form-registry');

    const enterButton = document.createElement('button');
    enterButton.classList.add('add-form-button-main');
    enterButton.type = 'button';
    enterButton.textContent = "Войти";

    const registrButton = document.createElement('u');
    registrButton.classList.add('add-form-button-link');
    registrButton.type = 'button';
    registrButton.textContent = "Зарегистрироваться";
    fieldset.appendChild(enterButton);
    fieldset.appendChild(registrButton);

    section.appendChild(inputLogin);
    section.appendChild(inputPassword);
    section.appendChild(fieldset);

    container.appendChild(section);

    enterButton.addEventListener("click", () => {
        login(inputLogin.value, inputPassword.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchData()
            })
    })

    registrButton.addEventListener("click", () => {
        renderRegistr()
    })

    return section;
}

