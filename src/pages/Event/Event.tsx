import React, { useContext, useEffect, useState } from 'react'
import { getEventById } from '../../services/event'
import { dataObj } from '../../types'
import { AppContext } from '../../AppContext'
import { getServiceById } from '../../services'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function Event({ }: Props) {
    const [event, setEvent] = useState<dataObj>({})
    const [service, setService] = useState<dataObj>({})
    const { lang, isMobile, setRenderAll, setCheckout } = useContext(AppContext)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const history = useHistory()

    // console.log('event', event)
    // console.log('service', service)

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id) getEvent(id)
    }, [])

    const getEvent = async (id: string) => {
        try {
            const _event = await getEventById(id)
            if (_event && _event.name) {
                setEvent(_event)
                const _service = await getServiceById(_event.serviceId)
                if (_service && _service.name) setService(_service)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const scrollToSection = (section: string, id?: string) => {
        if (setRenderAll) setRenderAll(true)
        setTimeout(() => {
            const element = document.getElementById(section)
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
            else window.location.href = `/?sectionId=${section}${id ? '&checkout=' + id : ''}&eventId=${event._id}`
        }, 50)
    }

    return (
        <div className="page__container" style={{ width: !isMobile ? '50%' : '' }}>
            <h1 className="page__title">{event.name || 'Evento'}</h1>
            <div className="event__container">
                <img src={event.imageUrl} alt={event.name} className="event__image" />
                <div className="event__row">
                    <div className="booking__data">
                        <h4 className="booking__data-label">Fecha</h4>
                        <h4 className="booking__data-value">{event.date}</h4>
                    </div>
                    <div className="booking__data">
                        <h4 className="booking__data-label">Participantes</h4>
                        <h4 className="booking__data-value">{event.participants}</h4>
                    </div>
                    <div className="booking__data">
                        <h4 className="booking__data-label">Tipo de encuentro</h4>
                        <h4 className="booking__data-value">{event.isVirtual ? 'Virtual' : 'Presencial'}</h4>
                    </div>
                </div>
                <div className="event__row">
                    {service.name ?
                        <div className="booking__data">
                            <h4 className="booking__data-label">Grupo</h4>
                            <h4 className="booking__data-value">{service.name}</h4>
                        </div>
                        : ''}
                    <div className="booking__data">
                        <h4 className="booking__data-label">Precio</h4>
                        <h4 className="booking__data-value">US ${event.price}</h4>
                    </div>
                </div>
                <div className="event__row">
                    <div className="booking__data">
                        <h4 className="booking__data-label">Sobre el evento</h4>
                        <h4 className="booking__data-value">{event.description}</h4>
                    </div>
                </div>
                <div className="event__row" style={{ marginTop: '1rem' }}>
                    <Button
                        label={'Volver'}
                        handleClick={() => scrollToSection('eventos')}
                        bgColor='lightgray'
                    />
                    <Button
                        label={'Reservar'}
                        handleClick={() => {
                            if (event.serviceId) setCheckout(event.serviceId)
                            setTimeout(() => scrollToSection('servicios', event.serviceId || ''), 50)
                        }}
                        bgColor='#87d18d'
                    />
                </div>
            </div>
        </div>
    )
}