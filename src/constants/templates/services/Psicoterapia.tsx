import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
}

export default function Psicoterapia({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Psicoterapia Privada</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image3} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours">
                        <strong>Persona, pareja o familia</strong>
                        <br />
                        Lunes a sábado.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                    </h4>
                    <p className="service-template__body">
                        Asesoría profesional  sistemática para corregir  la causa del malestar psicológico, emocional, conductual y relacional.
                    </p>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__prices-detail">Sesión de 1 hora</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $40</strong></h4>
                        </div>
                    </div>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__prices-detail">Sesión de 2 horas</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $60</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64ca5fd4baf72a66cc29c695')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}