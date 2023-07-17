import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { dataObj } from "../../types"
import InputField from "../InputField/InputField"
import Dropdown from "../Dropdown/Dropdown"
import { SERVICES } from "../../constants/services"
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"
import Calendar from "react-calendar"

type Props = {
    checkout?: number
    data: dataObj
    updateInfo: (key: string, e: { [key: string | number]: any }) => void
}

export default function CheckoutForm({ checkout, data, updateInfo }: Props) {
    const [message, setMessage] = useState<string | null>('Error al pagar')
    const [quantity, setQuantity] = useState<string>('1 sesión')
    const [total, setTotal] = useState<string>('0')
    const [discount, setDiscount] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [date, setDate] = useState<any>(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        setQuantity(`1 sesión (${getHours(1)})`)
    }, [])

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    useEffect(() => {
        setTotal(getPrice())
    }, [quantity])

    const buyCart = async () => {
        localStorage.setItem('checkout', String(checkout))
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsProcessing(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/successPayment`,
            },
        })

        if (error && (error.type === "card_error" || error.type === "validation_error")) {
            setMessage(error.message || 'Ha ocurrido un error con el pago. Prueba nuevamente')
        } else {
            setMessage("Ha ocurrido un error inesperado. Prueba nuevamente.")
        }

        setIsProcessing(false)
    }

    const checkData = () => {
        if (isProcessing || !stripe || !elements || !data.name || !data.email) return true
        if (data.name.split(' ').length < 2 || !data.email.includes('@') || !data.email.includes('.')) return true
        return false
    }

    const getPrice = () => {
        const { price, discount } = SERVICES[checkout || 0]
        const hours = Number(quantity.split(' ')[0])
        if (discount) {
            if (discount == '>2=70%') {
                setDiscount('30% OFF')
                const hasDiscount = hours > 1
                return hasDiscount ?
                    (price * .7 * hours).toFixed(2) :
                    (price * hours).toFixed(2)
            }
        }
        return (price * hours).toFixed(2)
    }

    const getHours = (session: number) => {
        return SERVICES[checkout || 0].duration * session > 1 ?
            `${SERVICES[checkout || 0].duration * session} horas` :
            `${session} hora`
    }

    const getQuantityOptions = () => {
        return Array.from({ length: 20 })
            .map((_, i) => i === 0 ?
                `${i + 1} sesión (${getHours(i + 1)})` :
                `${i + 1} sesiones (${getHours(i + 1)}) ${discount}`)
    }

    const getDate = (date: Date) => {
        return new Date(date).toLocaleDateString()
    }

    const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
        const day = date.getDay()
        const today = new Date()
        const isTodayOrBefore = date <= today
        const serviceDay = SERVICES[checkout || -1]?.day || ''
        if (serviceDay) {
            if (serviceDay === 'Martes') return day !== 2 || isTodayOrBefore
            if (serviceDay === 'Miércoles') return day !== 3 || isTodayOrBefore
            if (serviceDay === '1er sábado del mes') return !isFirstSaturdayOfMonth(date) || isTodayOrBefore
            if (serviceDay === 'Lunes a sábados') return day !== 0 || isTodayOrBefore
            if (serviceDay === 'Jueves y sábados') return day !== 4 && day !== 6 || isTodayOrBefore
        }
        return false
    }

    const isFirstSaturdayOfMonth = (date: Date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        return firstDayOfMonth.getDay() === 6 && date.getDate() <= 7
    }

    return (
        <div className="payment__form" >
            <h4 className="payment__contact-info-title">Información del pago</h4>
            <div className="payment__contact-info-row">
                <Dropdown
                    label="Seleccioná la cantidad"
                    setSelected={setQuantity}
                    selected={quantity}
                    value={quantity}
                    options={getQuantityOptions()}
                />
                {openCalendar ?
                    <Calendar
                        locale='es'
                        onChange={setDate}
                        value={date}
                        tileDisabled={tileDisabled}
                    />
                    :
                    <Button
                        label={date ? getDate(date) : 'Seleccionar fecha'}
                        handleClick={() => setOpenCalendar(true)}
                        bgColor="#B0BCEB"
                    />
                }
                <h1 className="payment__total-amount"><span className="payment__total-text">Total</span> ${total}</h1>
            </div>
            <PaymentElement id="payment-element" />
            {message && <h4 className="payment__message">{message}</h4>}
            <Button
                label={isProcessing ? "Procesando pago ..." : "Pagar ahora"}
                handleClick={buyCart}
                disabled={checkData()}
                style={{ alignSelf: 'center' }}
                bgColor=""
            />
        </div>
    )
}
