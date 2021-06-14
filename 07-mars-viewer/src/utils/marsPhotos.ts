import axios from 'axios';

const apiKey = process.env.REACT_APP_MARS_API_KEY;

const server = axios.create({
  baseURL: 'https://api.nasa.gov'
});

export async function getMarsPhotos(sol: number) {
  const response = await server.get(`mars-photos/api/v1/rovers/spirit/photos?sol=${sol}&api_key=${apiKey}`);
  return response.data.photos;
}
