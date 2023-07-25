import React, { SyntheticEvent, useEffect, useState } from 'react'
import { dataObj } from '../../types'

type Props = {
    label: string
    options: any[]
    value: string | number
    objKey?: string | number
    selected: any
    setSelected: (value: any) => void
    isTime?: boolean
    isDate?: boolean
    locale?: string
    maxHeight?:string
}

export default function Dropdown(props: Props) {
    const [openDrop, setOpenDrop] = useState(false)

    const {
        label,
        selected,
        setSelected,
        options,
        value,
        objKey,
        isTime,
        isDate,
        locale,
        maxHeight
    } = props

    useEffect(() => {
        window.addEventListener('mouseup', (e: MouseEvent) => {
            if (e.target && (e.target as HTMLElement).className) {
                if ((e.target as HTMLElement).className !== 'dropdown__option') setOpenDrop(false)
            } else setOpenDrop(false)
        })
    }, [])

    const getSelectValue = () => {
        if (value) {
            if (isDate) return value ? new Date(value).toLocaleDateString(locale || 'en-US') : 'Select'
            if (isTime) return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            else return value
        }
        return objKey && selected[objKey] ? selected[objKey] : 'Selecciona'
    }

    const renderSelectedItem = () => {
        return <div
            className='dropdown__select'
            style={{ border: openDrop ? '1px solid #EBAA59' : '1px solid lightgray' }}
            onClick={() => setOpenDrop(!openDrop)}>
            <h4 className='dropdown__selected'>
                {getSelectValue()}
            </h4>
            < h4 className='dropdown__selected'>▾</h4>
        </div>
    }

    const renderDropDownOptions = () => {
        return <div
            className='dropdown__options'
            style={{ borderTop: 'none', maxHeight: maxHeight || '' }}>
            {options.length ?
                options.map((option: any, i: number) =>
                    <h4
                        key={i}
                        className='dropdown__option'
                        style={{ marginTop: i === 0 ? '.7rem' : 0 }}
                        onClick={() => {
                            setSelected(option)
                            setOpenDrop(false)
                        }}>
                        {isDate ? new Date(option).toLocaleDateString(locale || 'en-US') :
                            isTime ? new Date(option).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                                objKey ? option[objKey] : option}
                    </h4>)
                :
                <h4 className='dropdown__option' style={{ borderTop: 'none' }}>Cargando...</h4>
            }
        </div>
    }

    return (
        <div className='dropdown__container'>
            {label ? <h4 className='dropdown__label'>{label}</h4> : ''}
            <div className='dropdown__select-section'>
                {renderSelectedItem()}
                {openDrop ? renderDropDownOptions() : ''}
            </div>
        </div >
    )
}
