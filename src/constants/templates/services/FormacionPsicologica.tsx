import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
}

export default function FormacionPsicologica({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Formación Psicológica</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image1} alt="Consejería Virtual (sin continuidad)" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                        <br />
                        1er sábado del mes
                        <br />
                        16 hs UTC/GMT+2 (Berlin). Sesión de 4 horas.
                    </h4>
                    <p className="service-template__body">
                        Eventos participativos en línea, con temas propuestos previamente por los participantes.
                        <br />
                        Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                    </p>
                    <div className="service-template__row">
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $50</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64ca5fd4baf72a66cc29c691')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}