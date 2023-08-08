import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
}

export default function PedacitoDeCielo({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Pedacito de Cielo</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image1} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                        Miércoles 16 hs UTC/GMT+2 (Berlin)
                        <br />
                        Sesión de 1 hora
                    </h4>
                    <p className="service-template__body">
                        Entendemos la psicología desde el discernimiento espiritual.
                        <br />
                        Eventos participativos en línea, con temas propuestos previamente por los participantes.
                        <br />
                        Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                    </p>
                    <div className="service-template__row">
                        <div className="service-template__prices" style={{ width: '6rem', height: '6rem' }}>
                            <h4 className="service-template__prices-text" style={{ fontSize: '.9rem' }}><strong>Aporte<br />voluntario</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64ca5fd4baf72a66cc29c68f')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}