import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { testImages } from '../../constants/dev'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import BGVideo from '../../assets/videos/background_video.mp4'
import Header from '../../components/Header/Header'
import ItemCard from '../../components/ItemCard/ItemCard'
import ServiceTemplates from '../../constants/ServiceTemplates'
import Image1 from '../../assets/images/coffee/image14.png'
import Image2 from '../../assets/images/coffee/image42.png'
import Image3 from '../../assets/images/coffee/image9.png'
import StripePayment from '../../components/Payment/StripePayment'
import ProfilePicture from '../../assets/images/angela1.jpeg'
import ImageEvent1 from '../../assets/images/coffee/image30.png'
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'

type Props = {
}

export default function Home({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [renderSection1, setRenderSection1] = useState(false)
    const [renderSection2, setRenderSection2] = useState(false)
    const [renderList, setRenderList] = useState(false)
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
        setRenderList(renderAll)
        setRenderSection1(renderAll)
        setRenderSection2(renderAll)
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
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop

                if (header && home) {
                    scrollPosition = scrollPosition || header.offsetTop
                    if (scrollTop > scrollPosition) {
                        home.style.marginTop = '7vh'
                        header.classList.add('header--fixed')
                    }
                    else {
                        home.style.marginTop = '0'
                        header.classList.remove('header--fixed')
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

                    if (itemPosition < screenHeight * 0.9) {
                        if (item.classList.contains('home__thrapy-list')) setRenderList(true)
                        if (item.classList.contains('home__section1')) setRenderSection1(true)
                        if (item.classList.contains('home__section2')) setRenderSection2(true)
                        if (item.classList.contains('home__events')) setRenderEvents(true)
                        item.classList.remove('disappear')
                        item.classList.add('appear-down')
                    } else {
                        if (item.classList.contains('appear-down')) {
                            item.classList.remove('appear-down')
                            item.classList.add('disappear')
                            // setRenderList(false)
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
            <div className="home__bg-video-text">
                <h1 className="home__bg-video-text-title">Angelita</h1>
                <h2 className="home__bg-video-text-subtitle">Psicología con amor y café</h2>
            </div>
        </div>

        <Header setRenderAll={setRenderAll} setService={setService} style={{ filter: service ? 'blur(10px)' : '' }} />

        <div className="home__section1 scroll-item"></div>
        {renderSection1 ?
            <div className="home__section" style={{ backgroundColor: '#B0BCEB' }}>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ width: '60%', textAlign: 'justify' }}>
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Descúbrete hoy</h2> */}
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Me llamo Angela Sanguino y me gusta cuando me llaman de cariño “Angelita”.
                            <br />
                            Estudio Psicología Clínica desde hace 28 años y me gradué con una especialización en Psicología Clínica, Organizacional y del Consumidor.
                            <br />
                            Me he dedicado a explorar y estudiar técnicas y terapias dentro del marco de las Tres Corrientes Psicológicas existentes: Humanista, Psicodinámica y Comportamental.
                            <br />
                            Promuevo la resolución eficiente de conflictos y empodero al consultante en la renovación de su sistema de valores de manera que pueda redirigir el curso, plan y propósito de vida.
                            <br />
                            Sigo profundizando en diversos aportes terapéuticos y herramientas psicológicas para encontrar un modelo que satisfaga y colme la necesidad del consultante a sus inquietudes más profundas sin desperdiciar tiempo, energía, ni dinero.
                        </p>
                    </div>
                    <div className="home__section-col2 scroll-item" style={{ width: '30%' }} >
                        {/* <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2> */}
                        <img src={ProfilePicture} alt="Angela Sanguino" className="home__section-about-image" />
                    </div>
                </div>
                <h4 className='home__section-about-foot-text scroll-item'>Busco la paz interior y la sigo &nbsp&nbsp•&nbsp&nbsp Me gusta la armonía, el silencio y la sencillez en las formas &nbsp&nbsp•&nbsp&nbsp Me gusta sonreír y divertirme, sin ningún motivo en particular</h4>
            </div>
            : ''}

        <div className="home__section" id='servicios' style={{ backgroundColor: '#EBD28D' }}>
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
            {renderList ?
                <div className="home__card-wrapper-container">
                    <h2 className="home__section-title scroll-item"
                        style={{ textAlign: 'center', filter: service ? 'blur(10px)' : '' }}>
                        Servicios
                    </h2>
                    <div className="home__card-wrapper" style={{ filter: service ? 'blur(10px)' : '' }}>
                        <ItemCard
                            image={Image1}
                            title='Encuentros Grupales'
                            // price='US $15'
                            onClick={() => setService(1)}
                            style={{ animationDelay: '0s' }}
                        />
                        <ItemCard
                            image={Image2}
                            title='Psicoterapia en Grupo'
                            // price='US $25'
                            onClick={() => setService(2)}
                            style={{ animationDelay: '.2s' }}
                        />
                        <ItemCard
                            image={Image3}
                            title='Psicoterapia Privada'
                            // price='US $50'
                            onClick={() => setService(3)}
                            style={{ animationDelay: '.4s' }}
                        />
                    </div>
                </div>
                : ''}
        </div>


        <div className="home__section2 scroll-item"></div>
        {renderSection2 ?
            <div className="home__section">
                <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Profesión y Servicio</h2>
                <div className="home__section-row">
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
                    <div className="home__section-col2">
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
            <div className="home__section" id='eventos' style={{ backgroundColor: '#B0BCEB' }}>
                <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Eventos</h2>
                <div className="home__section-row">
                    <div className="home__section-col1" style={{ textAlign: 'justify' }}>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            No te pierdas los últimos eventos donde podrás encontrar reuniones virtuales, talleres y encuentros grupales en distintos lugares.
                            <br />
                        </p>
                        <div className="home__event-calendar scroll-item">
                            <Calendar onChange={setDate} value={date} />
                        </div>
                    </div>
                    <div className="home__section-col2" style={{ width: '55%'}}>
                        <div className="home__event-list">
                            <div className="home__event-row">
                                <div className="home__event-schedule">
                                    Sáb
                                    <br />
                                    25 Jun
                                    <br />
                                    11:00
                                </div>
                                <div className="home__event-image">
                                    <img src={ImageEvent1} alt="Evento" className="home__event-image" />
                                </div>
                                <div className="home__event-details">
                                    <h1 className="home__event-title">Cómo Lidiar con la Negatividad</h1>
                                    <h2 className="home__event-subtitle">👥 13 Participantes</h2>
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