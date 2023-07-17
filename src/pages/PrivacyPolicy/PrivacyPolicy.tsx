import React, { useContext } from 'react'
import { TEXT } from '../../constants/lang'
import { AppContext } from '../../AppContext'

type Props = {}

export default function PrivacyPolicy({ }: Props) {
    const { lang, isMobile } = useContext(AppContext)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return (
        <div className="privacy__container" dangerouslySetInnerHTML={{ __html: TEXT[lang]['privacy_policies'] }}/>
    )
}