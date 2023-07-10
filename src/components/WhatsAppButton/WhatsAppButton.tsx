import React from 'react'
import WhatsAppIcon from '../../assets/icons/whatsapp.svg'

type Props = {
    phoneNumber: number
    message?: string
}

export default function WhatsAppButton({ phoneNumber, message }: Props) {

    const parseMessage = (msg: string) => {
        if (msg) return encodeURIComponent(msg)
        return msg
    }

    return (
        <div className='whatsapp-btn__container'>
            <a
                aria-label="Chat on WhatsApp"
                href={`https://wa.me/${phoneNumber}?text=${parseMessage(message || '')}`}
                target="_blank"
                className='whatsapp-btn__link'>
                <img alt="Chat on WhatsApp" src={WhatsAppIcon} className='whatsapp-btn__image' />
            </a>
        </div>
    )
}