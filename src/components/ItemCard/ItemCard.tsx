import React from 'react'

type Props = {
    image?: string
    title?: string
    price?: string
    details?: string
    onClick: () => void
    style?: React.CSSProperties
    className?: string
}

export default function ItemCard({ image, title, details, price, onClick, style, className }: Props) {
    return (
        <div className={`item-card__container ${className || ''}`} onClick={onClick} style={style}>
            <div className="item-card__image-wrapper">
                <img src={image} alt="" className="item-card__image" />
            </div>
            <div className="item-card__info">
                <h4 className="item-card__title">{title}</h4>
                <h4 className="item-card__details">{details}</h4>
                <h4 className="item-card__price">{price}</h4>
            </div>
            <button className="item-card__btn">Ver más</button>
        </div>
    )
}