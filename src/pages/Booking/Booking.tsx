import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'
import { dataObj } from '../../types'
import { bookingHeaders } from '../../constants/tableHeaders'
import { deleteBooking, getAllBookings, updateBooking } from '../../services'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { toast } from 'react-hot-toast'
import Dropdown from '../../components/Dropdown/Dropdown'
import { SERVICES } from '../../constants/services'
import Calendar from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'

type Props = {}

export default function Booking({ }: Props) {
    const [bookings, setBookings] = useState<dataObj[]>([])
    const [selected, setSelected] = useState<number>(-1)
    const [data, setData] = useState<dataObj>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [tryToRemove, setTryToRemove] = useState<boolean>(false)
    const [isNew, setIsNew] = useState<boolean>(false)
    const [isPaid, setIsPaid] = useState<string>('')
    const [serviceSelected, setServiceSelected] = useState<dataObj>({})
    const [discount, setDiscount] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('1 sesión')
    const [totalPrice, setTotalPrice] = useState<string>('')
    const [openCalendar, setOpenCalendar] = useState(false)
    const [openCalendars, setOpenCalendars] = useState<dataObj>({})
    const [selectedTimes, setSelectedTimes] = useState<dataObj>({})
    const [date, setDate] = useState<any>(null)
    const [selectedDates, setSelectedDates] = useState<any>([])
    const [selectedTime, setSelectedTime] = useState<any>(null)
    const history = useHistory()

    // console.log('data', data)
    console.log('date', date)
    // console.log('selectedDates', selectedDates)

    useEffect(() => {
        getBookings()
    }, [])

    useEffect(() => {
        if (selected !== -1) {
            setData(bookings[selected])
            setServiceSelected(bookings[selected])
            setDate(bookings[selected].dateObject ? JSON.parse(bookings[selected].dateObject) : null)
            setSelectedDates(bookings[selected].dateObjects ? JSON.parse(bookings[selected].dateObjects) : [])
            setSelectedTimes(bookings[selected].dateObjects ? JSON.parse(bookings[selected].dateObjects).map((date: Date) => localTime(date)) : [])
            setQuantity(`${bookings[selected].realQty} ${bookings[selected].realQty === 1 ? 'sesión' : 'sesiones'}`)
        }
        modalBehaviour()
    }, [selected])

    useEffect(() => {
        if (isNew) {
            setTotalPrice(getPrice())
            setSelectedDates([])
            setDate(null)
            modalBehaviour()
        }
    }, [serviceSelected, quantity])

    useEffect(() => {
        if (isNew) setData(serviceSelected)
    }, [serviceSelected])

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    useEffect(() => {
        setOpenCalendars({})
    }, [selectedDates])

    useEffect(() => {
        const body = document.querySelector('body')
        const header = document.querySelector('.header__container') as HTMLElement
        if (selected !== -1 || isNew) {
            if (body) body.classList.add('overflow-hidden')
            if (header) header.style.filter = 'blur(10px)'
        } else {
            if (body) body.classList.remove('overflow-hidden')
            if (header) header.style.filter = 'unset'
        }
    }, [selected])

    const modalBehaviour = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setOpenCalendar(false)
                setOpenCalendars({})
            }
        })
    }

    const getBookings = async () => {
        setLoading(true)
        try {
            const _bookings = await getAllBookings()
            if (_bookings && _bookings.length) setBookings(_bookings)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const getAllServices = () => {
        const services: dataObj[] = []
        Object.keys(SERVICES).forEach(index => {
            if (String(index).length > 1) services.push(SERVICES[index])
        })
        return services
    }

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const discardChanges = () => {
        setSelected(-1)
        setData({ ...{} })
        setTryToRemove(false)
        setIsNew(false)
        setQuantity('1 sesión')
        setTotalPrice('')
        setIsPaid('')
        setDiscount('')
        setOpenCalendar(false)
        setOpenCalendars({ ...{} })
        setDate(null)
        setSelectedDates([])
    }

    const saveChanges = async () => {
        setLoading(true)
        try {
            const updated = await updateBooking(data)
            if (updated) {
                toast.success('Cambios guardados')
                discardChanges()
                setLoading(false)
                return getBookings()
            }
            toast.error('Ocurrió un error al guardar')
            setLoading(false)
        } catch (err) {
            toast.error('Ocurrió un error al guardar')
            console.error(err)
            setLoading(false)
        }
    }

    const removeBooking = async () => {
        setLoading(true)
        try {
            const updated = await deleteBooking(data)
            if (updated) {
                toast.success('Reserva eliminada')
                discardChanges()
                setLoading(false)
                return getBookings()
            }
            toast.error('Ocurrió un error al guardar los cambios')
            setLoading(false)
        } catch (err) {
            toast.error('Ocurrió un error al guardar los cambios')
            console.error(err)
            setLoading(false)
        }
    }

    const getQuantityOptions = () => {
        return Array.from({ length: 20 })
            .map((_, i) => i === 0 ?
                `${i + 1} sesión (${getHours(i + 1)})` :
                `${i + 1} sesiones (${getHours(i + 1)}) ${discount}`)
    }

    const getHours = (session: number) => {
        return getServiceData('duration') * session > 1 ?
            `${getServiceData('duration') * session} horas` :
            `${session} hora`
    }

    const getServiceData = (data: string | number) => {
        return serviceSelected[data]
    }

    const getPrice = () => {
        if (serviceSelected.price) {
            const { price, discount } = serviceSelected
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
            return (price * hours).toFixed(2)
        }
        return ''
    }

    const getQuantity = () => {
        return Number(quantity.split(' ')[0]) || 1
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
        return date.getDay() === 6 && date.getDate() <= 7
    }

    const getDate = (date: Date) => {
        return Array.isArray(date) ?
            date.map((d: Date) => new Date(d).toLocaleDateString("es-ES")).join(', ') :
            new Date(date).toLocaleDateString("es-ES")
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

    const getBookinSlots = (date: Date) => {
        const timeSlots = []
        const startTime = new Date(date)
        const endTime = new Date(date)
        startTime.setHours(9, 0, 0, 0)
        endTime.setHours(18, 0, 0, 0)
        const step = 60 * 60 * 1000

        for (let currentTime = startTime; currentTime <= endTime;
            currentTime.setTime(currentTime.getTime() + step)) {
            timeSlots.push(localTime(currentTime))
        }
        return timeSlots
    }

    const localTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="booking__container">
            <h1 className='page__title' style={{ marginTop: 0, filter: selected !== -1 || isNew ? 'blur(10px)' : '' }}>Reservas</h1>
            <Button
                label='Crear'
                handleClick={() => setIsNew(true)}
                bgColor="#87d18d"
                style={{
                    width: 'fit-content',
                    alignSelf: 'flex-end',
                    filter: selected !== -1 || isNew ? 'blur(10px)' : ''
                }}
            />
            {selected !== -1 || isNew ?
                <div className='home__modal-wrapper'>
                    <div className='home__modal-container' style={{ overflow: 'auto ' }}>
                        <h4 className="home__modal-close" onClick={discardChanges}>X</h4>
                        <div className="booking__row">
                            {isNew && !data.name && !data.username ?
                                <h1 className='booking__title'>Nueva reserva</h1>
                                :
                                <h1 className='booking__title'>{data.name} - {data.username}</h1>}
                        </div>
                        {tryToRemove ?
                            <div className="booking__col" style={{ width: '100%' }}>
                                <h3 style={{ textAlign: 'center' }}>¿Estás segura de que quieres eliminar la reserva?</h3>
                                <div className="booking__btns">
                                    <Button
                                        label='Cancelar'
                                        handleClick={discardChanges}
                                        bgColor="lightgray"
                                    />
                                    <Button
                                        label='Eliminar'
                                        handleClick={removeBooking}
                                        bgColor="#ffacac"
                                    />
                                </div>
                            </div>
                            :
                            <div className="booking__row">
                                <div className="booking__col">
                                    {isNew ?
                                        <Dropdown
                                            label='Servicio'
                                            options={getAllServices()}
                                            selected={serviceSelected}
                                            setSelected={setServiceSelected}
                                            value={serviceSelected.name}
                                            objKey='name'
                                        />
                                        :
                                        <div className="booking__data">
                                            <h2 className="booking__data-label">Servicio</h2>
                                            <h2 className="booking__data-value">{data.name}</h2>
                                        </div>}
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Precio</h2>
                                        <h2 className="booking__data-value">{data.currency || 'USD'} ${data.price}</h2>
                                    </div>
                                    <InputField
                                        label='Nombre completo'
                                        name="username"
                                        updateData={updateData}
                                        value={data.username}
                                    />
                                    <InputField
                                        label='País de residencia'
                                        name="country"
                                        updateData={updateData}
                                        value={data.country}
                                    />
                                    <Dropdown
                                        label='Cantidad'
                                        options={getQuantityOptions()}
                                        setSelected={setQuantity}
                                        selected={quantity}
                                        value={quantity}
                                    />
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
                                                <Button
                                                    label={date ? getDate(date) : 'Seleccionar fecha'}
                                                    handleClick={() => setOpenCalendar(true)}
                                                    bgColor="#B0BCEB"
                                                    style={{ marginTop: '1rem' }}
                                                />
                                                : ''
                                        }
                                    </div>
                                    <div className="payment__various-dates">
                                        {Number(quantity.split(' ')[0]) > 1 ?
                                            Array.from({ length: getQuantity() }).map((_, i) =>
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
                                                        <>
                                                            <Button
                                                                label={selectedDates[i] ? getDate(selectedDates[i]) : 'Seleccionar fecha'}
                                                                handleClick={() => setOpenCalendars({ ...openCalendars, [i]: true })}
                                                                bgColor="#B0BCEB"
                                                                style={{ width: 'fit-content' }}
                                                            />
                                                            <Dropdown
                                                                label='Seleccionar hora'
                                                                options={getBookinSlots(selectedDates[i] || new Date())}
                                                                selected={selectedTimes[i]}
                                                                setSelected={(op) => setSelectedTimes({ ...selectedTimes, [i]: op })}
                                                                value={selectedTimes[i]}
                                                            />
                                                        </>
                                                    }
                                                </div>)
                                            : ''}
                                    </div>
                                </div>
                                <div className="booking__col">
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Agenda</h2>
                                        <h2 className="booking__data-value">{data.day} - {data.time}</h2>
                                    </div>
                                    {isNew ?
                                        <Dropdown
                                            label='Pago confirmado'
                                            options={['Si', 'No']}
                                            selected={isPaid}
                                            setSelected={setIsPaid}
                                            value={isPaid}
                                        />
                                        :
                                        <div className="booking__no-edit-data">
                                            <h2 className="booking__data-label">Pago confirmado</h2>
                                            <h2 className="booking__data-value">{data.isPaid ? 'Si' : 'No'}</h2>
                                        </div>}
                                    <InputField
                                        label='Correo electrónico'
                                        name="email"
                                        updateData={updateData}
                                        value={data.email}
                                    />
                                    <InputField
                                        label='Teléfono'
                                        name="phone"
                                        updateData={updateData}
                                        value={data.phone}
                                    />
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Precio total</h2>
                                        <h2 className="booking__data-value">US $ {isNew ? totalPrice : data.realPrice}</h2>
                                    </div>
                                    {!selectedDates.length ?
                                        <Dropdown
                                            label='Hora de reserva'
                                            options={getBookinSlots(data.date || new Date())}
                                            selected={selectedTime}
                                            setSelected={setSelectedTime}
                                            value={selectedTime}
                                        />
                                        : ''}
                                </div>
                            </div>
                        }
                        {!tryToRemove ?
                            <div className="booking__btns">
                                {!isNew ?
                                    <Button
                                        label='Eliminar reserva'
                                        handleClick={() => setTryToRemove(true)}
                                        bgColor="#ffacac"
                                    /> : ''}
                                <Button
                                    label='Descartar cambios'
                                    handleClick={discardChanges}
                                    bgColor="lightgray"
                                />
                                <Button
                                    label={isNew ? 'Crear' : 'Guardar'}
                                    handleClick={saveChanges}
                                />
                            </div>
                            : ''}
                    </div >
                </div >
                : ''}
            <div style={{ width: '100%', filter: selected !== -1 || isNew ? 'blur(10px)' : '' }}>
                <DataTable
                    name='reservas'
                    tableData={bookings}
                    setTableData={setBookings}
                    tableHeaders={bookingHeaders}
                    selected={selected}
                    setSelected={setSelected}
                    loading={loading}
                />
            </div>
        </div>
    )
}