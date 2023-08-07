import { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import BGVideo from '../../assets/videos/background_video.mp4'
import Header from '../../components/Header/Header'
import ItemCard from '../../components/ItemCard/ItemCard'
import ServiceTemplates from '../../constants/templates/ServiceTemplates'
import Image1 from '../../assets/images/coffee/image14.png'
import Image2 from '../../assets/images/coffee/image42.png'
import Image3 from '../../assets/images/coffee/image9.png'
import Payment from '../../components/Payment/Payment'
import ProfilePicture4 from '../../assets/images/angela4.png'
import MissionImage from '../../assets/images/mission.png'
import ToolsImage from '../../assets/images/tools.png'
import ImageEvent1 from '../../assets/images/coffee/image30.png'
import ImageEvent2 from '../../assets/images/coffee/image35.png'
import ImageEvent3 from '../../assets/images/coffee/image24.png'
import AngelitaIsoLogo from '../../assets/logos/isologo.svg'
import AngelitaLogo from '../../assets/logos/angelita_logo.png'
import PresentationImage from '../../assets/images/presentation.png'
import Calendar from 'react-calendar'
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton'
import { whatsappMessage } from '../../constants/misc'
import Button from '../../components/Button/Button'
import { dataObj } from '../../types'
import { getAllEvents } from '../../services/event'
import EventCard from '../../components/EventCard/EventCard'

export default function Home() {
    const [renderSectionAbout, setRenderSectionAbout] = useState(false)
    const [renderMission, setRenderMission] = useState(false)
    const [renderPresentation, setRenderPresentation] = useState(false)
    const [renderSymptoms, setRenderSymptoms] = useState(false)
    const [renderProfesionYServicio, setRenderProfesionYServicio] = useState(false)
    const [renderServices, setRenderServices] = useState(false)
    const [renderDiscounts, setRenderDiscounts] = useState(false)
    const [renderTools, setRenderTools] = useState(false)
    const [renderEvents, setRenderEvents] = useState(false)
    const [checkout, setCheckout] = useState('')
    const [service, setService] = useState(0)
    const [subService, setSubService] = useState(0)
    const [renderAll, setRenderAll] = useState(false)
    const [date, setDate] = useState<any>(new Date())
    const [events, setEvents] = useState<dataObj[]>([])
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

        getEvents()
    }, [])

    useEffect(() => {
        setRenderServices(renderAll)
        setRenderPresentation(renderAll)
        setRenderMission(renderAll)
        setRenderSymptoms(renderAll)
        setRenderTools(renderAll)
        setRenderSectionAbout(renderAll)
        setRenderProfesionYServicio(renderAll)
        setRenderEvents(renderAll)
        setRenderDiscounts(renderAll)
    }, [renderAll])

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            if (service) body.style.overflow = 'hidden'
            else body.style.overflow = 'unset'
        }
    }, [service])

    const getEvents = async () => {
        try {
            const allEvents = await getAllEvents()
            if (allEvents && allEvents.length) setEvents(allEvents)
        } catch (err) {
            console.error(err)
        }
    }

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
                const scrollHeight = document.documentElement.scrollHeight

                if (header && home) {
                    scrollPosition = scrollPosition || header.offsetTop
                    if (scrollTop > scrollPosition && scrollPosition + scrollTop < scrollHeight) {
                        home.style.marginTop = '9vh'
                        header.classList.add('header--fixed')
                    }
                    else {
                        home.style.marginTop = '0'
                        header.classList.remove('header--fixed')
                    }
                    if (scrollTop > scrollPosition && scrollPosition + scrollTop + 100 < scrollHeight) {
                        if (wapp) wapp.style.transform = 'translateX(0%)'
                    }
                    else if (wapp) wapp.style.transform = 'translateX(200%)'
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
                        if (item.classList.contains('home__section-services')) setRenderServices(true)
                        if (item.classList.contains('home__section-discounts')) setRenderDiscounts(true)
                        if (item.classList.contains('home__section-prof')) setRenderProfesionYServicio(true)
                        if (item.classList.contains('home__section-tools')) setRenderTools(true)
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
            <div className="home__section" id='sobre-mi' style={{ backgroundColor: '#fff', filter: service ? 'blur(10px)' : '' }}>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '60%', textAlign: 'justify' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.4s', alignSelf: 'flex-start', color: '#EBAA59' }}>Hola, soy&nbsp;<strong>Angelita</strong></h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.6s' }}>
                            Me llamo Angela Sanguino y me gusta cuando me llaman de cariño “Angelita”.
                            <br />
                            <br />
                            He estudiado Psicología Clínica desde hace 28 años y me gradué con una especialización en Psicología Clínica, Organizacional y del Consumidor.
                            <br />
                            <br />
                            Mi tema favorito es el AMOR PERFECTO y esto es lo que he encontrado respecto a ese amor: "Dios es amor... Donde hay amor no hay miedo. Al contrario, el amor perfecto echa fuera el miedo. Pues el miedo supone el castigo. Por eso, si alguien tiene miedo, es que no ha llegado a amar perfectamente." 1 Juan 4:7, 18 DHH                            <br />
                            <br />
                            Tengo el propósito de perdonarlo todo y amarlo todo; de ser consciente, de hallar mi ser resiliente, de despertar de tantas ilusiones que se refuerzan en el mundo como verdades.
                            <br />
                            <br />
                            Quiero llegar a mirar al otro y a mí misma, más allá de la superficie. Busco la paz interior y la sigo. Me gusta la armonía, el silencio y la sencillez en las formas. Me gusta sonreír y divertirme, sin ningún motivo en particular. Trabajo en dar lo que me gusta recibir.                        </p>
                    </div>
                    <div className="home__section-col2 scroll-item" style={{ width: '30%', alignItems: 'center' }} >
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2> */}
                        <img src={ProfilePicture4} alt="Angela Sanguino" className="home__section-about-image" />
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-mission scroll-item"></div>
        {renderMission ?
            <div className="home__section" style={{ backgroundColor: '#B0BCEB', padding: 0, filter: service ? 'blur(10px)' : '' }}>
                <div className="home__section-row" style={{ justifyContent: 'normal' }}>
                    <div className="home__section-col1" style={{ width: '55%' }}>
                        <img src={MissionImage} alt="Mision" className="home__section-mission-image" />
                    </div>
                    <div className="home__section-col2" style={{ width: '50%', textAlign: 'justify', padding: '2vw' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.4s', alignSelf: 'flex-start', color: '#fff' }}>Con una&nbsp;<strong>Misión</strong></h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.8s' }}>
                            Quiero promover una psicología afectuosa, cercana, de igual a igual, asequible en todos los sentidos, donde podamos sanar y expandirnos a través de la experiencia del ser libre.                            <br />
                            <br />
                            Busco disfrutar mi labor, vocación y propósito, y encontrar constantemente la manera de dignificar esta profesión y quienes la consultan.                        </p>
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

        {service ?
            <div className='home__modal-wrapper'>
                <div className='home__modal-container'>
                    <h4 className="home__modal-close" onClick={() => {
                        setService(0)
                        setSubService(0)
                        setCheckout('')
                        setTimeout(() => scrollToSection('servicios'), 100)
                    }}>X</h4>
                    {!checkout ?
                        <ServiceTemplates
                            service={service}
                            subService={subService}
                            setSubService={setSubService}
                            checkout={(val) => setCheckout(val)}
                        />
                        : <Payment checkout={checkout} />}
                </div >
            </div >
            : ''
        }

        <div className="home__section-services scroll-item"></div>
        {renderServices ?
            <div className="home__section" id='servicios' style={{ filter: service ? 'blur(10px)' : '' }}>
                <h2 className="home__section-title scroll-item" style={{ alignSelf: 'center', color: '#B0BCEB', fontSize: '3vw', margin: 0 }}>
                    SERVICIOS
                </h2>
                <div className="home__section-row" style={{ height: 'fit-content' }}>
                    <div className="home__section-col1" style={{ width: '100%' }}>
                        <h2 className="home__section-subtitle scroll-item" style={{ fontSize: '1.4vw', textAlign: 'center' }}>
                            Sesiones grupales o individuales, en tiempo real, asistidas por una psicoterapeuta profesional que desde antes de conocerte
                            ya te aprecia infinitamente y que te acompañará con su habitual taza de café.
                        </h2>
                        <div className="home__card-wrapper" style={{ transform: 'scale(.9)' }}>
                            <ItemCard
                                image={Image3}
                                title='Psicoterapia Privada'
                                // price='US $50'
                                onClick={() => setService(3)}
                                style={{ animationDelay: '.5s' }}
                            />
                            <ItemCard
                                image={Image1}
                                title='Encuentros Grupales'
                                // price='US $15'
                                onClick={() => setService(1)}
                                style={{ animationDelay: '1s' }}
                            />
                            <ItemCard
                                image={Image2}
                                title='Psicoterapia en Grupo'
                                // price='US $25'
                                onClick={() => setService(2)}
                                style={{ animationDelay: '1.4s' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-discounts scroll-item"></div>
        {renderDiscounts ?
            <div className="home__section">
                <h2 className="home__section-title scroll-item" style={{ color: '#EBAA59', fontSize: '2.2vw', alignSelf: 'center' }}>DESCUENTOS ESPECIALES</h2>
                <div className="home__discount-row" >
                    <div className="home__discount-card" >
                        <p className="home__discount-percentage scroll-item">20%</p>
                        <p className="home__discount-text scroll-item">En todos los servicios a residentes en Sudamérica</p>
                    </div>
                    <div className="home__discount-card">
                        <p className="home__discount-percentage scroll-item">10%</p>
                        <p className="home__discount-text scroll-item" >En paquetes de 4 a 6 sesiones consecutivas en cualquier servicio</p>
                    </div>
                </div>
                <div className="home__discount-row">
                    <div className="home__discount-card">
                        <p className="home__discount-percentage scroll-item">15%</p>
                        <p className="home__discount-text scroll-item" >En la primer compra de paquete de 4 a 6 sesiones consecutivas en cualquier servicio</p>
                    </div>
                    <div className="home__discount-card">
                        <p className="home__discount-percentage scroll-item" style={{ fontSize: '1.5rem', fontFamily: 'unset' }}>Casos de Insolvencia</p>
                        <Button
                            label='Leer más'
                            handleClick={() => history.push('/descuentos')}
                            bgColor='#B0BCEB'
                            textColor='#fff'
                            style={{ marginTop: '1rem', width: 'fit-content' }}
                        />
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-prof scroll-item"></div>
        {renderProfesionYServicio ?
            <div className="home__section">
                <div className="home__section-row" style={{ alignItems: 'center' }}>
                    <div className="home__section-col1" style={{ textAlign: 'justify', width: '100%' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.3s', color: '#B0BCEB', fontSize: '2.2vw' }}>Amor. Vocación. Interacción. Comprensión. Expansión</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s', width: '90%' }}>
                            Ofrezco asesoría psicológica profesional, afectuosa, pedagógica y práctica, enmarcada dentro del modelo humanista transpersonal, el cual ofrece un escalonamiento en fuerza, poder y dominio mental a medida que se deconstruye el autoconcepto e interpretaciones parciales y distorcionadas acerca de los demás, el mundo y sus elementos.
                            <br />
                            <br />
                            Promuevo la resolución eficiente de conflictos y empodero al consultante en la renovación de su sistema de valores de manera que pueda redirigir el curso, plan y propósito de vida. La persona se extiende a la experiencia de sanidad y libertad una vez que encuentra su núcleo esencial o identidad libre.
                            <br />
                            <br />
                            Para mí es un gusto asesorar y asistir en este proceso de descubrimiento y fortalecimiento psicológico, cuya natural disolución de causas inconscientes, acabarán con el desgaste emocional, físico y relacional innecesario. El resultado humanos adultos, conscientes, maduros y resilientes.
                        </p>
                        <div className='scroll-item'>
                            <Button
                                label='Leer más'
                                handleClick={() => history.push('/profesion-y-servicio')}
                                bgColor='#B0BCEB'
                                textColor='#fff'
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
                    <div className="home__section-col2 scroll-item" style={{ width: '30%' }} >
                        <img src={PresentationImage} alt="Presentacion" className="home__section-pres-image" />
                    </div>
                    <div className="home__section-col1" style={{ width: '100%', textAlign: 'justify' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.1s', color: '#B0BCEB' }}>¿Estás en busca de un <strong>CAMBIO</strong>?</h2>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.3s', fontSize: '1.3vw' }}>
                            ¿Quieres superar tus temores, angustias, dependencias, estados depresivos?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.5s', fontSize: '1.3vw' }}>
                            ¿Quieres redirigir y hacerte consciente de lo que haces?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.7s', fontSize: '1.3vw' }}>
                            ¿Quieres conocerte a ti mismo?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '.9s', fontSize: '1.3vw' }}>
                            ¿Quieres experimentar Fortaleza Interior?
                        </p>
                        <p className="home__section-text scroll-item" style={{ textAlign: 'center', animationDelay: '1.1s', fontSize: '1.3vw' }}>
                            ¿Quieres relacionarte sanamente?
                        </p>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-symptoms scroll-item"></div>
        {renderSymptoms ?
            <div className="home__section" style={{ backgroundColor: '#fff' }}>
                <h2 className="home__section-symptoms-title scroll-item" style={{ color: '#EBCE98', textAlign: 'center', alignSelf: 'center', fontSize: '1.6rem' }}>SÍNTOMAS DE QUE PODRÍAS NECESITAR ASESORÍA PSICOLÓGICA</h2>
                <div className="home__section-row" style={{ height: 'fit-content', justifyContent: 'center', marginTop: '4rem' }}>
                    <div className="home__section-col1" style={{ width: '45%', textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Te cuesta dormir
                            <br />
                            Sufres por una relación rota o por personas especiales para ti
                            <br />
                            Sufres porque no tienes trabajo
                            <br />
                            Abusas de personas, sustancias, juegos, actividades
                            <br />
                            Lo que haces fracasa una y otra vez
                            <br />
                            Tienes dificultad para controlar impulsos
                            <br />
                            Piensas negativa o críticamente
                        </p>
                    </div>
                    <div className="home__section-col1" style={{ width: '45%', textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Tus personas cercanas están preocupadas por ti
                            <br />
                            Tienes problemas para solucionar conflictos
                            <br />
                            Solucionas mediante la ira o el aislamiento
                            <br />
                            Tienes sensaciones desagradables: agitación, inquietud, sudor frío
                            <br />
                            Manipulas y coaccionas
                            <br />
                            No disfrutas el día a día
                            <br />
                            No te hace sentido la vida
                        </p>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section-tools scroll-item"></div>
        {renderTools ?
            <div className="home__section" style={{ backgroundColor: '#fff' }}>
                <div className="home__section-row" style={{ height: 'fit-content', alignItems: 'flex-start' }}>
                    <div className="home__section-col1" style={{ width: '35%', alignItems: 'flex-start' }}>
                        <h2 className="home__section-tools-title scroll-item" style={{ color: '#B0BCEB', alignSelf: 'flex-start' }}>Herramientas Terapéuticas</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Entrenamiento autógeno en la Calma
                            <br />
                            Divergencia
                            <br />
                            Regulación Emocional
                            <br />
                            EMDR
                            <br />
                            EFT
                            <br />
                            Experiencia Somática
                            <br />
                            Hearth Math
                            <br />
                            Desensibilización hipnótica
                            <br />
                            Visualización
                            <br />
                            Test del Apego
                            <br />
                            Test de Temperamento
                            <br />
                            Análisis Transaccional
                            <br />
                            Técnicas estóicas
                        </p>
                    </div>
                    <div className="home__section-col2 scroll-item" style={{ width: '30%', alignItems: 'flex-start', borderRight: '5vw solid #B0BCEB' }} >
                        <h2 className="home__section-tools-title scroll-item" style={{ color: '#B0BCEB', alignSelf: 'flex-start' }}>Enfoque Terapéutico</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Terapia de Aceptación y Compromiso
                            <br />
                            Terapia Cognitivo - Conductual
                            <br />
                            Psiconeurobiología
                            <br />
                            Psicología Sistémica
                            <br />
                            Psicología Integrativa
                            <br />
                            Psicología del Desarrollo
                        </p>
                        <img src={ToolsImage} alt="Ilustracion de síntomas" className="home__section-tools-image" />
                    </div>
                    <div className="home__section-col1" style={{ width: '20%' }}>
                        <h2 className="home__section-tools-title scroll-item" style={{ color: '#B0BCEB', alignSelf: 'flex-start' }}>Metodología en Sesión</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            1. Afecto
                            <br />
                            2. Formación
                            <br />
                            3. Reflexión
                            <br />
                            4. Interactividad
                            <br />
                            5. Práctica
                        </p>
                        <div className='scroll-item'>
                            <Button
                                label='Leer más'
                                handleClick={() => history.push('/metodologias')}
                                bgColor='#B0BCEB'
                                textColor='#fff'
                                style={{ marginTop: '4vw' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__events scroll-item"></div>
        {renderEvents ?
            <div className="home__section" id='eventos' style={{ backgroundColor: '#c8cfec' }}>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '40%', textAlign: 'justify' }}>
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s', alignSelf: 'flex-start', margin: 0 }}>Eventos</h2>
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
                            {events.map((event: dataObj, i: number) =>
                                <EventCard
                                    key={i}
                                    event={event}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            : ''}


        <div className="home__section-logo" style={{ backgroundColor: '#fff' }}>
            <img src={AngelitaLogo} alt="Angelita" className="home__section-logo-image" />
        </div>

    </div>
}