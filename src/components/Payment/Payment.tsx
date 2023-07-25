import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { dataObj } from "../../types"
import Dropdown from "../Dropdown/Dropdown"
import { SERVICES } from "../../constants/services"
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"
import Calendar from "react-calendar"
import { createBooking, createCheckoutSession } from "../../services/"
import InputField from "../InputField/InputField"
import { useHistory } from "react-router-dom"

type Props = {
    checkout?: number
}

function Payment({ checkout }: Props) {
    const [data, setData] = useState({ username: '', email: '', country: '', phone: '' })
    const [message, setMessage] = useState<string | null>('')
    const [quantity, setQuantity] = useState<string>('1 sesión')
    const [total, setTotal] = useState<string>('0')
    const [discount, setDiscount] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [date, setDate] = useState<any>(null)
    const [selectedDates, setSelectedDates] = useState<any>([])
    const [openCalendar, setOpenCalendar] = useState(false)
    const [dataOk, setDataOk] = useState(true)
    const [contribute, setContribute] = useState('')
    const [openCalendars, setOpenCalendars] = useState<dataObj>({})
    const history = useHistory()


    useEffect(() => {
        setQuantity(`1 sesión (${getHours(1)})`)
    }, [])

    useEffect(() => {
        setDataOk(checkData())
    }, [data, date, selectedDates, quantity, isProcessing])

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    useEffect(() => {
        setOpenCalendars({})
    }, [selectedDates])

    useEffect(() => {
        setTotal(getPrice())
    }, [quantity, contribute])

    const updateInfo = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const getServiceData = (data: string | number) => {
        return SERVICES[checkout || -1][data]
    }

    const checkoutStripe = async () => {
        setIsProcessing(true)
        localStorage.setItem('checkout', String(checkout))
        const dates = selectedDates.length ? selectedDates : date

        const paymentData = {
            ...data,
            date: getDateAndTime(dates),
            dateObject: JSON.stringify(date),
            dateObjects: JSON.stringify(selectedDates),
            rawData: SERVICES[checkout || -1],
            selectedDates,
            checkout,
            name: getServiceData('name'),
            quantity: 1, // We pass the total amount with discounts if any
            realQty: getQuantity(),
            realPrice: getPrice(),
            priceInCents: Number(getPrice().replace('.', '')),
            image: 'https://www.naturallydating.com/wp-content/uploads/2021/01/first-date-ideas-scaled.jpg',
            description: getDescription(),
        }

        try {
            await createCheckoutSession({ items: [paymentData], locale: 'es' })
        } catch (err) {
            console.error(err)
            setMessage('Ha ocurrido un error. Inténtalo nuevamente.')
            setIsProcessing(false)
        }
    }

    const getDescription = () => {
        return getServiceData('description') || discountText()
    }

    const discountText = () => {
        const { discount, price } = SERVICES[checkout || 0]
        if (discount) {
            const dsc = Number(discount.split('=')[1].replace('%', ''))
            return `Descuento del ${100 - dsc}% desde la segunda sesión consecutiva - Precio ordinario: $${price}.00`
        } else if (price) return 'Precio sin descuento'
        return ''
    }

    const getQuantity = () => {
        return Number(quantity.split(' ')[0]) || 1
    }

    const checkData = () => {
        const qty = getQuantity()
        if (isProcessing || !data.username || !data.email) return true
        if (data.username.split(' ').length < 2 || !data.email.includes('@') || !data.email.includes('.')) return true
        if (Number(getPrice()) > 0 && !date && !selectedDates.length) return true
        if (qty > 1 && (!selectedDates.length || selectedDates.length !== qty)) return true
        return false
    }

    const getPrice = () => {
        const { price, discount } = SERVICES[checkout || 0]
        const hours = getQuantity()
        if (discount) {
            if (discount == '>2=70%') {
                setDiscount('30% OFF')
                const hasDiscount = hours > 1
                return hasDiscount ?
                    (price * .7 * hours).toFixed(2) :
                    (price * hours).toFixed(2)
            }
        }
        return contribute ?
            Number(contribute.split('US $')[1]).toFixed(2) :
            (price * hours).toFixed(2)
    }

    const getHours = (session: number) => {
        return getServiceData('duration') * session > 1 ?
            `${getServiceData('duration') * session} horas` :
            `${session} hora`
    }

    const getQuantityOptions = () => {
        return Array.from({ length: 20 })
            .map((_, i) => i === 0 ?
                `${i + 1} sesión (${getHours(i + 1)})` :
                `${i + 1} sesiones (${getHours(i + 1)}) ${discount}`)
    }

    const getContributeOptions = () => {
        return Array.from({ length: 100 })
            .map((_, i) => i === 0 ? `US $${5}` : `US $${(i + 1) * 5}`)
    }

    const getDateAndTime = (date: Date) => {
        return Array.isArray(date) ?
            date.map((d: Date) => new Date(d).toLocaleString([], { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })).join(' - ') :
            new Date(date).toLocaleString([], { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    }

    const getDate = (date: Date) => {
        return Array.isArray(date) ?
            date.map((d: Date) => {
                new Date(d).toLocaleDateString("es-ES")
            }).join(', ') :
            new Date(date).toLocaleDateString("es-ES")
    }


    const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
        const day = date.getDay()
        const today = new Date()
        const isTodayOrBefore = date <= today
        const serviceDay = getServiceData('day') || ''
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

    const handleDateChange = (value: any, index: number): void => {
        if (value instanceof Date) {
            const updatedDates = [...selectedDates]
            const mapDates = updatedDates.map(date => date.toLocaleDateString())
            const dateVal = value.toLocaleDateString()

            if (!mapDates.includes(dateVal) || mapDates.indexOf(dateVal) === index) updatedDates[index] = value
            setSelectedDates(updatedDates)
        }
    }

    const reserveService = async () => {
        setIsProcessing(true)
        try {
            localStorage.setItem('checkout', String(checkout))
            const dates = selectedDates.length ? selectedDates : date
            const reserved = await createBooking({
                ...data,
                date: getDateAndTime(dates),
                dateObject: JSON.stringify(date),
                dateObjects: JSON.stringify(selectedDates),
                rawData: SERVICES[checkout || -1],
                selectedDates,
                checkout,
                name: getServiceData('name'),
                quantity: 1, // We pass the total amount with discounts if any
                realQty: getQuantity(),
                realPrice: getPrice(),
                priceInCents: Number(getPrice().replace('.', '')),
                image: 'https://www.naturallydating.com/wp-content/uploads/2021/01/first-date-ideas-scaled.jpg',
                description: getDescription(),
            })

            if (reserved && reserved._id) history.push(`/successPayment?orderId=${reserved._id}`)
            setIsProcessing(false)
        } catch (err) {
            console.error(err)
            setIsProcessing(false)
        }
    }

    const getBookingSlots = (date: Date) => {
        const { startTime, endTime } = SERVICES[checkout || -1]
        const timeSlots = []
        const start = new Date(date)
        const end = new Date(date)
        start.setHours(startTime || 9, 0, 0, 0)
        end.setHours(endTime || 18, 0, 0, 0)
        const step = 60 * 60 * 1000

        for (let currentTime = start; currentTime <= end; currentTime.setTime(currentTime.getTime() + step)) {
            timeSlots.push(new Date(currentTime))
        }
        return timeSlots
    }

    return (
        <div className="payment__container">
            <h2 className="service-template__title" style={{ margin: 0 }}>Checkout: {SERVICES[checkout || -1].name}</h2>
            <div className="payment__contact-info">
                <h4 className="payment__contact-info-title">Información de contacto</h4>
                <div className="payment__contact-info-row">
                    <InputField
                        name="username"
                        placeholder="Tu nombre completo"
                        updateData={updateInfo}
                        value={data.username}
                    />
                    <InputField
                        name="country"
                        placeholder="País donde resides (opcional)"
                        updateData={updateInfo}
                        value={data.country}
                    />
                </div>
                <div className="payment__contact-info-row">
                    <InputField
                        name="email"
                        placeholder="Tu email"
                        updateData={updateInfo}
                        value={data.email}
                    />
                    <InputField
                        name="phone"
                        placeholder="Número de teléfono (opcional)"
                        updateData={updateInfo}
                        value={data.phone}
                    />
                </div>
            </div>
            <div className="payment__form" >
                <h4 className="payment__contact-info-title">Información del pago</h4>
                <div className="payment__contact-info-row">
                    <Dropdown
                        label="Seleccioná la cantidad"
                        setSelected={setQuantity}
                        selected={quantity}
                        value={quantity}
                        options={getQuantityOptions()}
                        maxHeight='15rem'
                    />
                    <h1 className="payment__total-amount"><span className="payment__total-text">Total</span> ${total}</h1>
                </div>
                <div className="payment__contact-info-row">
                    {openCalendar ?
                        <Calendar
                            locale='es'
                            onChange={setDate}
                            value={date}
                            tileDisabled={tileDisabled}
                            className='react-calendar calendar-fixed'
                        />
                        : getQuantity() === 1 ?
                            <>
                                <Button
                                    label={date ? getDate(date) : 'Seleccionar fecha'}
                                    handleClick={() => setOpenCalendar(true)}
                                    bgColor="#B0BCEB"
                                />
                                {getServiceData('startTime') ?
                                    <Dropdown
                                        label='Seleccionar hora'
                                        options={getBookingSlots(date)}
                                        selected={date}
                                        setSelected={setDate}
                                        value={date}
                                        isTime={true}
                                        maxHeight='10rem'
                                    />
                                    : <h2 className="booking__data-value">{getServiceData('time')}</h2>}
                            </>
                            : ''
                    }
                </div>
                <div className="payment__various-dates">
                    {Number(quantity.split(' ')[0]) > 1 ?
                        Array.from({ length: getQuantity() }).map((_, i) =>
                            <div key={i} className="payment__various-dates-item">
                                <h4 className="payment__various-dates-item-label">{i + 1}</h4>
                                {openCalendars[i] ?
                                    <Calendar
                                        locale='es'
                                        onChange={(date) => handleDateChange(date, i)}
                                        value={selectedDates[i]}
                                        tileDisabled={tileDisabled}
                                        className='react-calendar calendar-fixed'
                                    />
                                    :
                                    <>
                                        <Button
                                            label={selectedDates[i] ? getDate(selectedDates[i]) : 'Seleccionar fecha'}
                                            handleClick={() => setOpenCalendars({ ...openCalendars, [i]: true })}
                                            bgColor="#B0BCEB"
                                            style={{ width: 'fit-content' }}
                                        />
                                        {getServiceData('startTime') ?
                                            <Dropdown
                                                label='Seleccionar hora'
                                                options={getBookingSlots(selectedDates[i])}
                                                selected={selectedDates[i]}
                                                setSelected={(date: any) => handleDateChange(date, i)}
                                                value={selectedDates[i]}
                                                isTime={true}
                                                maxHeight='10rem'
                                            />
                                            : <h2 className="booking__data-value">{getServiceData('time')}</h2>}
                                    </>
                                }
                            </div>)
                        : ''}
                </div>
                {message && <h4 className="payment__message">{message}</h4>}
                {SERVICES[checkout || -1]?.price !== 0 ?
                    <Button
                        label={isProcessing ? 'Redirigiendo...' : 'Pagar ahora'}
                        handleClick={checkoutStripe}
                        disabled={dataOk}
                        style={{ alignSelf: 'center' }}
                        bgColor=""
                    />
                    :
                    <div className="payment__btns">
                        {contribute ?
                            <>
                                <Dropdown
                                    label="Seleccioná un inporte"
                                    setSelected={setContribute}
                                    selected={contribute}
                                    value={contribute}
                                    options={getContributeOptions()}
                                />
                                <Button
                                    label='Cancelar aporte'
                                    handleClick={() => setContribute('')}
                                    bgColor="lightgray"
                                />
                            </>
                            :
                            <Button
                                label='Quiero aportar'
                                handleClick={() => setContribute('US $5')}
                                bgColor="#B0BCEB"
                            />
                        }
                        <Button
                            label={contribute ? 'Anotarme y pagar' : 'Anotarme'}
                            handleClick={contribute ? checkoutStripe : reserveService}
                            disabled={checkData()}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default Payment