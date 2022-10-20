// write your code here
const form = document.querySelector('form')
const div = document.querySelector('#ramen-menu')
const div2 = document.querySelector('#ramen-detail')
const h2 = document.querySelector('.name');
const h3 = document.querySelector('.restaurant');
const span = document.querySelector('#rating-display');
const p = document.querySelector('#comment-display');
const image2 = document.querySelector('.detail-image')

fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramen => renderRamenImage(ramen))

function renderRamenImage(ramen) {
    ramen.forEach(ramen => {
        const image = document.createElement('img')
        image.src = ramen.image
        div.appendChild(image)

        image.addEventListener('click', (e) => {
            e.preventDefault()
            image2.src = ramen.image;
            image2.alt = ramen.name;
            h2.textContent = ramen.name;
            h3.textContent = ramen.restaurant;
            span.textContent = ramen.rating;
            p.textContent = ramen.comment;
        })

    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    newObject = {
        name: e.target['new-name'].value,
        restaurant: e.target['new-restaurant'].value,
        image: e.target['new-image'].value,
        rating: e.target['new-rating'].value,
        comment: e.target['new-comment'].value
    };
    console.log(newObject);
    fetch('http://localhost:3000/ramens',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
        .then(response => response.json())
        .then(ramen => {
            const image = document.createElement('img')
            image.src = ramen.image
            div.appendChild(image)
        });
});