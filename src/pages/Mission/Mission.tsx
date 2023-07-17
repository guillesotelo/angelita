import React from 'react'

type Props = {}

export default function Mission({ }: Props) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return (
    <div className="page__container">
      <h1 className="page__title">Misión General</h1>
      <p className="page__text">
        Quiero promover una PSICOLOGÍA AFECTUOSA y DIVERGENTE, cercana, de igual a igual, asequible en todos los sentidos, donde podamos, consultante y  terapeuta, sanar y expandirnos a través de la experiencia del ser libre. Con la práctica de la psicología afectuosa, el sufrimiento, la incomprensión, el dolor y la enfermedad son solo excusas para encontrarse el uno en el otro y trascenderlo juntos. A través del pensamiento divergente, saldremos del tipo de pensamiento lógico-lineal de  la psicología popular de  “casa” o de “a pie”; aprenderemos a darle la vuelta a todo pensamiento que causa algún tipo de deterioro, dolor, adicción o sufrimiento.
        Para ello, encuentro muy apropiado promover la PSICOTERAPIA GRUPAL,  ya que ella funciona como un medio sinérgico y  altamente EFICIENTE en cuanto a sanidad psicológica se refiere, a la vez que  ahorra recursos, energía, tiempo, dinero y se pasa muy bien.
      </p>
      <br></br>
      <ul>
        <li>Todo lo verdaderamente bueno que quiero para el otro, lo quiero para mi y viceversa.</li>
        <li>Quiero disfrutar mi ser, experimentar el cambio en la manera de pensar, dedicar tiempo a reflexionar y a decantar lo que he comprendido, permitir mi propia transformación y verme libre del peso de la distorsión y el condicionamiento.</li>
        <li>Quiero disfrutar mi labor, mi vocación y mi propósito, sin hacer de ella un nicho donde escapar de la verdad.</li>
        <li>Quiero experimentar un cambio de valores y soltar las resistencias frente a asuntos que creo importantes y valiosos pero son simples arbitrariedades.</li>
        <li>Quiero encontrar la manera de dignificar la profesión y a quienes consultan.</li>
        <li>Quiero ubicar mi servicio profesional y comprometido  dentro de una franja de precio asequible y no hacer de mi servicio algo excluyente en un momento en la historia donde las personas experimentan diversos síntomas de alteración, trastorno y enfermedad mental.</li>
      </ul>
    </div>
  )
}