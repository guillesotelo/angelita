import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { testImages } from '../../constants/dev'
import { getAllPosts } from '../../services'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import BGVideo from '../../assets/videos/background_video.mp4'
import Header from '../../components/Header/Header'
import ItemCard from '../../components/ItemCard/ItemCard'
import {
    consejeriaVirtual,
    cursoSemetral,
    encuentrosPresencialesVirtuales,
    psicoGrupalVirtual,
    psicoterapiaVirtual,
    successCheckoutTemplate,
    tallerMensualVirtual
} from '../../constants/serviceTemplates'
import Image1 from '../../assets/images/image1.jpeg'
import Image2 from '../../assets/images/image2.jpg'
import Image3 from '../../assets/images/image3.jpg'
import Image4 from '../../assets/images/image4.jpg'
import Image5 from '../../assets/images/image5.jpg'
import Image6 from '../../assets/images/image6.webp'

type Props = {
}

export default function Home({ }: Props) {
    const [openModal, setOpenModal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [renderSection1, setRenderSection1] = useState(false)
    const [renderSection2, setRenderSection2] = useState(false)
    const [renderList, setRenderList] = useState(false)
    const [successCheckout, setSuccessCheckout] = useState(0)
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

    const getServiceTemplate = (number: number) => {
        const templates: { [key: number]: any } = {
            1: psicoterapiaVirtual,
            2: consejeriaVirtual,
            3: psicoGrupalVirtual,
            4: tallerMensualVirtual,
            5: cursoSemetral,
            6: encuentrosPresencialesVirtuales,
        }
        return templates[number]
    }

    const checkout = (item: number) => {
        setSuccessCheckout(item)
    }


    return <div className="home__container" id='home__container'>
        <div className="home__bg-video-container" style={{ filter: openModal ? 'blur(10px)' : '' }}>
            <video className="home__bg-video" autoPlay loop muted>
                <source src={BGVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="home__bg-video-text">
                <h4>Terapia Compasiva</h4>
                <p>Aceptación y compromiso</p>
            </div>
        </div>
        <Header style={{ filter: openModal ? 'blur(10px)' : '' }} />

        <div className="home__section1 scroll-item"></div>
        {renderSection1 ?
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

        <div className="home__section">
            {openModal ?
                <div className='home__modal-container'>
                    <h4 className="home__modal-close" onClick={() => {
                        setOpenModal(0)
                        setSuccessCheckout(0)
                    }}>X</h4>
                    {!successCheckout ? getServiceTemplate(openModal) : successCheckoutTemplate}
                    {!successCheckout ?
                        <button className="home__modal-body-btn" onClick={() => {
                            checkout(1)
                        }}>Reservar</button>
                        : <button className="home__modal-body-btn" style={{ width: '100%', marginTop: '1vw' }} onClick={() => {
                            setOpenModal(0)
                            setSuccessCheckout(0)
                        }}>Hecho</button>
                    }
                </div >
                : ''
            }

            <div className="home__thrapy-list scroll-item"></div>
            {renderList ?
                <div className="home__card-wrapper-container">
                    <h2 className="home__section-title scroll-item" style={{ textAlign: 'center' }}>Terapias</h2>
                    <div className="home__card-wrapper" style={{ filter: openModal ? 'blur(10px)' : '' }}>
                        <ItemCard
                            image={Image1}
                            title='Psicoterapia Virtual (con continuidad)'
                            price='US $40'
                            onClick={() => setOpenModal(1)}
                            style={{ animationDelay: '0s' }}
                        />
                        <ItemCard
                            image={Image2}
                            title='Conserjería Virtual (sin continuidad)'
                            price='US $40'
                            onClick={() => setOpenModal(2)}
                            style={{ animationDelay: '.2s' }}
                        />
                        <ItemCard
                            image={Image3}
                            title='Psicoterapia Grupal Virtual'
                            price='US $10'
                            onClick={() => setOpenModal(3)}
                            style={{ animationDelay: '.4s' }}
                        />
                        <ItemCard
                            image={Image4}
                            title='Taller Mensual Virtual'
                            price='US $50'
                            onClick={() => setOpenModal(4)}
                            style={{ animationDelay: '.6s' }}
                        />
                        <ItemCard
                            image={Image5}
                            title='Curso Semestral'
                            price='US $100'
                            onClick={() => setOpenModal(5)}
                            style={{ animationDelay: '.8s' }}
                        />
                        <ItemCard
                            image={Image6}
                            title='Encuentros y Charlas Presenciales y Virtuales'
                            price='Aporte voluntario'
                            onClick={() => setOpenModal(6)}
                            style={{ animationDelay: '1s' }}
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