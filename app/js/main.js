/**Autologin */

let userName = '';



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
                showLoggedInInterface();

                getUserInfo(user.uid)
                    .then((userInfo) => {
                        if (userInfo) {
                            // Отображаем информацию о пользователе на странице
                            showUserInfo(userInfo.firstName, userInfo.lastName);
                        } else {
                            console.log('User info not found');
                        }
                    });

            })
            .catch((error) => {
                // Ошибка входа в систему
                console.error('Login error:', error.message);
            });
    }
});


/**modal window logik */
const openModalBtn = document.querySelector('.open_reg-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');

const regNodde = document.querySelector('.modal__sign-up');
const loginNode = document.querySelector('.modal__sign-in');
const linkToRegNode = document.querySelector('.modal-register-btn');
const linkToLoginNode = document.querySelector('.modal-login-btn');

const loader = document.querySelector('.loader-box');


function openModal(){
    modal.classList.add('open');
}
function closeModal(){
    modal.classList.remove('open');
}

openModalBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal()
});

closeModalBtn.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal()
});

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



const closeMenu = document.querySelector('.header_close_btn');
const headerNode = document.querySelector('.header');
const openMunuNode = document.querySelector('.open__menu-btn');
function closeMenuFunc(){
    headerNode.classList.remove('look')
}
function openMenuFunc(){
    headerNode.classList.add('look')
}

closeMenu.addEventListener('click',()=>{
    closeMenuFunc();
})
openMunuNode.addEventListener('click',()=>{
    openMenuFunc()
})






/**functions show/hide loader */

function showLoader(){
    loader.classList.remove('hide')
}
function hideLoader(){
    loader.classList.add('hide')
}

/**functions for logged/nologged users  (change intarface)*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore-compat.js";
// Your web app's Firease configuration
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
const logoutBtn = document.querySelector('#logout');

function showLoggedInInterface() {
    signupBtnNode.classList.add('hide');
    inputBox.classList.remove('hide');
    logoutBtn.classList.remove('hide')
}

/**functions for change intarface for logout state account */
function showLogoutInInterface() {
    signupBtnNode.classList.remove('hide');
    inputBox.classList.add('hide');
    logoutBtn.classList.add('hide')
}






// Функция для получения информации о пользователе из Firestore
function getUserInfo(userId) {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(userId);

    return userRef.get()
        .then((doc) => {
            if (doc.exists) {
                return doc.data(); // Возвращаем данные пользователя
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
            hideLoader();
            return null;
        });
}

// Функция для отображения имени и фамилии на странице
function showUserInfo(firstName, lastName) {
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = `Привіт, ${firstName} ${lastName}!`;
    userName = `${firstName}  ${lastName}`;
}


/**register logik */
let regBtn = document.querySelector('#register');
regBtn.addEventListener('click', function (e) {
    e.preventDefault();
    register()
})

function register() {
    const email = document.querySelector('#registerPost').value;
    const password = document.querySelector('#registerPassw').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;

    registerUser(email, password, firstName, lastName);

    function registerUser(email, password, firstName, lastName) {
        const auth = firebase.auth();
        const db = firebase.firestore();
        showLoader();
        console.log(email, password, firstName, lastName);
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Успешная регистрация
                    const user = userCredential.user;
                    console.log('User registered:', user);
                    closeModal();
                    localStorage.setItem('user', JSON.stringify({ email, password }));


                    firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            // Пользователь авторизован
                            console.log('User is logged in');
                            showLoggedInInterface()
                            getUserInfo(user.uid)
                                .then((userInfo) => {
                                    if (userInfo) {
                                        // Отображаем информацию о пользователе на странице
                                        showUserInfo(userInfo.firstName, userInfo.lastName);
                                    } else {
                                        console.log('User info not found');
                                    }
                                });
                            // Здесь вы можете выполнить необходимые действия для авторизованного пользователя
                        } else {
                            // Пользователь не авторизован
                            console.log('User is not logged in');
                            // Здесь вы можете выполнить необходимые действия для неавторизованного пользователя
                        }
                    });

                    // Сохраняем дополнительные данные о пользователе в базе данных Firebase
                    const userRef = db.collection('users').doc(user.uid);
                    userRef.set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                        // Другие поля, которые вы хотите сохранить
                    }).then(() => {
                        console.log('User data saved to database');
                        hideLoader();
                        resolve(userCredential);
                    }).catch((error) => {
                        console.error('Error saving user data to database:', error.message);
                        reject(error);
                    });
                })
                .catch((error) => {
                    // Ошибка регистрации
                    console.error('Registration error:', error.message);
                    hideLoader();
                    reject(error);
                    
                });
        });
    }

}







