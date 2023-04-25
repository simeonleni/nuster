document.addEventListener("DOMContentLoaded", () => {
    const userAgent = navigator.userAgent;
    const session = userAgent.toString().replace(/\s/g, "");

    const newSession = (session, user) => {
        const appSession = {
            session: session,
            user: user,
        };

        axios
            .post("http://localhost:8080/add/session", appSession)
            .then((response) => { })
            .catch((error) => {
                console.error(error);
            });
    };

    const newUser = (name, surname, username, password) => {
        const appUser = {
            username: username,
            name: name,
            surname: surname,
            password: password,
        };
        axios
            .post("http://localhost:8080/add/user", appUser)
            .then((response) => { })
            .catch((error) => {
                console.error(error);
            });
    };

    const loginHandler = () => {
        const loginWrapper = document.querySelector(".login-wrapper");
        const registerWrapper = document.querySelector(".register_wrapper");
        const loginForm = document.querySelector(".login-form");
        const usernameInput = document.querySelector(".username-input");
        const passwordInput = document.querySelector(".password-input");
        const createUserBtn = document.querySelector(".create_user");

        loginWrapper.style.display = "flex";

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            try {
                const response = await axios.get("http://localhost:8080/users");
                const userData = response.data;
                const foundUser = userData.some((user) => user.username === username);
                const foundPassword = userData.some(
                    (user) => user.password === password
                );

                usernameInput.style.border = foundUser
                    ? "1px solid green"
                    : "1px solid red";
                passwordInput.style.border = foundPassword
                    ? "1px solid green"
                    : "1px solid red";

                if (foundUser && foundPassword) {
                    newSession(session, username);
                }
            } catch (error) {
                console.error(error);
            }
        });

        createUserBtn.addEventListener("click", () => {
            loginWrapper.style.display = "none";
            registerWrapper.style.display = "flex";
        });
    };

    const registerHandler = () => {
        const registerForm = document.querySelector(".register-form");
        const nameInput = document.querySelector('.name-input');
        const surnameInput = document.querySelector('.surname-input');
        const usernameInput = document.querySelector('.usernameinput');
        const passwordInput = document.querySelector('.passwordinput');
        const loginBtn = document.querySelector('.login-btn');
        const loginWrapper = document.querySelector('.login-wrapper');
        const registerWrapper = document.querySelector('.register-wrapper');

        loginBtn.addEventListener('click', () => {
            loginWrapper.style.display = "flex";
            registerWrapper.style.display = "none";
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const surname = surnameInput.value.trim();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (name === "" || surname === "" || username === "" || password === "") {
                [nameInput, surnameInput, usernameInput, passwordInput].forEach(input => {
                    input.style.border = input.value.trim() === "" ? "1px solid red" : "1px solid green";
                });
            } else {
                newUser(name, surname, username, password);
            }
        });
    };

    axios.get('http://localhost:8080/session')
        .then(response => {
            const sessionList = response.data.length;
            const sessionData = response.data;
            if (sessionList === 0) {
                loginHandler();
            } else {
                let isLoggedIn = false;
                for (let i = 0; i < sessionList; i++) {
                    if (sessionData[i].session === session) {
                        isLoggedIn = true;
                        break;
                    }
                }
                if (isLoggedIn) {
                    const loginWrapper = document.querySelector(".login-wrapper");
                    loginWrapper.style.display = "none";
                } else {
                    loginHandler();
                    registerHandler();
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
});
