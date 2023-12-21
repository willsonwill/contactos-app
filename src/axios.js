import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { 'X-Custom-Header': 'foobar' },
    headers: { 'Content-Type': 'application/json' },
    headers: { 'Access-Control-Allow-Origin': '*' },
    headers: { 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' },
});

export default instance