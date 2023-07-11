import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { testImages } from '../../constants/dev'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import BGVideo from '../../assets/videos/background_video.mp4'
import Header from '../../components/Header/Header'
import ItemCard from '../../components/ItemCard/ItemCard'
import ServiceTemplates from '../../constants/templates/ServiceTemplates'
import Image1 from '../../assets/images/coffee/image14.png'
import Image2 from '../../assets/images/coffee/image42.png'
import Image3 from '../../assets/images/coffee/image9.png'
import StripePayment from '../../components/Payment/StripePayment'
import ProfilePicture from '../../assets/images/angela1.jpeg'
import ProfilePicture2 from '../../assets/images/angela2.png'
import ProfilePicture3 from '../../assets/images/angela3.png'
import MissionImage from '../../assets/images/mission.png'
import ImageEvent1 from '../../assets/images/coffee/image30.png'
import ImageEvent2 from '../../assets/images/coffee/image35.png'
import ImageEvent3 from '../../assets/images/coffee/image24.png'
import AngelitaIsoLogo from '../../assets/logos/isologo.svg'
import PresentationImage from '../../assets/images/presentation.png'
import SymptomsImage from '../../assets/illustrations/symptoms.svg'
import Calendar from 'react-calendar'
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton'
import { whatsappMessage } from '../../constants/misc'
import Button from '../../components/Button/Button'
// import 'react-calendar/dist/Calendar.css'

type Props = {
}