/**Login logik */

document.getElementById('login-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const email = document.getElementById('login-mail').value;
    const password = document.getElementById('login-pass').value;
    showLoader();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Успешный вход
            const user = userCredential.user;
            console.log('User logged in:', user);
            showLoggedInInterface()
            localStorage.setItem('user', JSON.stringify({ email, password }));
            // Перенаправление на другую страницу или выполнение других действий после успешного входа
            closeModal();
            getUserInfo(user.uid)
                .then((userInfo) => {
                    if (userInfo) {
                        // Отображаем информацию о пользователе на странице
                        showUserInfo(userInfo.firstName, userInfo.lastName);
                    } else {
                        console.log('User info not found');
                    }
                });
                hideLoader();

        })
        .catch((error) => {
            // Обработка ошибок входа
            console.error('Login error:', error.message);
            // Отображение сообщения об ошибке пользователю
            alert('Login error: ' + error.message);
            hideLoader();
        });
});






/**logout logik */
// Обработка нажатия кнопки выхода из аккаунта
document.getElementById('logout').addEventListener('click', function () {
    showLoader();
    firebase.auth().signOut()
        .then(() => {
            // Успешный выход из аккаунта
            console.log('User logged out');
            localStorage.removeItem('user');
            showLogoutInInterface();
            const userInfoContainer = document.getElementById('userInfo');
            userInfoContainer.innerHTML = ``;
            hideLoader();
            // Дополнительные действия после выхода из аккаунта, например, перенаправление на другую страницу
        })
        .catch((error) => {
            // Ошибка выхода из аккаунта
            console.error('Logout error:', error.message);
            // Отображение сообщения об ошибке пользователю
            alert('Logout error: ' + error.message);
        });
});






/**add posts */
const db = firebase.firestore();
const postsRef = db.collection('posts');

// Обработчик отправки формы
document.querySelector('.input__btn').addEventListener('click', function (event) {
    event.preventDefault();


    /**formated date */
    // Получение данных из формы
    const title = document.querySelector('.input').value;

    // Сохранение поста в Firestore
    const timestamp = firebase.firestore.Timestamp.now().toDate();

    // Преобразуем дату в нужный формат
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1; // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const year = timestamp.getFullYear();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();

    // Добавляем нули перед числами, если они состоят из одной цифры
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;


    postsRef.add({
        title: title,
        userName: userName,
        timestamp: `${formattedDay}.${formattedMonth}.${year}  ${hours}:${minutes}`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then((docRef) => {
            console.log('Post added with ID: ', docRef.id);
            getPosts();
            // Очистка формы после добавления поста
            document.querySelector('.input').value = '';
        })
        .catch((error) => {
            console.error('Error adding post: ', error);
        });
});







/**get posts */




// Получаем все документы из коллекции постов
function getPosts() {
    const db = firebase.firestore();
    const postsRef = db.collection('posts');
    showLoader();
    // Получаем все документы из коллекции постов
    postsRef.get().then((querySnapshot) => {
        let contentHtml = '';
        // Обрабатываем каждый документ
        querySnapshot.forEach((doc) => {
            const post = doc.data(); // Данные текущего поста
            const postId = doc.id; // ID текущего поста
            let postHtml = `
            <li>
            <p>${post.title}</p>
            <div class="date">
            
              <div>${post.timestamp}</div>
              <div>${post.userName}</div>
            </div>
          </li>
            `;


            contentHtml = contentHtml + postHtml;
          
            // Вставляем HTML-разметку поста на страницу

        });
        document.querySelector('.posts').innerHTML = contentHtml;
        hideLoader();
    }).catch((error) => {
        console.error('Error getting posts:', error);
    });
}

// Вызываем функцию для получения и отображения постов при загрузке страницы
document.addEventListener('DOMContentLoaded', getPosts);