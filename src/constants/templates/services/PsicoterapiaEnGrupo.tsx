import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: number) => void
    setSubService: (value: number) => void
}

export default function PsicoterapiaEnGrupo({ checkout, setSubService }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Psicoterapia en Grupo</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image2} alt="Consejería Virtual (sin continuidad)" loading="lazy" className="service-template__image" />
                    <h4 className="service-template__open-hours">
                        Miércoles Y Sábado.
                        <br />
                        21 hs UTC/GMT+2 (Berlin). Sesión de 1 hora.
                    </h4>
                </div>
                <div className="service-template__col2">
                    <p className="service-template__body">
                        Encuentro grupal en línea, para atender el caso conflictivo  particular que algún asistente quiera exponer para reconocer la causa del problema, los efectos, la corrección  o solución psicológica y las herramientas de aplicación y gestión más adecuadas.
                    </p>
                    <div className="service-template__prices">
                        <h4 className="service-template__prices-text"><strong>US $25</strong></h4>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout(11)}>Reservar</button>
                </div>
            </div>
        </div>
    )
}