import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: number) => void
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
                            <h2 className="service-template__subservice-title">Consejería</h2>
                            <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                            <h4 className="service-template__subservice-open-hours">Lunes a jueves & sábados - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $50</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(5)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Psicoterapia</h2>
                            <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                            <h4 className="service-template__subservice-open-hours">Lunes a jueves & sábados - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $50</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}