const elements = {
    imageInput: document.querySelector('.image_input'),
    postText: document.querySelector('#post_text'),
    postTitle: document.querySelector('#post_title'),
    newPost: document.querySelector('.new_post'),
    addPost: document.querySelector('.add_post'),
    content: document.querySelector('.content'),
    right: document.querySelector('.right'),
    imagePreview: document.querySelector('.image_preview'),
    titlePreview: document.querySelector('.title_preview'),
    textPreview: document.querySelector('.text_preview'),
    fileInput: document.createElement('input'),
};

const userAgent = navigator.userAgent;
const currentSession = userAgent.toString().replace(/\s/g, '');
let title = '';
let imageBytes = '';
let description = '';

elements.fileInput.type = 'file';
elements.fileInput.accept = 'image/*';

const sessionUser = async () => {
    try {
        const response = await axios.get('http://localhost:8080/session');
        const sessionList = response.data.length;
        const sessionData = response.data;

        for (let i = 0; i < sessionList; i++) {
            if (sessionData[i].session === currentSession) {
                const username = sessionData[i].user;
                return anotherFunction(username);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const anotherFunction = (username) => {
    return username;
};

const addPost = (title, creator, image, descriptions) => {
    const postData = {
        title: title,
        creator: creator,
        postImage: image,
        descriptions: descriptions,
    };

    axios
        .post('http://localhost:8080/add/post', postData)
        .then(() => { })
        .catch((error) => {
            console.error(error);
        });
};

// add event listeners
elements.imageInput.addEventListener('click', () => {
    elements.fileInput.click();
});

elements.postText.addEventListener('input', () => {
    const text = elements.postText.value;
    elements.textPreview.textContent = text;
    description = text;
});

elements.postTitle.addEventListener('input', () => {
    const text = elements.postTitle.value;
    elements.titlePreview.textContent = text;
    title = text;
});

elements.newPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    const creator = await sessionUser();
    console.log(title)
    console.log(imageBytes)
    addPost(title, creator, imageBytes, description);
    elements.newPost.reset();
    elements.content.classList.toggle('add_toggle');
});

elements.addPost.addEventListener('click', () => {
    elements.content.classList.toggle('add_toggle');
});

elements.fileInput.addEventListener('change', () => {
    const file = elements.fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        elements.imagePreview.style.backgroundImage = `url('${reader.result}')`;
        imageBytes = reader.result.toString();
        elements.right.style.display = 'block';
    };

    reader.readAsDataURL(file);
});

elements.textPreview.style.whiteSpace = 'pre-wrap';
