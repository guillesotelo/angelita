import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
    setSubService: (value: number) => void
}

export default function PsicoterapiaPrivada({ checkout, setSubService }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Psicoterapia Privada</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image3} alt="Psicoterapia Grupal Virtual" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <p className="service-template__body">
                        Encuentro personal, de pareja o familiar, que requiera la intervención psicoterapéutica con la finalidad de corregir la causa y naturalizar los efectos en el cuerpo, en la conducta y en las relaciones, a través de prácticas guiadas.
                    </p>
                    <div className="service-template__subservice" onClick={() => setSubService(4)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Psicoterapia</h2>
                            <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                            <h4 className="service-template__subservice-open-hours">Lunes a sábado - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $40</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(5)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Consejería</h2>
                            <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                            <h4 className="service-template__subservice-open-hours">Lunes a sábado - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $50</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(6)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Hipnoterapia</h2>
                            <h3 className="service-template__subservice-pacients">90 minutos</h3>
                            <h4 className="service-template__subservice-open-hours">Lunes a sábado - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $60</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(7)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Entrenamiento Diario Personal</h2>
                            <h3 className="service-template__subservice-pacients">20 Horas / 5 horas semanales</h3>
                            <h4 className="service-template__subservice-open-hours">Martes a jueves - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $500</h4>
                        </div>
                    </div>
                    {/* <div className="service-template__subservice" onClick={() => setSubService(6)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Coaching</h2>
                            <h3 className="service-template__subservice-pacients">Personal</h3>
                            <h4 className="service-template__subservice-open-hours">20 dás / 20 horas en 4 semanas. Fechas a coordinar.</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $800</h4>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}