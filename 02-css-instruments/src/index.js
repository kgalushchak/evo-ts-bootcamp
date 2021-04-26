const axios = require('axios');

const token = process.env.TOKEN;
const imagesContainer = document.querySelector('#image-container');

const server = axios.create({
  baseURL: 'https://api.unsplash.com'
});

async function getImageData() {
  const response = await server.get('search/photos?client_id=&query=cat&per_page=30', {
    headers: {
      Authorization: 'Client-ID ' + token
    }
  });
  const images = response.data.results;
  images.forEach(image => {
    const div = document.createElement('div');
    div.setAttribute('style', `width:${image.width*300/image.height}px;flex-grow:${image.width*300/image.height};`);
    const picture = document.createElement('img');
    picture.setAttribute('src', image.urls.regular);
    picture.setAttribute('loading', 'lazy');
    div.appendChild(picture);
    imagesContainer.appendChild(div);
  });
}

getImageData();
