import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
}

export default function EntrenamientoDiario({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Entrenamiento Diario Personal</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image3} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours">
                        <strong></strong>
                        <br />
                        Lunes a sábado.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                    </h4>
                    <p className="service-template__body">
                        Entrenamiento Diario
                    </p>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__prices-detail">20 horas - 5 horas por semana</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $500</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('654501e8dbbd5e4ec11966b0')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}