import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Discounts({ }: Props) {
    const { lang, isMobile } = useContext(AppContext)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <div className="page__container" style={{ width: !isMobile ? '50%' : '' }}>
            <h1 className="page__title">Casos de Insolvencia</h1>
            <p className="page__text">
                Hay ocasiones en las cuales NO puede costearse el valor total de la asesoría psicoterapéutica debido a la precariedad económica, y en este caso el precio de la sesión puede ser acordado temporalmente y en ningún caso será un impedimento para recibir la ayuda profesional que pueda necesitar.
                <br />
                <br />
                Si ese es tu caso, déjame saber con confianza, poniéndote en <a href='https://angelita.vercel.app/contacto'>contacto</a> conmigo por teléfono o mail.
            </p>
        </div>
    )
}