export default function Home({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [renderSectionAbout, setRenderSectionAbout] = useState(false)
    const [renderMission, setRenderMission] = useState(false)
    const [renderPresentation, setRenderPresentation] = useState(false)
    const [renderSymptoms, setRenderSymptoms] = useState(false)
    const [renderProfesionYServicio, setRenderProfesionYServicio] = useState(false)
    const [renderServices, setRenderServices] = useState(false)
    const [renderEvents, setRenderEvents] = useState(false)
    const [successCheckout, setSuccessCheckout] = useState(0)
    const [service, setService] = useState(0)
    const [subService, setSubService] = useState(0)
    const [renderAll, setRenderAll] = useState(false)
    const [date, setDate] = useState<any>(new Date())
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        activateRenderEffects()
        const sectionId = new URLSearchParams(document.location.search).get('sectionId')
        const _service = new URLSearchParams(document.location.search).get('service')

        if (_service) setService(parseInt(_service))
        if (sectionId) {
            setTimeout(() => {
                scrollToSection(sectionId)
            }, 100)
        }
    }, [])

    useEffect(() => {
        setRenderServices(renderAll)
        setRenderPresentation(renderAll)
        setRenderMission(renderAll)
        setRenderSymptoms(renderAll)
        setRenderSectionAbout(renderAll)
        setRenderProfesionYServicio(renderAll)
        setRenderEvents(renderAll)
    }, [renderAll])

    const scrollToSection = (section: string) => {
        if (setRenderAll) setRenderAll(true)
        setTimeout(() => {
            const element = document.getElementById(section)
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }, 50)
    }

    const activateRenderEffects = () => {
        const header = document.getElementById('header__container')
        if (header) header.classList.remove('header--fixed')
        let scrollPosition = 0
        const activateHeaderPosition = () => {
            window.addEventListener('scroll', function () {
                const home = document.getElementById('home__container')
                const wapp = document.querySelector('.whatsapp-btn__container') as HTMLElement
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop

                if (header && home) {
                    scrollPosition = scrollPosition || header.offsetTop
                    if (scrollTop > scrollPosition) {
                        home.style.marginTop = '9vh'
                        header.classList.add('header--fixed')
                        if (wapp) wapp.style.transform = 'translateX(0%)'
                    }
                    else {
                        home.style.marginTop = '0'
                        header.classList.remove('header--fixed')
                        if (wapp) wapp.style.transform = 'translateX(200%)'
                    }
                }


            })
        }
        const activateScrollingBehaviour = () => {
            window.addEventListener('scroll', function () {
                const items = document.querySelectorAll('.scroll-item')
                items.forEach(item => {
                    const itemPosition = item.getBoundingClientRect().top
                    const screenHeight = window.innerHeight

                    if (itemPosition < screenHeight) {
                        if (item.classList.contains('home__section-about')) setRenderSectionAbout(true)
                        if (item.classList.contains('home__section-mission')) setRenderMission(true)
                        if (item.classList.contains('home__section-pres')) setRenderPresentation(true)
                        if (item.classList.contains('home__section-symptoms')) setRenderSymptoms(true)
                        if (item.classList.contains('home__thrapy-list')) setRenderServices(true)
                        if (item.classList.contains('home__section-prof')) setRenderProfesionYServicio(true)
                        if (item.classList.contains('home__events')) setRenderEvents(true)
                        item.classList.remove('disappear')
                        item.classList.add('appear-down')
                    } else {
                        if (item.classList.contains('appear-down')) {
                            item.classList.remove('appear-down')
                            item.classList.add('disappear')
                            // setRenderServices(false)
                        }
                    }
                })
            })
        }

        activateScrollingBehaviour()
        activateHeaderPosition()
    }

    const checkout = (item: number) => {
        setSuccessCheckout(item)
    }

    return <div className="home__container" id='home__container'>
        <div className="home__bg-video-container" style={{ filter: service ? 'blur(10px)' : '' }}>
            <video className="home__bg-video" autoPlay loop muted>
                <source src={BGVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="home__bg-video-overlay">
                {/* <h1 className="home__bg-video-text-title">Angelita</h1> */}
                <img src={AngelitaIsoLogo} alt="Logo" className="home__bg-video-overlay-logo" />
                <h2 className="home__bg-video-overlay-subtitle">Psicología con Amor y Café</h2>
            </div>
        </div>

        <Header setRenderAll={setRenderAll} setService={setService} style={{ filter: service ? 'blur(10px)' : '' }} />

        <WhatsAppButton phoneNumber={34650609282} message={whatsappMessage} />

        <div className="home__section-about scroll-item"></div>
        {renderSectionAbout ?
            <div className="home__section" style={{ backgroundColor: '#fff' }}>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '60%', textAlign: 'justify' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.4s', alignSelf: 'flex-start', color: '#EBCE98' }}>Hola, soy <strong>Angelita</strong></h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.6s' }}>
                            Me llamo Angela Sanguino y me gusta cuando me llaman de cariño “Angelita”.
                            <br />
                            Estudio Psicología Clínica desde hace 28 años y me gradué con una especialización en Psicología Clínica, Organizacional y del Consumidor.
                            <br />
                            <br />
                            Mi tema favorito es el AMOR PERFECTO y esto es lo que he encontrado respecto a ese amor: "Dios es amor... Donde hay amor no hay miedo. Al contrario, el amor perfecto echa fuera el miedo. Pues el miedo supone el castigo. Por eso, si alguien tiene miedo, es que no ha llegado a amar perfectamente." 1 Juan 4:7, 18 DHH
                            <br />
                            <br />
                            Tengo el propósito de perdonarlo todo y amarlo todo; de ser consciente, de hallar mi ser resiliente, de despertar de tantas ilusiones que se refuerzan en el mundo como verdades.
                            <br />
                            <br />
                            Quiero llegar a mirar al otro y a mí misma, más allá de la superficio. Busco la paz interior y la sigo. Me gusta la armonía, el silencio y la sencilléz en las formas. He dejado de valorar muchas cosas como ciertas o significativas. Me gusta sonreír y divertirme, sin ningún motivo en particular. Trabajo en dar lo que me gusta recibir.
                        </p>
                    </div>
                    <div className="home__section-col2 scroll-item" style={{ width: '30%' }} >
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2> */}
                        <img src={ProfilePicture3} alt="Angela Sanguino" className="home__section-about-image" />
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-mission scroll-item"></div>
        {renderMission ?
            <div className="home__section" style={{ backgroundColor: '#B0BCEB', padding: 0 }}>
                <div className="home__section-row" style={{ justifyContent: 'normal' }}>
                    <div className="home__section-col1" style={{ width: '55%' }}>
                        <img src={MissionImage} alt="Mision" className="home__section-mission-image" />
                    </div>
                    <div className="home__section-col2" style={{ width: '50%', textAlign: 'justify', padding: '2vw' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.4s', alignSelf: 'flex-start', color: '#fff' }}>Con una <strong>Misión</strong></h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.8s' }}>
                            Quiero promover una <i>psicología afectuosa y divergente</i>, cercana, de igual a igual, asequible en todos los sentidos, donde podamos sanar y expandirnos a través de la experience del ser libre.
                            <br />
                            <br />
                            Busco disfrutar mi labor, vocación y propósito, y encontrar la manera de dignificar esta profesión y quienes la consultan.
                        </p>
                        <div className='scroll-item'>
                            <Button
                                label='Leer más'
                                handleClick={() => history.push('/mision')}
                                bgColor='#fff'
                                style={{ marginTop: '4vw' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-pres scroll-item"></div>
        {renderPresentation ?
            <div className="home__section" style={{ backgroundColor: '#fff' }}>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '50%', textAlign: 'justify' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.1s', color: '#B0BCEB' }}>¿Estás en busca de un <strong>CAMBIO</strong>?</h2>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.1s', fontSize: '1.3vw' }}>
                            ¿Quieres superar tus temores, angustias, dependencias, estados depresivos?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.5s', fontSize: '1.3vw' }}>
                            ¿Quieres redirigir y hacerte consciente de lo que haces?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.7s', fontSize: '1.3vw' }}>
                            ¿Quieres experimentar Fortaleza Interior?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.9s', fontSize: '1.3vw' }}>
                            ¿Quieres relacionarte sanamente?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '1.1s', fontSize: '1.3vw' }}>
                            ¿Quieres conocerte a ti mismo?
                        </p>
                    </div>
                    <div className="home__section-col2" style={{ width: '35%' }} >
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2> */}
                        <img src={PresentationImage} alt="Presentacion" className="home__section-pres-image" />
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-symptoms scroll-item"></div>
        {renderSymptoms ?
            <div className="home__section" style={{ backgroundColor: '#fff9ea' }}>
                <h2 className="home__section-symptoms-title scroll-item" style={{ color: '#EBCE98' }}>SÍNTOMAS DE QUE PODRÍAS NECESITAR ASESORÍA PSICOLÓGICA</h2>
                <div className="home__section-row" style={{ height: 'fit-content' }}>
                    <div className="home__section-col1" style={{ width: '30%', textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            <ul>
                                <li> Te cuesta dormir</li>
                                <li> Sufres por una relación rota o por personas especiales para ti</li>
                                <li> Sufres porque no tienes trabajo</li>
                                <li> Abusas de personas, sustancias, juegos, actividades</li>
                                <li> Lo que haces fracasa una y otra vez</li>
                                <li> Tienes dificultad para controlar impulsos</li>
                                <li> Piensas negativa o críticamente</li>
                            </ul>
                        </p>
                    </div>
                    <div className="home__section-col2 scroll-item" style={{ width: '30%' }} >
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2> */}
                        <img src={SymptomsImage} alt="Ilustracion de síntomas" className="home__section-symptoms-image" />
                    </div>
                    <div className="home__section-col1" style={{ width: '30%', textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            <ul>
                                <li> Tus personas cercanas están preocupadas por ti</li>
                                <li> Tienes problemas para solucionar conflictos</li>
                                <li> Solucionas mediante la ira o el aislamiento</li>
                                <li> Tienes sensaciones desagradables: agitación, inquietud, sudor frío</li>
                                <li> Manipulas y coaccionas</li>
                                <li> No disfrutas el día a día</li>
                                <li> No te hace sentido la vida</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section" id='servicios' style={{ backgroundColor: '#fff' }}>
            {service ?
                <div className='home__modal-container'>
                    <h4 className="home__modal-close" onClick={() => {
                        setService(0)
                        setSubService(0)
                        setSuccessCheckout(0)
                    }}>X</h4>
                    {!successCheckout ?
                        <ServiceTemplates
                            service={service}
                            subService={subService}
                            setSubService={setSubService}
                            checkout={checkout}
                        />
                        : <StripePayment />}
                </div >
                : ''
            }

            <div className="home__thrapy-list scroll-item"></div>
            {renderServices ?
                <div className="home__card-wrapper-container" style={{ filter: service ? 'blur(10px)' : '' }}>
                    <h2 className="home__section-title scroll-item"
                        style={{ textAlign: 'center' }}>
                        Servicios
                    </h2>
                    <h2 className="home__section-subtitle scroll-item" style={{ fontSize: '1.3vw' }}>
                        Sesiones grupales o individuales, en tiempo real, asistidas por una psicoterapeuta profesional que desde antes de conocerte
                        ya te aprecia infinitamente y que te acompañará con su habitual taza de café.
                    </h2>
                    <div className="home__card-wrapper">
                        <ItemCard
                            image={Image1}
                            title='Encuentros Grupales'
                            // price='US $15'
                            onClick={() => setService(1)}
                            style={{ animationDelay: '.5s' }}
                        />
                        <ItemCard
                            image={Image2}
                            title='Psicoterapia en Grupo'
                            // price='US $25'
                            onClick={() => setService(2)}
                            style={{ animationDelay: '.9s' }}
                        />
                        <ItemCard
                            image={Image3}
                            title='Psicoterapia Privada'
                            // price='US $50'
                            onClick={() => setService(3)}
                            style={{ animationDelay: '1.2s' }}
                        />
                    </div>
                </div>
                : ''}
        </div>


        <div className="home__section-prof scroll-item"></div>
        {renderProfesionYServicio ?
            <div className="home__section">
                <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Profesión y Servicio</h2>
                <div className="home__section-row" style={{ alignItems: 'flex-start' }}>
                    <div className="home__section-col1" style={{ textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Me gradué con una especialización en Psicología Clínica, Organizacional y del Consumidor en el año 2000, con registro Profesional en Colombia (001565 FUKL).
                            <br />
                            En lo sucesivo, he seguido profundizando en diversos aportes terapéuticos y herramientas psicológicas hasta encontrar un modelo que satisface y colma la necesidad del consultante a sus inquietudes más profundas, sin desperdiciar tiempo, energía, ni dinero.
                            <br />
                            Ofrezco asesoría psicológica profesional, afectuosa, comprometida, interactiva, práctica y expansiva.
                            <br />
                            Como seres humanos percibimos experiencias inquietantes y desafiantes que si nos superan o nos llevan a estados de mucho dolor, temor o búsqueda de placer, revelan una alteración psicológica inconsciente, que es digna de comprender para hallar la solución y desarrollarte libre, dichoso y en paz.
                        </p>
                    </div>
                    <div className="home__section-col2" >
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.6s' }}>
                            En mi comprensión actual, toda distorsión en la identidad propia y ajena, en el concepto del mundo y sus elementos, así como los conceptos de  existencia, propósito, relaciones, servicio y trascendencia, es la responsable del sufrimiento y desgaste inter e intra personal.
                            <br />
                            Para mí es un gusto asesorar y asistir en el proceso de descubrimiento y fortalecimiento psicológico del núcleo esencial o SER del consultante con el fin de que desde allí, él mismo, provoque a voluntad, la  disolución de la causa inconsciente de esos sentimientos, conductas y experiencias destructivas que ocasionan desgaste emocional, físico y relacional innecesario.
                            <br />
                            Promuevo la resolución eficiente de conflictos y  empodero al consultante en la renovación de su sistema de valores de manera que pueda redirigir el curso, plan y propósito de vida.
                        </p>
                    </div>
                </div>
            </div>
            : ''}


        <div className="home__events scroll-item"></div>
        {renderEvents ?
            <div className="home__section" id='eventos' style={{ backgroundColor: '#c8cfec' }}>
                <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Eventos</h2>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '40%', justifyContent: 'flex-start', textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            No te pierdas los próximos eventos donde podrás encontrar reuniones virtuales, talleres y encuentros grupales en distintos lugares.
                            <br />
                        </p>
                        <div className="home__event-calendar scroll-item">
                            <Calendar locale='es' onChange={setDate} value={date} />
                        </div>
                    </div>
                    <div className="home__section-col2" style={{ width: '55%' }}>
                        <div className="home__event-list scroll-item">
                            <div className="home__event-row">
                                <div className="home__event-schedule">
                                    Sáb
                                    <br />
                                    25 Jun
                                    <br />
                                    11:00
                                </div>
                                <div className="home__event-image-wrapper">
                                    <img src={ImageEvent1} alt="Evento" className="home__event-image" />
                                </div>
                                <div className="home__event-details">
                                    <h1 className="home__event-title">Cómo Lidiar con la Negatividad</h1>
                                    <h2 className="home__event-subtitle">👥 13 Participantes</h2>
                                    <h3 className="home__event-venue">🖥 Evento Virtual</h3>
                                </div>
                            </div>

                            <div className="home__event-row">
                                <div className="home__event-schedule">
                                    Sáb
                                    <br />
                                    18 Jun
                                    <br />
                                    13:00
                                </div>
                                <div className="home__event-image-wrapper">
                                    <img src={ImageEvent2} alt="Evento" className="home__event-image" />
                                </div>
                                <div className="home__event-details">
                                    <h1 className="home__event-title">4 temores cuando hablamos en público</h1>
                                    <h2 className="home__event-subtitle">👥 22 Participantes</h2>
                                    <h3 className="home__event-venue">Evento Virtual</h3>
                                </div>
                            </div>

                            <div className="home__event-row" style={{ border: 'none' }}>
                                <div className="home__event-schedule">
                                    Sáb
                                    <br />
                                    2 Jul
                                    <br />
                                    14:30
                                </div>
                                <div className="home__event-image-wrapper">
                                    <img src={ImageEvent3} alt="Evento" className="home__event-image" />
                                </div>
                                <div className="home__event-details">
                                    <h1 className="home__event-title">Cuando la estrategia paternal  es la imposición y el dominio</h1>
                                    <h2 className="home__event-subtitle">👥 9 Participantes</h2>
                                    <h3 className="home__event-venue">Evento Virtual</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ''}
    </div>
}