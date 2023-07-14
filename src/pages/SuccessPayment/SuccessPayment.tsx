import React, { useEffect, useState } from 'react'
import { dataObj } from '../../types'
import { SERVICES } from '../../constants/templates/services/services'
import CheckIcon from '../../assets/icons/check-icon.svg'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function SuccessPayment({ }: Props) {
    const [checkout, setCheckout] = useState<number>(-1)
    const [paymentInfo, setPaymentInfo] = useState<dataObj>({})
    const [serviceInfo, setServiceInfo] = useState<dataObj>({})
    const history = useHistory()

    useEffect(() => {
        const payment_intent = new URLSearchParams(document.location.search).get('payment_intent')
        const payment_intent_client_secret = new URLSearchParams(document.location.search).get('payment_intent_client_secret')
        const redirect_status = new URLSearchParams(document.location.search).get('redirect_status')
        const _checkout = localStorage.getItem('checkout') || ''

        setPaymentInfo({
            payment_intent,
            payment_intent_client_secret,
            redirect_status
        })

        if (_checkout) setCheckout(parseInt(_checkout))

        setServiceInfo(getService(_checkout))
    }, [])

    const getService = (service: number | string, key?: string | number) => {
        return key ? SERVICES[service][key] : SERVICES[service] || {}
    }

    return (
        <div className="success-payment__container">
            <h4 className="success-payment__title">Gracias por tu compra!</h4>
            <img alt="Compra exitosa" src={CheckIcon} className='success-payment__success-check' />
            <div className="success-payment__book">
                <h4 className="success-payment__subtitle">Información sobre tu reserva</h4>
                <h4 className="success-payment__book-label">Servicio: <strong>{serviceInfo.name || ''}</strong></h4>
                <h4 className="success-payment__book-label">Cuándo: <strong>xxxx/xx/xx xx:xx</strong></h4>
            </div>

            <Button
                label='Volver'
                handleClick={() => history.push('/')}
                bgColor=""
            />
        </div>
    )
}