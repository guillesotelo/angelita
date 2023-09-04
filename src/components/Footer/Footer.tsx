import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../AppContext';
import { TEXT } from '../../constants/lang';

type Props = {}

export default function Footer({ }: Props) {
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    const scrollToSection = (section: string, service?: number) => {
        setTimeout(() => {
            const element = document.getElementById(section)
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
            else window.location.href = `/${section ? '?sectionId=' + section : ''}${section && service ? '&service=' + service : ''}`
        }, 50)
    }
    return (
        <div className="footer__container">
            <div className="footer__nav">
                <h4 className="footer__nav-link" onClick={() => scrollToSection('sobre-mi')}>{TEXT[lang]['about2']}</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/politicas-de-privacidad')}>{isMobile ? TEXT[lang]['privacy'] : TEXT[lang]['privacy_policy']}</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/contacto')}>Contacto</h4>
            </div>
            <div className="footer__info">
                <h4 className="footer__copyright">{isMobile ? '© 2023' : 'Copyright © 2023'}</h4>
            </div>
        </div>
    )
}