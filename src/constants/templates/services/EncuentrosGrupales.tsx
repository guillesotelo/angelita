import React from 'react'
import Image1 from '../../../assets/images/coffee/image14.png'
import Image2 from '../../../assets/images/coffee/image42.png'
import Image3 from '../../../assets/images/coffee/image9.png'

type Props = {
    checkout: (value: string) => void
    setSubService: (value: number) => void
}

export default function EncuentrosGrupales({ checkout, setSubService }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Encuentros Grupales</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image1} alt="Psicologia Virtual (con continuidad)" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <div className="service-template__subservice" onClick={() => setSubService(1)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Mente Divina</h2>
                            <h3 className="service-template__subservice-subtitle">Fortalecimiento Psicológico</h3>
                            <h3 className="service-template__subservice-pacients">Pareja, relaciones, familia y más.</h3>
                            <h4 className="service-template__subservice-open-hours">1 hora, martes - 16 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $15</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(2)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Pedacito de Cielo</h2>
                            {/* <h3 className="service-template__subservice-subtitle"></h3> */}
                            <h3 className="service-template__subservice-pacients">Entendemos la psicología desde el discernimiento espiritual</h3>
                            <h4 className="service-template__subservice-open-hours">1 hora, miércoles - 16 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text-voluntary">$<br />Aporte<br />voluntario</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(3)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Formación Psicológica</h2>
                            <h3 className="service-template__subservice-subtitle">Taller mensual. Fundamentos prácticos de la psicología.</h3>
                            {/* <h3 className="service-template__subservice-pacients"></h3> */}
                            <h4 className="service-template__subservice-open-hours">4 horas, 1er sábado del mes - 16 a 20 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $50</h4>
                        </div>
                    </div>
                    {/* <p className="service-template__body">
                    Eventos participativos en línea, con temas propuestos previamente por los participantes.
                    <br />
                    Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                </p>
                <h4 className="service-template__prices">
                    <strong>US $15</strong> Sesión de 1 hora.
                </h4> */}
                </div>
            </div>
        </div >
    )
}