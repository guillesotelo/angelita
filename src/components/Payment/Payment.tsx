import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { bookingType, calendarType, dataObj, eventType, orderType, serviceType } from "../../types"
import Dropdown from "../Dropdown/Dropdown"
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"
import Calendar from "react-calendar"
import { createBooking, createCheckoutSession, getAllBookings, getAllServices } from "../../services/"
import InputField from "../InputField/InputField"
import { useHistory } from "react-router-dom"
import { getEventById } from "../../services/event"
import MoonLoader from "react-spinners/MoonLoader"
import { checkLatamAccess } from "../../helpers/discounts"

type Props = {
    checkout?: string
    eventId?: string
}

function Payment({ checkout, eventId }: Props) {
    const [data, setData] = useState({ username: '', email: '', country: '', phone: '' })
    const [bookings, setBookings] = useState<bookingType[]>([])
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
    const [openCalendars, setOpenCalendars] = useState<calendarType>({})
    const [currentService, setCurrentService] = useState<serviceType>({})
    const [event, setEvent] = useState<eventType>({})
    const [loading, setLoading] = useState(false)
    const [isFromLatam, setIsFromLatam] = useState(false)
    const [dbServices, setDbServices] = useState<serviceType[]>([])
    const [discounts, setDiscounts] = useState<string[]>([''])
    const history = useHistory()

    useEffect(() => {
        setQuantity(`1 sesión (${getHours(1)})`)
        getServices()
        setCurrentService(getService())
        getBookings()
        checkIfFromLatam()

        const eventId = new URLSearchParams(document.location.search).get('eventId')
        if (eventId) getEvent(eventId)
    }, [])

    useEffect(() => {
        setDataOk(checkData())
    }, [checkout, data, date, selectedDates, quantity, isProcessing])

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    useEffect(() => {
        setCurrentService(getService())
    }, [dbServices, checkout])

    useEffect(() => {
        setOpenCalendars({})
    }, [selectedDates])

    useEffect(() => {
        setTotal(getPrice())
    }, [currentService, quantity, contribute, checkout])

    const checkIfFromLatam = async () => {
        const latam = await checkLatamAccess()
        if (latam) setIsFromLatam(latam)
    }

    const updateInfo = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const getService = () => {
        return dbServices.find(s => s._id === checkout) || {}
    }

    const getServices = async () => {
        try {
            setLoading(true)
            const allServices = await getAllServices()
            if (allServices && allServices.length) setDbServices(allServices)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const getEvent = async (id: string) => {
        try {
            setLoading(true)
            const _event = await getEventById(id)
            if (_event && _event.name) setEvent(_event)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const getBookings = async () => {
        try {
            setLoading(true)
            const _bookings = await getAllBookings()
            if (_bookings && _bookings.length) setBookings(_bookings)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const checkoutStripe = async () => {
        setIsProcessing(true)
        localStorage.setItem('checkout', String(checkout))
        const dates = selectedDates.length ? selectedDates : date ? date : new Date()

        const paymentData: orderType = {
            ...data,
            date: getDateAndTime(dates),
            dateObject: JSON.stringify(date),
            dateObjects: JSON.stringify(selectedDates),
            rawData: currentService,
            selectedDates,
            checkout,
            name: currentService.name,
            serviceId: currentService._id,
            eventId: event._id || '',
            quantity: 1, // We pass the total amount with discounts if any
            realQty: getQuantity(),
            realPrice: getPrice(),
            priceInCents: Number(getPrice().replace('.', '')),
            image: 'https://www.naturallydating.com/wp-content/uploads/2021/01/first-date-ideas-scaled.jpg',
            description: getDescription(),
        }
        delete paymentData._id // Delete id from service
        delete paymentData.rawData?._id // Delete id from service

        try {
            await createCheckoutSession({ items: [paymentData], locale: 'es' })
        } catch (err) {
            console.error(err)
            setMessage('Ha ocurrido un error. Inténtalo nuevamente.')
            setIsProcessing(false)
        }
    }

    const getDescription = () => {
        return currentService.description || discountText()
    }

    const discountText = () => {
        const { discount, price } = currentService
        if (discount && discount.includes('=')) {
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
        if (!event.name && currentService.name !== 'Coaching' && currentService.name !== 'Entrenamiento Diario Personal') {
            if (Number(getPrice()) > 0 && !date && !selectedDates.length) return true
            if (qty > 1 && (!selectedDates.length || selectedDates.length !== qty)) return true
        }
        return false
    }

    const getPrice = () => {
        const { price, discount } = currentService
        console.log(currentService)
        const hours = getQuantity()
        const latamDiscount = isFromLatam ? 0.8 : 1
        const offDiscount = hours > 1 ? 0.7 : 1
        const bulkDiscount = hours > 3 ? 0.9 : 1

        const latamMessage = '20% Off para residentes en Sudamérica'
        const offMessage = '30% Off en 2 o más sesiones'
        const bulkMessage = '10% Off en sesiones consecutivass'

        if (discount) {
            if (latamDiscount !== 1) setDiscounts(discounts.concat(!discounts.includes(latamMessage) ? latamMessage : ''))
            if (offDiscount !== 1) setDiscounts(discounts.concat(!discounts.includes(offMessage) ? offMessage : ''))

            if (hours == 1) setDiscounts([latamDiscount !== 1 ? latamMessage : ''])
        }

        if (discount && price) {
            if (discount.includes('30%')) {
                setDiscount('30% OFF')
                return (price * hours * offDiscount * latamDiscount).toFixed(2)
            }
        } else if (hours > 1 && price) {
            if (bulkDiscount !== 1) setDiscounts(discounts.concat(!discounts.includes(bulkMessage) ? bulkMessage : ''))
            return (price * hours * bulkDiscount * latamDiscount).toFixed(2)
        }

        return contribute ?
            Number(contribute.split('US $')[1]).toFixed(2) :
            ((price || 0) * hours * latamDiscount).toFixed(2)
    }

    const getHours = (session: number) => {
        if (currentService && currentService.duration) {
            return currentService.duration * session > 1 ?
                `${currentService.duration * session} horas` :
                `${session} hora`
        }
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
            date.map((d: Date) => new Date(d).toLocaleString("es-ES", { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })).join(' - ') :
            new Date(date).toLocaleString("es-ES", { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
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
        const serviceDay = currentService.day || ''
        const allSlots = getBookedSlots(bookings, false)
        let count = 0
        let processedDates: any[] = []

        if (currentService._id === '64ca5fd4baf72a66cc29c695' // Psicologia
            || currentService.serviceId === '64ca5fd4baf72a66cc29c693' // Consejeria
            || currentService.serviceId === '6544fef7dbbd5e4ec1196698' // Hipnoterapia
            || currentService.serviceId === '654501e8dbbd5e4ec11966b0') { // Entrenamiento Diario
            allSlots.forEach(d => {
                if (!processedDates.includes(d) && d.toLocaleDateString() === date.toLocaleDateString()) {
                    processedDates.push(d)
                    count++
                }
            })
        }

        if (serviceDay) {
            if (serviceDay.toLowerCase().includes('1er sábado del mes')) return !isFirstSaturdayOfMonth(date) || isTodayOrBefore || count > 1
            if (serviceDay.toLowerCase().includes('lunes a sábado')) return day === 0 || isTodayOrBefore || count > 1
            if (serviceDay.toLowerCase().includes('jueves y sábado')) return day !== 4 && day !== 6 || isTodayOrBefore || count > 1
            else {
                if (serviceDay.toLowerCase().includes('lunes')) return day !== 1 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('martes')) return day !== 2 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('miércoles')) return day !== 3 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('jueves')) return day !== 4 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('viernes')) return day !== 5 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('sábado')) return day !== 6 || isTodayOrBefore || count > 1
                if (serviceDay.toLowerCase().includes('domingo')) return day !== 7 || isTodayOrBefore || count > 1
            }
        }
        return false
    }

    const isFirstSaturdayOfMonth = (date: Date) => {
        return date.getDay() === 6 && date.getDate() <= 7
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
            const dates = selectedDates.length ? selectedDates : date ? date : new Date()
            const reserved = await createBooking({
                ...data,
                date: getDateAndTime(dates),
                dateObject: JSON.stringify(date),
                dateObjects: JSON.stringify(selectedDates),
                rawData: currentService,
                selectedDates,
                checkout,
                name: currentService.name,
                serviceId: currentService._id,
                quantity: 1, // We pass the total amount with discounts if any
                realQty: getQuantity(),
                realPrice: getPrice(),
                priceInCents: Number(getPrice().replace('.', '')),
                image: getImage(),
                description: getDescription(),
            })

            if (reserved && reserved._id) history.push(`/successPayment?orderId=${reserved._id}`)
            setIsProcessing(false)
        } catch (err) {
            console.error(err)
            setIsProcessing(false)
        }
    }

    const getImage = () => {
        return currentService.imageUrl || 'https://i.postimg.cc/rwHVQg5k/angelita-logo.png'
    }

    const getBookingSlots = (date: Date, start: number | null = null, end: number | null = null) => {
        const timeSlots = []
        const unavailableTime = getBookedSlots(bookings, true)
        const startTime = new Date(date)
        const endTime = new Date(date)
        startTime.setHours(start || currentService.startTime || 9, 0, 0, 0)
        endTime.setHours(end || currentService.endTime || 18, 0, 0, 0)
        const step = 60 * 60 * 1000

        for (let currentTime = startTime; currentTime <= endTime; currentTime.setTime(currentTime.getTime() + step)) {
            const freeSlot = new Date(currentTime)
            if (!unavailableTime.includes(freeSlot.getTime())) timeSlots.push(freeSlot)
        }
        return timeSlots
    }

    const getBookedSlots = (bookingArray: bookingType[], miliseconds = false) => {
        let slots: any[] = []
        bookingArray.forEach((booking: bookingType) => {
            const dateObj = JSON.parse(booking.dateObject || '') || new Date()
            const dateObjs = JSON.parse(booking.dateObjects || '')
            if (dateObjs.length) {
                dateObjs.forEach((date: any) => {
                    slots.push(miliseconds ? new Date(date).getTime() : new Date(date))
                })
            }
            else slots.push(miliseconds ? new Date(dateObj).getTime() : new Date(dateObj))
        })
        return slots
    }

    return (
        <div className="payment__container">
            <h2 className="service-template__title" style={{ margin: 0 }}>Checkout: {event.name ? event.name : currentService.name}</h2>
            <div className="payment__contact-info">
                <h4 className="payment__contact-info-title">Información de contacto</h4>
                <div className="payment__contact-info-row">
                    <InputField
                        label="Nombre completo"
                        name="username"
                        updateData={updateInfo}
                        value={data.username}
                    />
                    <InputField
                        label="País donde resides (opcional)"
                        name="country"
                        updateData={updateInfo}
                        value={data.country}
                    />
                </div>
                <div className="payment__contact-info-row">
                    <InputField
                        label="Email"
                        name="email"
                        updateData={updateInfo}
                        value={data.email}
                    />
                    <InputField
                        label="Número de teléfono (opcional)"
                        name="phone"
                        updateData={updateInfo}
                        value={data.phone}
                    />
                </div>
            </div>
            <div className="payment__form" >
                {!event.name ? <h4 className="payment__contact-info-title">Información del pago</h4> : ''}
                <div className="payment__contact-info-row">
                    {!event.name && currentService.name !== 'Coaching' && currentService.name !== 'Entrenamiento Diario Personal' ?
                        <Dropdown
                            label="Seleccioná la cantidad"
                            setSelected={setQuantity}
                            selected={quantity}
                            value={quantity}
                            options={getQuantityOptions()}
                            maxHeight='15rem'
                        /> :
                        currentService.name === 'Coaching' || currentService.name === 'Entrenamiento Diario Personal' ?
                            <p>Luego de pagar la reserva, puedes contactarte conmigo para coordinar las fechas de los encuentros.
                                <br />Recibirás toda la información en el correo que has proporcionado.
                            </p>
                            : ''
                    }
                    {event.name ?
                        <div className="booking__data">
                            <h4 className="booking__data-label">Fecha y hora</h4>
                            <h4 className="booking__data-value">{event.date}</h4>
                        </div>
                        : ''}

                    {loading ? <MoonLoader color='#0057ad' size={30} />
                        : <h1 className="payment__total-amount"><span className="payment__total-text">Total</span> ${total}</h1>
                    }
                </div>
                {discounts.length ?
                    <div className="payment__contact-info-row">
                        {discounts.map(disc => disc ? <h4 className="payment__discount-message">{disc}</h4> : '')}
                    </div>
                    : ''
                }
                {!event.name && currentService.name !== 'Coaching' && currentService.name !== 'Entrenamiento Diario Personal' ?
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
                                    {currentService.startTime ?
                                        <Dropdown
                                            label='Seleccionar hora'
                                            options={getBookingSlots(date)}
                                            selected={date}
                                            setSelected={setDate}
                                            value={date}
                                            isTime={true}
                                            maxHeight='10rem'
                                        />
                                        : <h2 className="booking__data-value">{currentService.time}</h2>}
                                </> : ''}
                    </div> : ''}
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
                                        {currentService.startTime ?
                                            <Dropdown
                                                label='Seleccionar hora'
                                                options={getBookingSlots(selectedDates[i])}
                                                selected={selectedDates[i]}
                                                setSelected={(date: any) => handleDateChange(date, i)}
                                                value={selectedDates[i]}
                                                isTime={true}
                                                maxHeight='10rem'
                                            />
                                            : <h2 className="booking__data-value">{currentService.time}</h2>}
                                    </>
                                }
                            </div>)
                        : ''}
                </div>
                {message && <h4 className="payment__message">{message}</h4>}
                {currentService?.price !== 0 ?
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
