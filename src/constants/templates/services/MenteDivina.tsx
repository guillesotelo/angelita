import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'
type Props = {
    checkout: (value: number) => void
}

export default function MenteDivina({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Mente Divina</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image1} alt="Charla Participativa" loading="lazy" className="service-template__image" />
                    <h4 className="service-template__open-hours">
                        Pareja, relaciones, familia y más
                        <br />
                        Miércoles 18 hs UTC/GMT+2 (Berlin)
                        <br />
                        Sesión de 1 hora
                    </h4>
                </div>
                <div className="service-template__col2">
                    <h2 className="service-template__subtitle">Fortalecimiento Psicológico</h2>
                    <p className="service-template__body">
                        Eventos participativos en línea, con temas propuestos previamente por los participantes.
                        <br />
                        Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                    </p>
                    <div className="service-template__prices">
                        <h4 className="service-template__prices-text"><strong>US $15</strong></h4>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout(11)}>Reservar</button>
                </div>
            </div>
        </div>
    )
}