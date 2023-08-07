import Image from '../../../assets/images/coffee/image50.png'

type Props = {
    checkout: (value: string) => void
}

export default function Coaching({ checkout }: Props) {
    return (
        <div className="service-template__container">
            <h2 className="service-template__title">Coaching</h2>
            <div className="service-template__section">
                <div className="service-template__col1">
                    <img src={Image} alt="Psicoterapia Privada" loading="lazy" className="service-template__image" />
                </div>
                <div className="service-template__col2">
                    <h4 className="service-template__open-hours" style={{ margin: 0 }}>
                        <strong>Personal</strong>
                        <br />
                        20 horas - 20 días - 1 mes.
                        <br />
                        Luego de la reserva, se coordinan directamente los dás y horarios.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                    </h4>
                    <p className="service-template__body">
                        Como en un Gimnasio, cada día, de Lunes a Viernes de manera INTENSIVA y ACOMPAÑADA, agendaremos un encuentro para fortalecer y reforzar cada área del  alcance psicológico que necesites entrenar para instaurar calma, dominio, paz, dicha y solvencia mental en aquellos asuntos personales que deseas trabajar,  usando tus propios recursos y valores, solo que cuestionando cada resistencia, limitación, distorsión a nivel de creencias
                        que surja en el día a día; esto, a cualquier nivel en el que se presente: identidad,  afecto, relaciones, rutinas, proyectos, trabajo y descanso.
                        <br/>
                        Cada semana trabajaremos un módulo en específico: Identidad, Relaciones, Valores, Decisiones.
                        <br/>
                        Cada semana programaremos los encuentros de la siguiente semana. Trabajaremos 1 hora diaria de manera Intensiva y haremos todo lo que esté al alcance para no faltar a ninguna sesión. Si hay enfermedad o debilidad de algún tipo, será el escenario perfecto para trabajar esa debilidad a nivel mental.
                    </p>
                    <div className="service-template__row">
                        <h4 className="service-template__open-hours" style={{ margin: 0 }}>4 Semanas - 20 horas</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $800</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64cf75c86c46de4d4f1f7f59')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}