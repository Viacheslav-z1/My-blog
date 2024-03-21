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
            return null;
        });
}

// Функция для отображения имени и фамилии на странице
function showUserInfo(firstName, lastName) {
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = `Привіт, ${firstName} ${lastName}!`;
}







// /**registration user */
// function registerUser(email, password) {
//     return createUserWithEmailAndPassword(getAuth(app), email, password);
// }

let regBtn = document.querySelector('#register');

regBtn.addEventListener('click', function (e) {
    e.preventDefault();
    register()
})
// function register() {
//     const email = document.querySelector('#registerPost').value;
//     const password = document.querySelector('#registerPassw').value;
//     console.log(email, password);
//     registerUser(email, password)
//         .then((userCredential) => {
//             // Успешная регистрация
//             console.log('User registered:', userCredential.user);
//               // Сохраняем данные об аутентификации пользователя в локальном хранилище
//               localStorage.setItem('user', JSON.stringify({ email, password }));

//             // Отслеживание изменений состояния авторизации пользователя
//             firebase.auth().onAuthStateChanged(function (user) {
//                 if (user) {
//                     // Пользователь авторизован
//                     console.log('User is logged in');
//                     showLoggedInInterface()
//                     // Здесь вы можете выполнить необходимые действия для авторизованного пользователя
//                 } else {
//                     // Пользователь не авторизован
//                     console.log('User is not logged in');
//                     // Здесь вы можете выполнить необходимые действия для неавторизованного пользователя
//                 }
//             });
//         })
//         .catch((error) => {
//             // Обработка ошибок при регистрации
//             console.error('Registration error:', error.message);
//         });

// }



// Получение ссылки на базу данных Firestore


function register() {
    const email = document.querySelector('#registerPost').value;
    const password = document.querySelector('#registerPassw').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;

    // registerUser(email, password, firstName, lastName)
    //     .then((userCredential) => {
    //         // Успешная регистрация
    //         console.log('User registered:', userCredential.user);

    //         // Сохраняем данные об аутентификации пользователя в локальном хранилище
    //         localStorage.setItem('user', JSON.stringify({ email, password }));

    //         // Отслеживание изменений состояния авторизации пользователя
    //         firebase.auth().onAuthStateChanged(function (user) {
    //             if (user) {
    //                 // Пользователь авторизован
    //                 console.log('User is logged in');
    //                 showLoggedInInterface()
    //                 // Здесь вы можете выполнить необходимые действия для авторизованного пользователя
    //             } else {
    //                 // Пользователь не авторизован
    //                 console.log('User is not logged in');
    //                 // Здесь вы можете выполнить необходимые действия для неавторизованного пользователя
    //             }
    //         });
    //     })
    //     .catch((error) => {
    //         // Обработка ошибок при регистрации
    //         console.error('Registration error:', error.message);
    //     });


    registerUser(email, password, firstName, lastName);

    function registerUser(email, password, firstName, lastName) {
        const auth = firebase.auth();
        const db = firebase.firestore();

        console.log(email, password, firstName, lastName);
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Успешная регистрация
                    const user = userCredential.user;
                    console.log('User registered:', user);
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
                        resolve(userCredential);
                    }).catch((error) => {
                        console.error('Error saving user data to database:', error.message);
                        reject(error);
                    });
                })
                .catch((error) => {
                    // Ошибка регистрации
                    console.error('Registration error:', error.message);
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

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Успешный вход
            const user = userCredential.user;
            console.log('User logged in:', user);
            showLoggedInInterface()
            localStorage.setItem('user', JSON.stringify({ email, password }));
            // Перенаправление на другую страницу или выполнение других действий после успешного входа

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
            // Обработка ошибок входа
            console.error('Login error:', error.message);
            // Отображение сообщения об ошибке пользователю
            alert('Login error: ' + error.message);
        });
});






/**logout logik */
// Обработка нажатия кнопки выхода из аккаунта
document.getElementById('logout').addEventListener('click', function () {
    firebase.auth().signOut()
        .then(() => {
            // Успешный выход из аккаунта
            console.log('User logged out');
            localStorage.removeItem('user');
            showLogoutInInterface();
            const userInfoContainer = document.getElementById('userInfo');
            userInfoContainer.innerHTML = ``;
            // Дополнительные действия после выхода из аккаунта, например, перенаправление на другую страницу
        })
        .catch((error) => {
            // Ошибка выхода из аккаунта
            console.error('Logout error:', error.message);
            // Отображение сообщения об ошибке пользователю
            alert('Logout error: ' + error.message);
        });
});