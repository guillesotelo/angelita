import React, { useEffect, useState } from 'react'
import { dataObj } from '../../types'
import { SERVICES } from '../../constants/services'
import CheckIcon from '../../assets/icons/check-icon.svg'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { confirmPayment } from '../../services'

type Props = {}

export default function SuccessPayment({ }: Props) {
    const [checkout, setCheckout] = useState<number>(-1)
    const [paymentInfo, setPaymentInfo] = useState<dataObj>({})
    const [serviceInfo, setServiceInfo] = useState<dataObj>({})
    const [message, setMessage] = useState<string | null>('')
    const history = useHistory()

    useEffect(() => {
        const payment_intent = new URLSearchParams(document.location.search).get('payment_intent')
        const payment_intent_client_secret = new URLSearchParams(document.location.search).get('payment_intent_client_secret')
        const redirect_status = new URLSearchParams(document.location.search).get('redirect_status')
        const orderId = new URLSearchParams(document.location.search).get('orderId')
        const _checkout = localStorage.getItem('checkout') || ''

        setPaymentInfo({
            payment_intent,
            payment_intent_client_secret,
            redirect_status
        })

        if (!orderId || !_checkout) history.push('/')
        else {
            setCheckout(parseInt(_checkout))
            setServiceInfo(getService(_checkout))
            confirmCurrentPayment(orderId)
        }
        localStorage.clear()
    }, [])

    const confirmCurrentPayment = async (id: string) => {
        const confirmed = await confirmPayment(id)
        if(!confirmed) setMessage('Recibimos tu pago, pero no pudimos enviar la confirmación. Ponte en contacto conmigo para confirmar tu reserva.')
    }

    const getService = (service: number | string, key?: string | number) => {
        return key ? SERVICES[service][key] : SERVICES[service] || {}
    }

    return (
        <div className="success-payment__container">
            <div className='success-payment__wrapper'>
                <h4 className="success-payment__title">Gracias por tu compra!</h4>
                <img alt="Compra exitosa" src={CheckIcon} className='success-payment__success-check' />
                <div className="success-payment__book">
                    <h4 className="success-payment__subtitle">Información sobre tu reserva</h4>
                    <h4 className="success-payment__book-label">Servicio: <strong>{paymentInfo.name || ''}</strong></h4>
                    <h4 className="success-payment__book-label">Cantidad: <strong>{paymentInfo.realQty}</strong></h4>
                    <h4 className="success-payment__book-label">Cuándo: <strong>{paymentInfo.date}</strong></h4>
                    <br />
                    <h4 className="success-payment__book-label">Total: <strong>US ${paymentInfo.realPrice}</strong></h4>
                </div>

                {message ? <h4 className="payment__message">{message}</h4>
:
                <p>
                    Hemos enviado un correo electrónico con todos los detalles sobre tu reserva y pago.
                    <br />
                    Si necesitas aclarar algo o tienes alguna consulta, por favor no dudes en contactarme. Estoy aquí para ayudarte en todo lo que necesites.
                </p>}

                <Button
                    label='Volver'
                    handleClick={() => history.push('/')}
                    bgColor=""
                />
            </div>
        </div>
    )
}