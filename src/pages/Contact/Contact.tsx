import React, { useContext, useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import { sendContactEmail } from '../../services'
import { toast } from 'react-hot-toast'

type Props = {}

export default function Contact({ }: Props) {
    const [data, setData] = useState({ email: '', name: '', message: '' })
    const [messageSent, setMessageSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const { lang, setLang, isMobile } = useContext(AppContext)

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const sendEmail = async () => {
        try {
            setLoading(true)
            const sent = await sendContactEmail(data)
            if (sent && sent.message) setMessageSent(true)
            else toast.error('Ocurrió un error. Inténtalo nuevamente')
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    return messageSent ?
        <div className="contact__container" style={{ textAlign: 'center' }}>
            <h1 className="contact__title" > {TEXT[lang]['thank_you_msg']}</h1>
            <h4 className="contact__text">{TEXT[lang]['will_respond']}</h4>
        </div >
        :
        <div className="contact__container">
            <div className="contact__row-container">
                <div className="contact__info">
                    <h1>{TEXT[lang]['contact_me']}</h1>
                    <h3>{TEXT[lang]['have_a_question']}</h3>
                    <br /> <br /> <br /> <br />
                    <p>
                        {TEXT[lang]['submit_policy']}
                    </p>
                </div>
                <div className="contact__box">
                    <InputField
                        name='name'
                        updateData={updateData}
                        placeholder={TEXT[lang]['your_name']}
                        type='text'
                    />
                    <InputField
                        name='email'
                        updateData={updateData}
                        placeholder={TEXT[lang]['your_email']}
                        type='email'
                    />
                    <InputField
                        name='message'
                        updateData={updateData}
                        placeholder={TEXT[lang]['your_message']}
                        type='textarea'
                        rows={7}
                    />
                    <Button
                        label={TEXT[lang]['sent']}
                        handleClick={sendEmail}
                        disabled={loading || !data.email || !data.name || !data.message}
                        style={{ alignSelf: 'center' }}
                    />
                </div>
            </div>
        </div>
}

