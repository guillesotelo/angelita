import React from 'react'

type Props = {
    image: string
    title: string
    price: string
    onClick: () => void
}

export default function ItemCard({ image, title, price, onClick }: Props) {
    return (
        <div className="item-card__container" onClick={onClick}>
            <div className="item-card__image-wrapper">
                <img src={image} alt="" className="item-card__image" />
            </div>
            <div className="item-card__details">
                <h4 className="item-card__title">{title}</h4>
                <h4 className="item-card__price">{price}</h4>
            </div>
            <button className="item-card__btn">Ver más</button>
        </div>
    )
}