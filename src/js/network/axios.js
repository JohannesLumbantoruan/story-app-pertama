import axios from "axios";

const instance = axios.create({
    baseURL: 'https://story-api.dicoding.dev/v1'
});

export default instance;