import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
}

export default function Consejeria({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Consejería</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image3} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                        <br />
                        Lunes a sábado.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                    </h4>
                    <p className="service-template__body">
                        Asesoría profesional para aclarar y direccionar de la mejor manera una situación problemática.
                    </p>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__open-hours" style={{ margin: 0 }}>Sesión de 1 hora</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $50</strong></h4>
                        </div>
                    </div>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__open-hours" style={{ margin: 0 }}>Sesión de 2 horas</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $70</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64ca5fd4baf72a66cc29c693')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}