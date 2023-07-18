import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { dataObj } from "../../types"
import Dropdown from "../Dropdown/Dropdown"
import { SERVICES } from "../../constants/services"
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"
import Calendar from "react-calendar"
import { createCheckoutSession } from "../../handlers"

type Props = {
    checkout?: number
    data: dataObj
    updateInfo: (key: string, e: { [key: string | number]: any }) => void
}

export default function CheckoutForm({ checkout, data, updateInfo }: Props) {
    const [message, setMessage] = useState<string | null>('')
    const [quantity, setQuantity] = useState<string>('1 sesión')
    const [total, setTotal] = useState<string>('0')
    const [discount, setDiscount] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [date, setDate] = useState<any>(null)
    const [selectedDates, setSelectedDates] = useState<any>([])
    const [openCalendar, setOpenCalendar] = useState(false)
    const [dataOk, setDataOk] = useState(true)
    const [openCalendars, setOpenCalendars] = useState<dataObj>({})
    const [paymentData, setPaymentData] = useState<dataObj>({})

    useEffect(() => {
        setQuantity(`1 sesión (${getHours(1)})`)
    }, [])

    useEffect(() => {
        setDataOk(checkData())
    }, [data, date, selectedDates])

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    useEffect(() => {
        setOpenCalendars({})
    }, [selectedDates])

    useEffect(() => {
        setTotal(getPrice())
    }, [quantity])

    const checkoutStripe = async () => {
        setIsProcessing(true)
        localStorage.setItem('checkout', String(checkout))
        try {
            await createCheckoutSession({
                items: [{
                    ...data,
                    date,
                    selectedDates,
                    checkout,
                    name: SERVICES[checkout || -1].name,
                    quantity: Number(quantity.split(' ')[0]),
                    priceInCents: Number(getPrice().replace('.', ''))
                    // PASAR TODA LA DATA DEL SERVICIO CON PRECIO, CANTIDAD, NOMBRE CON CANTIDAD...
                }]
            })
        } catch (err) {
            console.error(err)
            setMessage('Ha ocurrido un error. Inténtalo nuevamente.')
        } finally {
            setIsProcessing(false)
        }
    }

    const checkData = () => {
        const qty = Number(quantity.split(' ')[0])
        console.log('data', data)
        console.log('qty', qty)
        console.log('date', date)
        console.log('selectedDates', selectedDates)
        if (isProcessing || !data.name || !data.email) return true
        if (data.name.split(' ').length < 2 || !data.email.includes('@') || !data.email.includes('.')) return true
        if (Number(getPrice()) > 0 && !date) return true
        if (qty > 1 && (!selectedDates.length || selectedDates.length !== qty)) return true
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
        return Array.isArray(date) ?
            date.map((d: Date) => new Date(d).toLocaleDateString()).join(', ') :
            new Date(date).toLocaleDateString()
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

    const handleDateChange = (value: any): void => {
        if (value instanceof Date) {
            const updatedDates = [...selectedDates]
            const dateIndex = selectedDates.findIndex((d: any) => value.toDateString() === d.toDateString())
            if (dateIndex > -1) updatedDates.splice(dateIndex, 1)
            else updatedDates.push(value)
            setSelectedDates(updatedDates)
        }
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
                        className='react-calendar calendar-fixed'
                    />
                    : Number(quantity.split(' ')[0]) === 1 ?
                        <Button
                            label={date ? getDate(date) : 'Seleccionar fecha'}
                            handleClick={() => setOpenCalendar(true)}
                            bgColor="#B0BCEB"
                        />
                        : ''
                }
                <h1 className="payment__total-amount"><span className="payment__total-text">Total</span> ${total}</h1>
            </div>
            <div className="payment__various-dates">
                {Number(quantity.split(' ')[0]) > 1 ?
                    Array.from({ length: Number(quantity.split(' ')[0]) }).map((_, i) =>
                        <div key={i} className="payment__various-dates-item">
                            <h4 className="payment__date-col">Sesión {i + 1}</h4>
                            {openCalendars[i] ?
                                <Calendar
                                    locale='es'
                                    onChange={handleDateChange}
                                    value={selectedDates[i]}
                                    tileDisabled={tileDisabled}
                                    className='react-calendar calendar-fixed'
                                />
                                :
                                <Button
                                    label={selectedDates[i] ? getDate(selectedDates[i]) : 'Seleccionar fecha'}
                                    handleClick={() => setOpenCalendars({ ...openCalendars, [i]: true })}
                                    bgColor="#B0BCEB"
                                    style={{ width: 'fit-content' }}
                                />
                            }
                        </div>)
                    : ''}
            </div>
            {message && <h4 className="payment__message">{message}</h4>}
            <Button
                label='Pagar ahora'
                handleClick={checkoutStripe}
                disabled={dataOk}
                style={{ alignSelf: 'center' }}
                bgColor=""
            />
        </div>
    )
}
