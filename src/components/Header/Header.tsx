import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Pinterest from '../../assets/icons/pinterest.svg'
import Youtube from '../../assets/icons/youtube.svg'
import Search from '../../assets/icons/search-icon.svg'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { deletePost, getAllPosts } from '../../services'
import { toast } from 'react-hot-toast'
import { APP_VERSION } from '../../constants/app'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'

type Props = {
    style?: React.CSSProperties
}

export default function Header({ style }: Props) {
    const [postId, setPostId] = useState('')
    const [prompt, setPrompt] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [searchClicked, setSearchClicked] = useState(false)
    const history = useHistory()
    const location = useLocation()
    const { lang, isMobile, setLang, search, setSearch } = useContext(AppContext)

    useEffect(() => {
        activateMenuClick()
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
        if (user && user.token && user.username) setIsAdmin(true)

        const id = new URLSearchParams(document.location.search).get('id')
        if (id) setPostId(id)
        else setPostId('')
    }, [location])

    useEffect(() => {
        const postViewr = document.querySelector<HTMLElement>('.postviewer__container')
        const postEditor = document.querySelector<HTMLElement>('.editor__container')
        if (postViewr) {
            if (deleteModal) postViewr.style.filter = 'blur(10px)'
            else postViewr.style.filter = ''
        }
        if (postEditor) {
            if (deleteModal) postEditor.style.filter = 'blur(10px)'
            else postEditor.style.filter = ''
        }
    }, [deleteModal])

    const activateMenuClick = () => {
        const menu = document.querySelector('.header__menu')
        const svg = document.querySelector('.header__menu-svg')
        const container = document.querySelector('.header__container')
        const list = document.querySelector('.home__postlist')
        const home = document.querySelector('.home__container')
        window.addEventListener('mouseup', e => {
            const clicked = e.target
            if (clicked != menu) setMenuToggle(false)
            if (clicked == svg
                || clicked == container
                || clicked == home
                || clicked == menu
                || clicked == list) {
                setSearchClicked(false)
            }
        })
    }

    const handleSearch = (e: any) => {
        const { value } = e.target
        setPrompt(value)
    }

    const triggerSearch = () => {
        setSearchClicked(true)
        if (prompt) {
            setSearchClicked(false)
            setSearch(prompt.split(' '))
            history.push('/search')
        }
    }

    const handleDeletePost = async () => {
        await toast.promise(
            deletePost({ _id: postId }),
            {
                loading: TEXT[lang]['deleting_post'],
                success: <b>Post deleted successfully. Redirecting...</b>,
                error: <b>Error deleting post</b>,
            }
        )
        setDeleteModal(false)
        setTimeout(() => history.push('/blog'), 1500)
    }

    const logOut = () => {
        localStorage.clear()
        toast.success(TEXT[lang]['see_you_later'])
        setTimeout(() => {
            setIsAdmin(false)
            setPostId('')
            history.push('/')
        }, 1500)
    }

    const changeLanguage = (language: string) => {
        setLang(language)
        localStorage.setItem('preferedLang', language)
    }

    const goHome = () => {
        if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            window.location.href = '/'
        }
    }

    return (
        <div className='header__container header--fixed' id='header__container' style={style}>
            <div className="header__logo" onClick={() => history.push('/')}>
                <h4 className="header__logo-text">ANGELITA</h4>
            </div>
            <div className="header__items">
                <div className="header__item" onClick={goHome}>
                    <h4 className="header__item-text">Inicio</h4>
                </div>
                <div className="header__item">
                    <div className="header__item-text">Terapias</div>
                    <div className="header__item-dropdown">
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Psicoterapia Peronal</h4>
                        </div>
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Psicoterapia Grupal</h4>
                        </div>
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Consejería</h4>
                        </div>
                    </div>
                </div>
                <div className="header__item">
                    <div className="header__item-text">Talleres</div>
                    <div className="header__item-dropdown">
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Taller del Mes</h4>
                        </div>
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Encuentros Personales y Virtuales</h4>
                        </div>
                    </div>
                </div>
                <div className="header__item">
                    <div className="header__item-text">Cursos</div>
                    <div className="header__item-dropdown">
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Psicología Práctica y Profunda</h4>
                        </div>
                        <div className="header__item-dropdown-row">
                            <h4 className="header__item-dropdown-text">Ver más</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}