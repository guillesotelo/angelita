import React, { useEffect, useState } from 'react'
import { dataObj } from '../../types'
import ErrorIcon from '../../assets/icons/error-icon.svg'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { getAllServices } from '../../services'

type Props = {}

export default function CheckoutError({ }: Props) {
    const [checkout, setCheckout] = useState<number>(-1)
    const [paymentInfo, setPaymentInfo] = useState<dataObj>({})
    const [serviceInfo, setServiceInfo] = useState<dataObj>({})
    const [dbServices, setDbServices] = useState<dataObj[]>([])
    const history = useHistory()

    useEffect(() => {
        const payment_intent = new URLSearchParams(document.location.search).get('payment_intent')
        const payment_intent_client_secret = new URLSearchParams(document.location.search).get('payment_intent_client_secret')
        const redirect_status = new URLSearchParams(document.location.search).get('redirect_status')

        setPaymentInfo({
            payment_intent,
            payment_intent_client_secret,
            redirect_status
        })

        const _checkout = localStorage.getItem('checkout') || ''
        if (_checkout) setCheckout(parseInt(_checkout))
        getServices()
    }, [])

    useEffect(() => {
        if (dbServices.length) setServiceInfo(getService())
    }, [dbServices])

    const getServices = async () => {
        try {
            const allServices = await getAllServices()
            if (allServices && allServices.length) setDbServices(allServices)
        } catch (err) {
            console.error(err)
        }
    }

    const getService = () => {
        return dbServices.find(s => s._id === checkout) || {}
    }

    return (
        <div className="success-payment__container">
            <div className='success-payment__wrapper' style={{ width: '40%' }}>
                <h4 className="success-payment__title">Ocurrió un error al procesar la reserva</h4>
                <img alt="Compra exitosa" src={ErrorIcon} className='success-payment__success-error' />
                <p>
                    Lamentablemente, no hemos podido procesar tu reserva y, por lo tanto, el pago no se ha realizado.
                    <br />
                    <br />
                    Te recomendamos intentarlo nuevamente, y si el error persiste, por favor contáctame para que pueda ayudarte a resolverlo.
                </p>
                <Button
                    label='Volver'
                    handleClick={() => history.push('/')}
                    bgColor=""
                />
            </div>
        </div>
    )
}