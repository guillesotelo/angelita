import { useEffect, useState } from "react"
import PaymentForm from "./PaymentForm"
import { SERVICES } from "../../constants/services"
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import Calendar from 'react-calendar'
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"

type Props = {
    checkout?: number
}

function Payment({ checkout }: Props) {
    const [openCalendar, setOpenCalendar] = useState(false)
    const [data, setData] = useState({ name: '', email: '', country: '', phone: '' })
    const [date, setDate] = useState<any>(null)

    useEffect(() => {
        setOpenCalendar(false)
    }, [date])

    const updateInfo = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const checkData = () => {
        if (!data.name || !data.email) return true
        if (data.name.split(' ').length < 2 || !data.email.includes('@') || !data.email.includes('.')) return true
        return false
    }

    const reserveService = async () => {
        try {
            const reserved = {}
        } catch (err) {
            console.error(err)
        }
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
        <div className="payment__container">
            <h2 className="service-template__title" style={{ margin: 0 }}>Checkout: {SERVICES[checkout || -1].name}</h2>
            <div className="payment__contact-info">
                <h4 className="payment__contact-info-title">Información de contacto</h4>
                <div className="payment__contact-info-row">
                    <InputField
                        name="name"
                        placeholder="Tu nombre completo"
                        updateData={updateInfo}
                        value={data.name}
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
            {SERVICES[checkout || -1]?.price !== 0 ?
                <PaymentForm checkout={checkout} data={data} updateInfo={updateInfo} />
                :
                <div className="payment__contact-info-row">
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
                            style={{ alignSelf: 'center' }}
                            bgColor="#B0BCEB"
                        />
                    }
                    {SERVICES[checkout || -1]?.price !== 0 ? '' :
                        <Button
                            label='Anotarme'
                            handleClick={reserveService}
                            disabled={checkData()}
                            style={{ alignSelf: 'center' }}
                        />
                    }
                </div>
            }
        </div>
    )
}

export default Payment
