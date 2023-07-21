import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'
import { dataObj } from '../../types'
import { bookingHeaders } from '../../constants/tableHeaders'
import { deleteBooking, getAllBookings, updateBooking } from '../../services'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { toast } from 'react-hot-toast'

type Props = {}

export default function Booking({ }: Props) {
    const [bookings, setBookings] = useState<dataObj[]>([])
    const [selected, setSelected] = useState<number>(-1)
    const [data, setData] = useState<dataObj>({})
    const [tryToRemove, setTryToRemove] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {
        getBookings()
    }, [])

    useEffect(() => {
        if (selected !== -1) setData(bookings[selected])
    }, [selected])


    const getBookings = async () => {
        const _bookings = await getAllBookings()
        if (_bookings && _bookings.length) setBookings(_bookings)
    }

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const discardChanges = () => {
        setSelected(-1)
        setData({})
        setTryToRemove(false)
    }

    const saveChanges = async () => {
        try {
            const updated = await updateBooking(data)
            if (updated) {
                toast.success('Cambios guardados')
                discardChanges()
                return getBookings()
            }
            toast.error('Ocurrió un error al guardar')
        } catch (err) {
            toast.error('Ocurrió un error al guardar')
            console.error(err)
        }
    }

    const removeBooking = async () => {
        try {
            const updated = await deleteBooking(data)
            if (updated) {
                toast.success('Reserva eliminada')
                discardChanges()
                return getBookings()
            }
            toast.error('Ocurrió un error al guardar los cambios')
        } catch (err) {
            toast.error('Ocurrió un error al guardar los cambios')
            console.error(err)
        }
    }
    const onTryToRemove = () => setTryToRemove(true)

    return (
        <div className="booking__container">
            <h1 className='page__title' style={{ marginTop: 0, filter: selected !== -1 ? 'blur(10px)' : '' }}>Reservas</h1>
            {selected !== -1 ?
                <div className='home__modal-wrapper'>
                    <div className='home__modal-container'>
                        <h4 className="home__modal-close" onClick={() => setSelected(-1)}>X</h4>
                        <div className="booking__row">
                            <h1 className='booking__title'>{data.name} - {data.username}</h1>
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
                                    <div className="booking__data">
                                        <h2 className="booking__data-label">Servicio</h2>
                                        <h2 className="booking__data-value">{data.name}</h2>
                                    </div>
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Precio</h2>
                                        <h2 className="booking__data-value">{data.price}</h2>
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
                                    <InputField
                                        label='Cantidad'
                                        name="realQty"
                                        updateData={updateData}
                                        value={data.realQty}
                                    />
                                    <InputField
                                        label='Día de reserva'
                                        name="date"
                                        updateData={updateData}
                                        value={data.date}
                                    />
                                </div>
                                <div className="booking__col">
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Agenda</h2>
                                        <h2 className="booking__data-value">{data.day} - {data.time}</h2>
                                    </div>
                                    <div className="booking__no-edit-data">
                                        <h2 className="booking__data-label">Pago confirmado</h2>
                                        <h2 className="booking__data-value">{data.isPaid ? 'Si' : 'No'}</h2>
                                    </div>
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
                                    <InputField
                                        label='Precio total'
                                        name="realPrice"
                                        updateData={updateData}
                                        value={data.realPrice}
                                    />
                                    <InputField
                                        label='Hora de reserva'
                                        name="selectedTime"
                                        updateData={updateData}
                                        value={data.selectedTime}
                                    />
                                </div>
                            </div>
                        }
                        {!tryToRemove ?
                            <div className="booking__btns">
                                <Button
                                    label='Eliminar reserva'
                                    handleClick={onTryToRemove}
                                    bgColor="#ffacac"
                                />
                                <Button
                                    label='Descartar cambios'
                                    handleClick={discardChanges}
                                    bgColor="lightgray"
                                />
                                <Button
                                    label='Guardar'
                                    handleClick={saveChanges}
                                    disabled={data === bookings[selected]}
                                />
                            </div>
                            : ''}
                    </div >
                </div >
                : ''}
            <div style={{ width: '100%', filter: selected !== -1 ? 'blur(10px)' : '' }}>
                <DataTable
                    name='reservas'
                    tableData={bookings}
                    setTableData={setBookings}
                    tableHeaders={bookingHeaders}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    )
}