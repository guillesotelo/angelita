import React, { useEffect, useState } from 'react'
import { dataObj, orderType } from '../../types'
import CheckIcon from '../../assets/icons/check-icon.svg'
import ErrorIcon from '../../assets/icons/error-icon.svg'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { confirmPayment } from '../../services'
import MoonLoader from "react-spinners/MoonLoader"

type Props = {}

export default function SuccessPayment({ }: Props) {
    const [paymentInfo, setPaymentInfo] = useState<orderType>({})
    const [message, setMessage] = useState<string | null>('')
    const [loading, setLoading] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {
        const orderId = new URLSearchParams(document.location.search).get('orderId')

        if (!orderId) history.push('/')
        else confirmCurrentPayment(String(orderId))

        localStorage.clear()
    }, [])

    const confirmCurrentPayment = async (id: string) => {
        setLoading(true)
        try {
            const confirmed = await confirmPayment(id)
            if (!confirmed) {
                setLoading(false)
                return setMessage('Recibimos tu pago, pero no pudimos confirmar tu reserva debido a un error del sistema. Por favor, ponte en contacto conmigo para confirmar tu reserva manualmente.')
            }
            setLoading(false)
            setPaymentInfo({ ...confirmed })
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const getDate = (date: Date) => {
        return Array.isArray(date) ?
            date.map((d: Date) => new Date(d).toLocaleDateString("es-ES")).join(', ') :
            new Date(date).toLocaleDateString("es-ES")
    }

    return (
        <div className="success-payment__container">
            <div className='success-payment__wrapper'>
                {!loading ? <h4 className="success-payment__title">{paymentInfo.name ? '¡Reserva confirmada!' : 'Ocurrió un error al confirmar tu reserva'}</h4> : ''}
                {loading ? '' : paymentInfo.name ?
                    <img alt="Compra exitosa" src={CheckIcon} className='success-payment__success-check' />
                    :
                    <img alt="Compra exitosa" src={ErrorIcon} className='success-payment__success-error' />
                }
                {loading ?
                    <div className='flex-col' style={{ marginTop: '5rem' }}>
                        <MoonLoader color='#0057ad' size={70} />
                        <p>Cargando los datos de tu reserva...</p>
                    </div>
                    :
                    <div className="success-payment__book">
                        <h4 className="success-payment__subtitle">Información sobre tu reserva</h4>
                        {paymentInfo.name ? <h4 className="success-payment__book-label"><strong>Servicio:</strong> {paymentInfo.name}</h4> : ''}
                        {paymentInfo.name !== 'Coaching' && paymentInfo.realQty ? <h4 className="success-payment__book-label"><strong>Cantidad:</strong> {paymentInfo.realQty}</h4> : ''}
                        {paymentInfo.date ? <h4 className="success-payment__book-label"><strong>Cuándo:</strong> {paymentInfo.date}</h4> : ''}
                        {paymentInfo.realPrice ? <h4 className="success-payment__book-label"><strong>Total: </strong>US ${paymentInfo.realPrice}</h4> : ''}
                        {paymentInfo.name === 'Coaching' ? <h4 className="success-payment__book-label" style={{ color: '#d11919' }}>Recuerda <a href='https://angelita.vercel.app/contacto'>contactarte</a> conmigo para coordinar la fecha de inicio.</h4> : ''}
                        {message ?
                            <h4 className="success-payment__message-error">{message}</h4>
                            :
                            <p className="success-payment__message">
                                Hemos enviado un correo electrónico con todos los detalles sobre tu reserva y pago.
                                <br />
                                Si necesitas aclarar algo o tienes alguna consulta, por favor no dudes en contactarme. Estoy aquí para ayudarte en todo lo que necesites.
                            </p>}
                    </div>}


                {loading ? '' :
                    <Button
                        label='Volver'
                        handleClick={() => history.push('/')}
                        bgColor=""
                    />}
            </div>
        </div>
    )
}