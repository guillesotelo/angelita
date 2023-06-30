import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: number) => void
}

export default function PsicoterapiaPrivada2({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Psicoterapia Privada</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image3} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                        <strong>Persona, pareja o familia</strong>
                        <br />
                        Lunes a jueves & sábados.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                        <br />
                        Sesión de 2 horas.
                    </h4>
                    <p className="service-template__body">
                        Encuentro personal, de pareja o familiar, que requiera la intervención psicoterapéutica con la finalidad de corregir la causa y naturalizar los efectos en el cuerpo, en la conducta y en las relaciones, a través de prácticas guiadas.
                    </p>
                    <div className="service-template__prices">
                        <h4 className="service-template__prices-text"><strong>US $70</strong></h4>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout(32)}>Reservar</button>
                </div>
            </div>
        </div>
    )
}