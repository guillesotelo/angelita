import React, { useEffect, useState } from 'react'
import { dataObj } from '../../types'

type Props = {
    event?: dataObj
}

export default function EventCard({ event }: Props) {
    const [eventDate, setEventDate] = useState('')

    useEffect(() => {
        if (event && event.dateObject) {
            const date = JSON.parse(event.dateObject) 
            setEventDate(new Date(date).toLocaleDateString('es-AR', dateOptions))
        }
    }, [])
    console.log(event)

    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }as Intl.DateTimeFormatOptions

    return (
        <div className="home__event-row">
            <div className="home__event-schedule">
                {eventDate}
            </div>
            <div className="home__event-image-wrapper">
                <img src={event?.imageUrl} alt="Evento" className="home__event-image" />
            </div>
            <div className="home__event-details">
                <h1 className="home__event-title">{event?.name}</h1>
                <h2 className="home__event-subtitle">{event?.participants} Participantes</h2>
                <h3 className="home__event-venue">{event?.isVirtual ? '🖥 Evento Virtual' : '👥 Evento Presencial'}</h3>
            </div>
        </div>
    )
}