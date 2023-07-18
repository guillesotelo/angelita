import axios from 'axios'
import { dataObj } from "../types"
const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL
const headers = { 'Content-Type': 'application/json' }

export const createCheckoutSession = async (data: dataObj) => {
    axios.post(`${API_URL}/api/payment/create-checkout-session`, data, { headers })
        .then((response) => {
            const { url } = response.data
            window.location.href = url
        })
        .catch((error) => {
            console.error(error)
        })
}