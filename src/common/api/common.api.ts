import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ffdb5a84-7670-48ab-a1c2-5437e028d270'
    }
})


