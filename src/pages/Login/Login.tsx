import React, { useContext, useState } from 'react'
import { loginUser, registerUser } from '../../services'
import { toast } from 'react-hot-toast';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
import { TEXT } from '../../constants/lang';
import { AppContext } from '../../AppContext';

type Props = {}

export default function Login({ }: Props) {
    const [data, setData] = useState({ email: '', password: '' })
    const history = useHistory()
    const { lang, setLang, isMobile } = useContext(AppContext)

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const onLogin = async () => {
        const loading = toast.loading('Iniciando sesión...')
        const logged = await loginUser(data)
        if (logged) {
            toast.success(`Hola, ${logged.username ? logged.username.split(' ')[0] : 'Angelita'}!`)
            setTimeout(() => history.push('/booking'), 1000)
        } else toast.error('Error al iniciar sesión. Prueba nuevamente')

        return toast.remove(loading)
    }

    return (
        <div className="login__container">
            <div className="login__box">
                <InputField
                    name='email'
                    updateData={updateData}
                    placeholder={TEXT[lang]['email']}
                    type='email'
                />
                <InputField
                    name='password'
                    updateData={updateData}
                    placeholder={TEXT[lang]['password']}
                    type='password'
                />
                <Button
                    label={TEXT[lang]['login']}
                    handleClick={onLogin}
                    disabled={!data.email || !data.password}
                    style={{ alignSelf: 'center' }}
                />
            </div>
        </div>
    )
}