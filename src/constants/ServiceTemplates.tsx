import Image1 from '../assets/images/coffee/image14.png'
import Image2 from '../assets/images/coffee/image42.png'
import Image3 from '../assets/images/coffee/image9.png'

type Props = {
    service: number
    subService: number
    setSubService: (value: number) => void
    checkout: (value: number) => void
}
export default function ServiceTemplates({ service, subService, setSubService, checkout }: Props) {

    return subService ?
        subService === 1 ?
            <div className="service-template__container">
                <h2 className="service-template__title">Charla Participativa</h2>
                <div className="service-template__section">
                    <div className="service-template__col1">
                        <img src={Image1} alt="Charla Participativa" loading="lazy" className="service-template__image" />
                    </div>
                    <div className="service-template__col2">
                        <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                            <strong>Fortalecimiento Psicológico</strong>
                            <br />
                            Pareja, relaciones, familia y más
                            <br />
                            Miércoles 18 hs UTC/GMT+2 (Berlin). Sesión de 1 hora.
                        </h4>
                        <p className="service-template__body">
                            Eventos participativos en línea, con temas propuestos previamente por los participantes.
                            <br />
                            Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                        </p>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $15</strong></h4>
                        </div>
                        <button className="service-template__btn" onClick={() => checkout(11)}>Reservar</button>
                    </div>
                </div>
            </div>
            : subService === 2 ?
                <div className="service-template__container">
                    <h2 className="service-template__title">Charla Participativa</h2>
                    <div className="service-template__section">
                        <div className="service-template__col1">
                            <img src={Image1} alt="Charla Participativa" loading="lazy" className="service-template__image" />
                        </div>
                        <div className="service-template__col2">
                            <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                                <strong>Mente Divina</strong>                                <br />
                                Entendemos la psicología desde el discernimiento espiritual.
                                <br />
                                Domingo 16 hs UTC/GMT+2 (Berlin). Sesión de 2 horas.
                            </h4>
                            <p className="service-template__body">
                                Eventos participativos en línea, con temas propuestos previamente por los participantes.
                                <br />
                                Causas y efectos de las alteraciones psicológicas, Identidad, propósito, valores, regulación emocional, sentimientos y afectos, relacionamiento,  pareja, traumas, herramientas terapéuticas.
                            </p>
                            <div className="service-template__prices">
                                <h4 className="service-template__prices-text-voluntary"><strong>$<br />Aporte<br />voluntario</strong></h4>
                            </div>
                            <button className="service-template__btn" onClick={() => checkout(11)}>Reservar</button>
                        </div>
                    </div>
                </div>
                : subService === 3 ?
                    <div className="service-template__container">
                        <h2 className="service-template__title">Taller Mensual</h2>
                        <div className="service-template__section">
                            <div className="service-template__col1">
                                <img src={Image1} alt="Consejería Virtual (sin continuidad)" loading="lazy" className="service-template__image" />
                            </div>
                            <div className="service-template__col2">
                                <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                                    <strong>Formación Psicológica</strong>
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
                                <div className="service-template__prices">
                                    <h4 className="service-template__prices-text"><strong>US $60</strong></h4>
                                </div>
                                <button className="service-template__btn" onClick={() => checkout(11)}>Reservar</button>
                            </div>
                        </div>
                    </div>
                    : subService === 4 ?
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
                                        Entre 11 - 19 hs UTC/GMT+2 (Berlin). Sesión de 1 hora.
                                    </h4>
                                    <p className="service-template__body">
                                        Encuentro personal, de pareja o familiar, que requiera la intervención psicoterapéutica con la finalidad de corregir la causa y naturalizar los efectos en el cuerpo, en la conducta y en las relaciones, a través de prácticas guiadas.
                                    </p>
                                    <div className="service-template__prices">
                                        <h4 className="service-template__prices-text"><strong>US $50</strong></h4>
                                    </div>
                                    <button className="service-template__btn" onClick={() => checkout(31)}>Reservar</button>
                                </div>
                            </div>
                        </div>
                        : subService === 5 ?
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
                                            Entre 11 - 19 hs UTC/GMT+2 (Berlin). Sesión de 2 horas.
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
                            : null
        : service === 1 ? <div className="service-template__container">
            <h2 className="service-template__title">Encuentros Grupales</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image1} alt="Psicologia Virtual (con continuidad)" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <div className="service-template__subservice" onClick={() => setSubService(1)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Charla Participativa</h2>
                            <h3 className="service-template__subservice-subtitle">Fortalecimiento Psicológico</h3>
                            <h3 className="service-template__subservice-pacients">Pareja, relaciones, familia y más.</h3>
                            <h4 className="service-template__subservice-open-hours">1 hora, miércoles - 18 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $15</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(2)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Charla Participativa</h2>
                            {/* <h3 className="service-template__subservice-subtitle"></h3> */}
                            <h3 className="service-template__subservice-pacients">Mente Divina.<br />Entendemos la psicología desde el discernimiento espiritual</h3>
                            <h4 className="service-template__subservice-open-hours">2 horas, domingo - 16 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text-voluntary">$<br />Aporte<br />voluntario</h4>
                        </div>
                    </div>
                    <div className="service-template__subservice" onClick={() => setSubService(3)}>
                        <div className="service-template__subservice-details">
                            <h2 className="service-template__subservice-title">Taller Mensual</h2>
                            <h3 className="service-template__subservice-subtitle">Formación Psicológica</h3>
                            {/* <h3 className="service-template__subservice-pacients"></h3> */}
                            <h4 className="service-template__subservice-open-hours">4 horas, 1er sábado del mes - 16 - 20 hs UTC/GMT+2 (Berlin)</h4>
                        </div>
                        <div className="service-template__subservice-price">
                            <h4 className="service-template__subservice-price-text">US $60</h4>
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
            : service === 2 ?
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
                :
                service === 3 ?
                    <div className="service-template__container">
                        <h2 className="service-template__title">Psicoterapia Grupal Virtual</h2>
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
                                        <h2 className="service-template__subservice-title">1 hora</h2>
                                        <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                                        <h4 className="service-template__subservice-open-hours">Lunes a jueves & sábados - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                                    </div>
                                    <div className="service-template__subservice-price">
                                        <h4 className="service-template__subservice-price-text">US $50</h4>
                                    </div>
                                </div>
                                <div className="service-template__subservice" onClick={() => setSubService(5)}>
                                <div className="service-template__subservice-details">
                                        <h2 className="service-template__subservice-title">2 horas</h2>
                                        <h3 className="service-template__subservice-pacients">Persona, pareja, o familia</h3>
                                        <h4 className="service-template__subservice-open-hours">Lunes a jueves & sábados - 11 - 19 hs UTC/GMT+2 (Berlin)</h4>
                                    </div>
                                    <div className="service-template__subservice-price">
                                        <h4 className="service-template__subservice-price-text">US $70</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null

}