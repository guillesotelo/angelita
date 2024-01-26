import PedacitoDeCielo from './services/PedacitoDeCielo'
import EncuentrosGrupales from './services/EncuentrosGrupales'
import PsicoterapiaEnGrupo from './services/PsicoterapiaEnGrupo'
import Consejeria from './services/Consejeria'
import Psicoterapia from './services/Psicoterapia'
import Coaching from './services/Coaching'
import PsicoterapiaPrivada from './services/PsicoterapiaPrivada'
import FormacionPsicologica from './services/FormacionPsicologica'
import MenteDivina from './services/MenteDivina'
import Hipnoterapia from './services/Hipnoterapia'
import EntrenamientoDiario from './services/EntrenamientoDiario'
import { serviceType } from '../../types'

type Props = {
    serviceData: serviceType
    setCheckout: (value: string) => void
}
export default function ServiceTemplates({ serviceData, setCheckout }: Props) {

    const {
        _id,
        name,
        price,
        currency,
        discount,
        type,
        duration,
        mark,
        day,
        time,
        image,
        imageUrl,
        description,
        serviceId,
        date,
        dateObject,
        dateObjects,
        fixedTime,
        startTime,
        endTime,
        isEvent,
        link,
        linkPassword,
        otherData,
    } = serviceData

    const getAmount = () => {
        if (currency && price) {
            const sign = currency.includes('usd') ? 'USD $'
                : currency.includes('eur') ? '€' : '$'
            return `${sign}${price}`
        }
        return '$'
    }

    return <div className="service-template__container">
        <h2 className="service-template__title">{name}</h2>
        <div className="service-template__section">
            <div className="service-template__col1">
                <img src={image || imageUrl} alt={name} loading="lazy" className="service-template__image" />
            </div>
            <div className="service-template__col2">
                <h4 className="service-template__open-hours">{day}<br/>{time}</h4>
                <p className="service-template__body">{description} </p>
                <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                    <div className="service-template__prices">
                        <h4 className="service-template__prices-text"><strong>{getAmount()}</strong></h4>
                    </div>
                </div>
                <button className="service-template__btn" onClick={() => setCheckout(_id || '')}>Reservar</button>
            </div>
        </div>
    </div>
}