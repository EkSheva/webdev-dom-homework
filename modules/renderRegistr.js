import { container } from '../index.js';
import { registration, setToken, setName, fetchData } from './fetchData.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistr = () => {
    container.innerHTML = "";
    const section = document.createElement('section');
    section.classList.add('add-form')

    const title = document.createElement('h1');
    title.textContent = 'Форма регистрации';
    section.appendChild(title);

    const inputName = document.createElement('input');
    inputName.classList.add('add-form-name');
    inputName.id = 'name';
    inputName.type = 'text';
    inputName.placeholder = 'Введите имя';
    inputName.required = true;

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

    const registrButton = document.createElement('button');
    registrButton.classList.add('add-form-button-main');
    registrButton.type = 'button';
    registrButton.textContent = "Зарегистрироваться";

    const enterButton = document.createElement('u');
    enterButton.classList.add('add-form-button-link');
    enterButton.type = 'button';
    enterButton.textContent = "Войти";

    fieldset.appendChild(registrButton);
    fieldset.appendChild(enterButton);

    section.appendChild(inputName);
    section.appendChild(inputLogin);
    section.appendChild(inputPassword);
    section.appendChild(fieldset);

    container.appendChild(section);

    registrButton.addEventListener("click", () => {
        registration(inputName.value, inputLogin.value, inputPassword.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchData()
            })
    })

    enterButton.addEventListener("click", () => {
        renderLogin()
    })

    return section;
}

