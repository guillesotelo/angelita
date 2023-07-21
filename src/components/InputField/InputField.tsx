import React, { SyntheticEvent } from 'react'

type Props = {
    name: string
    updateData: (name: string, e: SyntheticEvent) => void
    className?: string
    type?: string
    label?: string
    placeholder?: string
    value?: string | number
    cols?: number
    rows?: number
}

export default function InputField({ value, name, label, updateData, className, type, placeholder, cols, rows }: Props) {
    return type === 'textarea' ?
        <div className="inputfield__container">
            <textarea
                className={className || 'textarea__default'}
                placeholder={placeholder || ''}
                onChange={e => updateData(name, e)}
                value={value}
                cols={cols}
                rows={rows}
            />
        </div>
        :
        <div className="inputfield__container">
            {label ? <h2 className="inputfield__label">{label}</h2> : ''}
            <input
                type={type || 'text'}
                className={className || 'inputfield__default'}
                placeholder={placeholder || ''}
                onChange={e => updateData(name, e)}
                value={value}
            />
        </div>
}