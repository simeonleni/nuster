const imageInput = document.querySelector('.image_input');
const post_text = document.querySelector('#post_text');
const post_title = document.querySelector('#post_title');
const new_post = document.querySelector('.new_post');
const add_post = document.querySelector('.add_post');
const content = document.querySelector('.content');
const right = document.querySelector('.right');

const image_preview = document.querySelector('.image_preview');
const title_preview = document.querySelector('.title_preview');
const text_preview = document.querySelector('.text_preview');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';

const elements = {
    imageInput,
    post_text,
    post_title,
    new_post,
    add_post,
    content,
    right,
    image_preview,
    title_preview,
    text_preview,
    fileInput,
};

// add event listeners
imageInput.addEventListener('click', () => {
    fileInput.click();
});

post_text.addEventListener('input', () => {
    const text = post_text.value;
    text_preview.textContent = text;
});

post_title.addEventListener('input', () => {
    const text = post_title.value;
    title_preview.textContent = text;
});

new_post.addEventListener('submit', (e) => {
    new_post.reset();
    content.classList.toggle('add_toggle');
});

add_post.addEventListener('click', () => {
    content.classList.toggle('add_toggle');
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        image_preview.style.backgroundImage = `url('${reader.result}')`;
        right.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

text_preview.style.whiteSpace = 'pre-wrap';
