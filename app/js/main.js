/**Autologin */
window.addEventListener('DOMContentLoaded', () => {
    // Получаем данные о текущем пользователе из локального хранилища
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Если данные о пользователе есть, пытаемся автоматически войти
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Успешный вход в систему
                const user = userCredential.user;
                console.log('User logged in:', user);
                showLoggedInInterface()
            })
            .catch((error) => {
                // Ошибка входа в систему
                console.error('Login error:', error.message);
            });
    }
});



const openModalBtn = document.querySelector('.open_reg-modal');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-btn');


openModalBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.add('open');
});

closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
});



const regNodde = document.querySelector('.modal__sign-up');
const loginNode = document.querySelector('.modal__sign-in');

const linkToRegNode = document.querySelector('.modal-register-btn');
const linkToLoginNode = document.querySelector('.modal-login-btn');

linkToRegNode.addEventListener('click', function (e) {
    e.preventDefault();
    loginNode.classList.add('hide');
    regNodde.classList.remove('hide');
});
linkToLoginNode.addEventListener('click', function (e) {
    e.preventDefault();
    regNodde.classList.add('hide');
    loginNode.classList.remove('hide');
});



/**
 functions for logged/nologged users  (change intarface)
 */



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH0JKKgglFZUriWv1uhnr9ZSiw6M-6i7Q",
    authDomain: "my-blog-9045c.firebaseapp.com",
    projectId: "my-blog-9045c",
    storageBucket: "my-blog-9045c.appspot.com",
    messagingSenderId: "569888142571",
    appId: "1:569888142571:web:01604044d1a496c6d47aae"
};
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);





/**functions for change intarface for login/logout state account */
const signupBtnNode = document.querySelector('#signupbtn');
const inputBox = document.querySelector('#inputbox');

function showLoggedInInterface() {

    signupBtnNode.classList.add('hide');
    inputBox.classList.remove('hide');
}






/**registration user */
function registerUser(email, password) {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
}

let regBtn = document.querySelector('#register');

regBtn.addEventListener('click', function (e) {
    e.preventDefault();
    register()
})
function register() {
    const email = document.querySelector('#registerPost').value;
    const password = document.querySelector('#registerPassw').value;

    console.log(email, password);
    registerUser(email, password)
        .then((userCredential) => {
            // Успешная регистрация
            console.log('User registered:', userCredential.user);
              // Сохраняем данные об аутентификации пользователя в локальном хранилище
              localStorage.setItem('user', JSON.stringify({ email, password }));

            // Отслеживание изменений состояния авторизации пользователя
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // Пользователь авторизован
                    console.log('User is logged in');
                    showLoggedInInterface()
                    // Здесь вы можете выполнить необходимые действия для авторизованного пользователя
                } else {
                    // Пользователь не авторизован
                    console.log('User is not logged in');
                    // Здесь вы можете выполнить необходимые действия для неавторизованного пользователя
                }
            });
        })
        .catch((error) => {
            // Обработка ошибок при регистрации
            console.error('Registration error:', error.message);
        });
}


