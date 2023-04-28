document.addEventListener("DOMContentLoaded", () => {
    let image = "";
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

    const profilePic = document.querySelector(".profile_input");

    profilePic.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function () {
                image = reader.result;
                profilePic.style.backgroundImage = `url('${reader.result}')`;
            };
            reader.readAsDataURL(file);
        });
        document.body.appendChild(fileInput);
        fileInput.click();
        fileInput.remove();
    });

    profilePic.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            profilePic.click();
        }
    });

    const newUser = (name, image, surname, username, password) => {
        const appUser = {
            username: username,
            image: image,
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
        const registerWrapper = document.querySelector(".register-wrapper");
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
                const foundPassword = userData.some((user) => user.password === password);

                usernameInput.style.border = foundUser
                    ? "1px solid green"
                    : "1px solid red";
                passwordInput.style.border = foundPassword
                    ? "1px solid green"
                    : "1px solid red";

                if (foundUser && foundPassword) {
                    newSession(session, username);
                    loginWrapper.style.display = "none";
                }
            } catch (error) {
                console.error(error);
            }
        });

        createUserBtn.addEventListener("click", () => {
            registerHandler();
            loginWrapper.style.display = "none";
            registerWrapper.style.display = "flex";
        });
    };

    const registerHandler = () => {
        const registerForm = document.querySelector(".register-form");
        const nameInput = document.querySelector(".name-input");
        const surnameInput = document.querySelector(".surname-input");
        const usernameInput = document.querySelector(".usernameinput");
        const passwordInput = document.querySelector(".passwordinput");
        const loginBtn = document.querySelector(".login");
        const loginWrapper = document.querySelector(".login-wrapper");
        const registerWrapper = document.querySelector(".register_wrapper");

        loginBtn.addEventListener("click", () => {
            loginWrapper.style.display = "flex";
            registerWrapper.style.display = "none";
        });

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const surname = surnameInput.value.trim();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (name === "" || surname === "" || username === "" || password === "") {
                [nameInput, surnameInput, usernameInput, passwordInput].forEach(
                    (input) => {
                        input.style.border =
                            input.value.trim() === "" ? "1px solid red" : "1px solid green";
                    }
                );
            } else {
                axios.get('http://localhost:8080/users')
                    .then(response => {
                        const userList = response.data;
                        for (let i = 0; i < userList.length; i++) {
                            if (userList[i].username === username) {
                                usernameInput.style.border = "1px solid red";
                                return;
                            }
                        }
                        usernameInput.style.border = "1px solid green";

                        newUser(name, image, surname, username, password);
                        registerWrapper.style.display = "none";
                        loginHandler();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    };

    const userData = () => {
        const user_pic = document.querySelector(".user_pic");
        const username = document.querySelector(".username");
        const name = document.querySelector(".name");
        const surname = document.querySelector(".surname");

        axios.get('http://localhost:8080/session')
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].session === session) {
                        axios.get("http://localhost:8080/users")
                            .then(useresponse => {
                                for (let j = 0; j < useresponse.data.length; j++) {
                                    if (useresponse.data[j].username === response.data[i].user) {
                                        username.innerHTML = response.data[i].user;
                                        user_pic.style.backgroundImage = `url('${useresponse.data[j].image}')`;
                                        name.innerHTML = useresponse.data[j].name;
                                        surname.innerHTML = useresponse.data[j].surname;
                                    }
                                }
                            })
                    }
                }
            })

    }
    userData();

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
