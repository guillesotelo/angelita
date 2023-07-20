import axios from 'axios';
import { dataObj } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const getHeaders = () => {
    const { token }: dataObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { authorization: `Bearer ${token}` }
}
const getConfig = () => {
    const { token }: dataObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { headers: { authorization: `Bearer ${token}` } }
}

const getPublicKey = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/payment/getPublicKey`)
        return res.data
    } catch (error) { console.error(error) }
}

const createPayment = async (data: dataObj) => {
    try {
        const res = await axios.post(`${API_URL}/api/payment/createPayment`, data)
        return res.data
    } catch (error) { console.error(error) }
}

const createCheckoutSession = async (data: dataObj) => {
    axios.post(`${API_URL}/api/payment/create-checkout-session`, data, getConfig())
        .then((response) => {
            const { url } = response.data
            window.location.href = url
        })
        .catch((error) => {
            console.error(error)
        })
}

const confirmPayment = async (_id: string) => {
    try {
        const res = await axios.post(`${API_URL}/api/payment/confirmPayment`, { _id })
        return res.data
    } catch (error) { console.error(error) }
}

export {
    getPublicKey,
    createPayment,
    confirmPayment,
    createCheckoutSession
}