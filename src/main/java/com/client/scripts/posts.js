window.onload = function () {
    const post_user_module = (profilePic, studentHandle, studentName) => {
        const student_card = document.createElement("div");
        student_card.classList.add("student_card");

        const user_picture = document.createElement("span");
        user_picture.classList.add("user_picture");

        const profile_picture = document.createElement("img");
        profile_picture.src = profilePic;
        profile_picture.alt = "Profile picture";

        const user_detail = document.createElement("div");
        user_detail.classList.add("user_detail");

        const user_handle = document.createElement("p");
        user_handle.classList.add("user_handle");
        user_handle.innerText = studentHandle;

        const student_name = document.createElement("p");
        student_name.classList.add("student_name");
        student_name.innerText = studentName;

        user_picture.appendChild(profile_picture);
        student_card.appendChild(user_picture);

        user_detail.appendChild(user_handle);
        user_detail.appendChild(student_name);

        student_card.appendChild(user_detail);
        return student_card;
    };



    const post_rating = (postClass, post_supports, post_oppose) => {
        const post_Class = document.createElement('div');
        post_Class.classList.add(postClass);

        const support = document.createElement('button');
        support.classList.add('support');

        const supportBtn = document.createElement('img');
        supportBtn.src = "/src/main/java/com/client/assets/up.png";
        supportBtn.alt = "support";

        const support_count = document.createElement('p');
        support_count.classList.add('support_count');

        support_count.innerHTML = post_supports;

        const oppose = document.createElement('button');
        oppose.classList.add('oppose');

        const opposeBtn = document.createElement('img');
        opposeBtn.src = "/src/main/java/com/client/assets/down.png";
        opposeBtn.alt = "oppose";

        const oppose_count = document.createElement('p');
        oppose_count.classList.add('oppose_count');
        oppose_count.innerHTML = post_oppose;

        support.addEventListener("click", () => {
            const supportCount = parseInt(support_count.innerHTML);
            if (supportCount >= 0) {
                support_count.innerHTML = supportCount + 1;
                oppose_count.innerHTML = Math.max(parseInt(oppose_count.innerHTML) - 1, 0);
            }
        });

        oppose.addEventListener("click", () => {
            const opposeCount = parseInt(oppose_count.innerHTML);
            if (opposeCount >= 0) {
                oppose_count.innerHTML = opposeCount + 1;
                support_count.innerHTML = Math.max(parseInt(support_count.innerHTML) - 1, 0);
            }
        });

        support.appendChild(supportBtn);
        support.appendChild(support_count);

        oppose.appendChild(opposeBtn);
        oppose.appendChild(oppose_count);

        post_Class.appendChild(support);
        post_Class.appendChild(oppose);

        return post_Class;
    };

    const image_post_module = (postImg, postTitle, postDescription, post_supports, post_oppose, profilePic, studentHandle, studentName) => {

        const image_post = document.createElement('div');
        image_post.classList.add('image_post');

        const post_left = document.createElement('div');
        post_left.classList.add('post_left');

        const post_image = document.createElement('img');
        post_image.src = postImg;
        post_image.alt = postDescription;

        const post_right = document.createElement('div');
        post_right.classList.add('post_right');

        const right_top = document.createElement('div');
        right_top.classList.add('right_top');

        const post_user = document.createElement('div');
        post_user.classList.add('post_user');

        post_user.appendChild(post_user_module(profilePic, studentHandle, studentName));

        const right_middle = document.createElement('div');
        right_middle.classList.add('right_middle');


        const post_title = document.createElement('p');
        post_title.classList.add('post_title');
        post_title.innerHTML = postTitle;

        const post_text = document.createElement('p');
        post_text.innerText = postDescription;

        image_post.appendChild(post_left);
        post_left.appendChild(post_image);

        post_right.appendChild(right_top);
        right_top.appendChild(post_user);

        post_right.appendChild(right_middle);
        right_middle.appendChild(post_title);
        right_middle.appendChild(post_text);

        image_post.appendChild(post_right);
        const imagePostRating = post_rating('right_bottom', post_supports, post_oppose);
        post_right.appendChild(imagePostRating);
        return image_post;
    }


    const text_post_module = (postTitle, postDescription, post_supports, post_oppose, profilePic, studentHandle, studentName) => {
        const text_post = document.createElement('div');
        text_post.classList.add('text_post');
        const top = document.createElement('div');
        top.classList.add('top')

        const post_user = document.createElement('div');
        post_user.classList.add('post_user');


        const middle = document.createElement('div');
        middle.classList.add('middle');

        const post_title = document.createElement('p');
        post_title.classList.add('post_title');
        post_title.innerHTML = postTitle;

        const post_text = document.createElement('p');
        post_text.innerText = postDescription;

        const imagePostRating = post_rating('bottom', post_supports, post_oppose);

        text_post.appendChild(top)
        post_user.appendChild(post_user_module(profilePic, studentHandle, studentName));
        top.appendChild(post_user)


        text_post.appendChild(middle)
        middle.appendChild(post_title);
        middle.appendChild(post_text)

        text_post.appendChild(imagePostRating)

        return text_post;

    }
    const posts = () => {
        axios.get("http://localhost:8080/posts").then(postResponse => {
            const poster = async (user) => {
                const userResponse = await axios.get("http://localhost:8080/users");
                const length = userResponse.data.length;
                const data = userResponse.data;
                for (let i = 0; i < length; i++) {
                    if (data[i].username === user) {
                        const userobject = {
                            image: data[i].image,
                            username: data[i].username,
                            name: `${data[i].name} ${data[i].surname}`
                        };
                        return userobject;
                    }
                }
                return null;
            };

            for (let i = 0; i < postResponse.data.length; i++) {
                const user = postResponse.data[i].creator;
                poster(user).then(userobject => {
                    var post_supports = 0;
                    var post_oppose = 0;
                    let postTitle = postResponse.data[i].title;
                    let postImg = postResponse.data[i].postImage;
                    let postDescription = postResponse.data[i].descriptions;
                    let profilePic = userobject.image;
                    let studentHandle = userobject.username;
                    let studentName = userobject.name;

                    let postElement;
                    if (postResponse.data[i].postImage === "") {
                        postElement = text_post_module(postTitle, postDescription, post_supports, post_oppose, profilePic, studentHandle, studentName);
                    } else {
                        postElement = image_post_module(postImg, postTitle, postDescription, post_supports, post_oppose, profilePic, studentHandle, studentName);
                    }

                    postElement.addEventListener("click", () => {
                        alert(`Post ID: ${postResponse.data[i].id}, Post Title: ${postResponse.data[i].title}`);
                    });

                    document.querySelector("#post_container").appendChild(postElement);
                });
            }
        });
    };
    posts();
}