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

type Props = {
}

export default function Home({ }: Props) {
    const [openModal, setOpenModal] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        activateHeaderPosition()
    }, [])

    const activateHeaderPosition = () => {
        let scrollPosition = 0
        document.addEventListener('DOMContentLoaded', function () {
            const activateHeaderPosition = () => {
                window.addEventListener('scroll', function () {
                    const header = document.getElementById('header__container')
                    const home = document.getElementById('home__container')
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

                    if (header && home) {
                        scrollPosition = scrollPosition || header.offsetTop
                        if (scrollTop > scrollPosition) {
                            home.style.marginTop = '4.5vw'
                            header.classList.add('header--fixed')
                        }
                        else {
                            home.style.marginTop = '0'
                            header.classList.remove('header--fixed')
                        }
                    }
                })
            }

            activateHeaderPosition()
        })
    }

    return <div className="home__container" id='home__container'>
        <div className="home__bg-video-container">
            <video className="home__bg-video" autoPlay loop muted>
                <source src={BGVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="home__bg-video-text">
                <h4>Terapia Compasiva</h4>
                <p>Aceptación y compromiso</p>
            </div>
        </div>
        <Header />

        <div className="home__section">

            {openModal ?
                <div className='home__modal-container'>
                    <h4 className="home__modal-close" onClick={() => setOpenModal('')}>X</h4>
                    <div className="home__modal-body">
                        <div className="home__modal-body-details">
                            <img src="https://facilitationfirst.com/wp-content/uploads/2020/09/Virtual-meeting-warm-up-scaled.jpg" alt="" className="home__modal-image" />
                            <h4 className='home__modal-body-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, atque necessitatibus itaque quaerat totam amet tempore iste maxime vel nulla soluta labore dolores dolore molestias similique commodi minus alias laborum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, quasi sed architecto eligendi fuga nisi eveniet eaque debitis porro atque mollitia soluta cupiditate pariatur numquam? Sed rerum hic beatae aliquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, sequi deserunt! Quis ullam qui, earum molestias sequi possimus sapiente rerum porro eveniet, dolores amet sed doloribus odit deserunt adipisci ad? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat rerum amet fugit voluptatem molestias dolorem voluptate dicta consequatur totam distinctio sed laboriosam vitae, similique pariatur ea, labore repellat repudiandae soluta?</h4>
                        </div>
                        <div className="home__modal-body-btn">Reservar</div>
                    </div>
                </div >
                : ''
            }

            <div className="home__card-wrapper">
                <ItemCard
                    image='https://facilitationfirst.com/wp-content/uploads/2020/09/Virtual-meeting-warm-up-scaled.jpg'
                    title='Psicoterapia Virtual'
                    price='US $40'
                    onClick={() => setOpenModal('1')}
                />
                <ItemCard
                    image='https://media.istockphoto.com/id/1416048929/sv/foto/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=612x612&w=0&k=20&c=tS_2t3O3QEfaTG0bvkpFyqt_4p9oZirF8rfh4MLR3to='
                    title='Conserjería Virtual'
                    price='US $40'
                    onClick={() => setOpenModal('2')}
                />
                <ItemCard
                    image='https://coworkingfy.com/wp-content/uploads/2020/04/dinamicas-de-grupo.jpg'
                    title='Psicoterapia Virtual'
                    price='US $10'
                    onClick={() => setOpenModal('3')}
                />
                <ItemCard
                    image='https://cdn-e360.s3-sa-east-1.amazonaws.com/educacion-en-tiempos-de-pandemia-por-que-es-importante-que-los-ninos-lleven-talleres-extracurriculares-online-large-IOb1DWjoad.jpg'
                    title='Taller Mensual Virtual'
                    price='US $50'
                    onClick={() => setOpenModal('4')}
                />
                <ItemCard
                    image='https://cdn1.matadornetwork.com/blogs/2/2020/03/shutterstock_1069206707-1200x854.jpg'
                    title='Curso Semestral'
                    price='US $100'
                    onClick={() => setOpenModal('5')}
                />
                <ItemCard
                    image='https://www.verywellmind.com/thmb/lnGdkp_2JxSbD1U2PsBU0-Sg5t0=/400x250/filters:no_upscale():max_bytes(150000):strip_icc()/Primary-Image-best-online-peer-counseling-6951613-4a9bd11dcd2a4b4e9f5fe85578cf60ec.jpg'
                    title='Encuentros y Charlas Presenciales y virtuales'
                    price='Aporte voluntario'
                    onClick={() => setOpenModal('6')}
                />
            </div>

        </div>
    </div>
}