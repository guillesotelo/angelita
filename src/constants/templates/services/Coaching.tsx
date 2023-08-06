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
                        Lunes a sábado.
                        <br />
                        Entre 11 - 19 hs UTC/GMT+2 (Berlin).
                    </h4>
                    <p className="service-template__body">
                        El coaching psicológico es un proceso guiado que busca potenciar el bienestar emocional y personal. A través de conversaciones confidenciales, el coach colabora con el individuo para identificar objetivos, superar desafíos y desarrollar estrategias para el crecimiento y el cambio positivo.
                    </p>
                    <div className="service-template__row" style={{ transform: 'scale(.85)' }}>
                        <h4 className="service-template__open-hours" style={{ margin: 0 }}>4 Semanas - 20 horas</h4>
                        <div className="service-template__prices">
                            <h4 className="service-template__prices-text"><strong>US $800</strong></h4>
                        </div>
                    </div>
                    <button className="service-template__btn" onClick={() => checkout('64ca5fd4baf72a66cc29c695')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}