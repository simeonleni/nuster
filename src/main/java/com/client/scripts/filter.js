const home = document.querySelector('.home');
home.addEventListener('click', () => {
    const content = document.querySelector('.post_container')
    content.style.backgroundColor = "red";
})

const trend = document.querySelector('.trending');
trend.addEventListener('click', () => {
    const content = document.querySelector('.post_container')
    content.style.backgroundColor = "green";
})

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = document.querySelector('.post_container')
    content.style.backgroundColor = "yellow";
})