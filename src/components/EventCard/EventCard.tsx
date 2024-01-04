import { useEffect, useState } from 'react'
import { eventType } from '../../types'
import { useHistory } from 'react-router-dom'

type Props = {
    event?: eventType
}

export default function EventCard({ event }: Props) {
    const [eventDate, setEventDate] = useState('')
    const history = useHistory()

    useEffect(() => {
        if (event && event.dateObject) {
            const date = JSON.parse(event.dateObject)
            const parsedDate = new Date(date).toLocaleDateString("es-ES", dateOptions)
            setEventDate(parsedDate.split(' ')
                .map(word => word.split('')
                    .map((letter, i) => i === 0 && word !== 'de' ? letter.toUpperCase() : letter)
                    .join(''))
                .join(' '))
        }
    }, [])

    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    } as Intl.DateTimeFormatOptions

    return (
        <div className="home__event-row" onClick={() => history.push(`/event?id=${event?._id || ''}`)}>
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