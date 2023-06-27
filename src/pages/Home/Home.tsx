import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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

type Props = {
}

export default function Home({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [renderSection1, setRenderSection1] = useState(false)
    const [renderSection2, setRenderSection2] = useState(false)
    const [renderList, setRenderList] = useState(false)
    const [successCheckout, setSuccessCheckout] = useState(0)
    const [service, setService] = useState(0)
    const [subService, setSubService] = useState(0)
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        activateRenderEffects()
    }, [])

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
        <Header style={{ filter: service ? 'blur(10px)' : '' }} />

        <div className="home__section1 scroll-item"></div>
        {renderSection1 ?
            <div className="home__section" style={{ height: '70vh' }}>
                <div className="home__section-row">
                    <div className="home__section-col1">
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Descúbrete hoy</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Encuentros participativos para comprender y liberarse.
                            <br />
                            <br />
                            Adéntrate en un espacio de crecimiento personal y transformación, donde explorarás nuevas posibilidades, sanarás heridas y descubrirás el potencial ilimitado dentro de ti.
                        </p>
                    </div>
                    <div className="home__section-col2">
                        <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Mira dentro de tí</h2>
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.6s' }}>
                            Descubre una conexión profunda contigo mismo/a mientras te acompaño en un viaje de autoexploración y desarrollo personal.
                            <br />
                            <br />
                            En este espacio seguro y confidencial, encontrarás el apoyo necesario para liberarte y abrazar tu autenticidad.
                        </p>
                    </div>
                </div>
            </div>
            : ''}

        <div className="home__section">
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
                    <h2 className="home__section-title scroll-item" style={{ textAlign: 'center', filter: service ? 'blur(10px)' : '' }}>Servicios</h2>
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
                <h2 className="home__section-title scroll-item" style={{ animationDelay: '.2s' }}>Section Title</h2>
                <div className="home__section-row">
                    <div className="home__section-col1">
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.4s' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis veniam fugiat ullam nostrum voluptas non, fuga consequuntur a itaque iure numquam velit alias! Reiciendis consequatur facere culpa omnis tenetur odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eum molestias impedit, deleniti sint nam fugiat porro at illum sapiente reprehenderit. Saepe porro expedita sapiente libero animi eveniet tempore fuga!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex ipsum natus vitae? Ratione, numquam. Unde eligendi fugit totam ipsa iure. Minus dolorem ut nulla incidunt? Provident deserunt eius quos nemo.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse libero, maxime pariatur, nesciunt ipsam fugiat illum autem optio nulla quisquam excepturi quam, ullam eveniet debitis voluptas est illo iste quos!
                        </p>
                    </div>
                    <div className="home__section-col2">
                        <p className="home__section-text scroll-item" style={{ animationDelay: '.6s' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis veniam fugiat ullam nostrum voluptas non, fuga consequuntur a itaque iure numquam velit alias! Reiciendis consequatur facere culpa omnis tenetur odio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eum molestias impedit, deleniti sint nam fugiat porro at illum sapiente reprehenderit. Saepe porro expedita sapiente libero animi eveniet tempore fuga!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex ipsum natus vitae? Ratione, numquam. Unde eligendi fugit totam ipsa iure. Minus dolorem ut nulla incidunt? Provident deserunt eius quos nemo.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse libero, maxime pariatur, nesciunt ipsam fugiat illum autem optio nulla quisquam excepturi quam, ullam eveniet debitis voluptas est illo iste quos!                        </p>
                    </div>
                </div>
            </div>
            : ''}
    </div>
}