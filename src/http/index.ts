import axios from 'axios';

export const API_URL = 'hhtp://localhost:5000'

const $api = axios.create({
    baseURL: API_URL,
})

export default $api;