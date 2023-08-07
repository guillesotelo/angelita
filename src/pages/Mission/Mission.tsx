import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Mission({ }: Props) {
  const { lang, isMobile } = useContext(AppContext)
  window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="page__container"  style={{ width: !isMobile ? '50%' : '' }}>
      <h1 className="page__title">Con una Misión</h1>
      <p className="page__text">
        Quiero promover una psicología afectuosa, cercana, de igual a igual, asequible en todos los sentidos, donde podamos, consultante y terapeuta, sanar y expandirnos a través de la experiencia del ser libre.
        <br /><br />
        Con esta práctica nos encontraremos el uno en el otro para trascender toda forma de alteración psicológica (sufrimiento, incomprensión, dolor, adicción, enfermedad, etc).
        <br /><br />
        A través del pensamiento divergente, saldremos del tipo de pensamiento lógico-lineal de la psicología popular. Aprenderemos a darle la vuelta a todo pensamiento que causa algún tipo de alteración en la conducta.
        <br /><br />
        <strong>Como persona quiero:</strong>
        <br />
        Todo lo verdaderamente bueno que quiero para el otro, lo quiero para mi.
        <br />
        Disfrutar mi ser, experimentar el cambio en la manera de pensar, dedicar tiempo a reflexionar y a decantar lo que he comprendido.
        <br />
        Permitir mi propia transformación y verme libre del peso de la distorsión y el condicionamiento.
        <br />
        Experimentar un cambio de valores y soltar las resistencias frente a asuntos que creo importantes y valiosos pero son simples arbitrariedades.
        <br /><br />
        <strong>Como profesional quiero:</strong>
        <br />
        Disfrutar mi labor, mi vocación y mi propósito, sin hacer de ella un nicho donde escapar de la verdad.
        <br />
        Encontrar la manera de dignificar la profesión y a quienes consultan.
        <br />
        Ubicar mi servicio profesional y comprometido dentro de una franja de precio asequible y no hacer de mi servicio algo excluyente en un momento en la historia donde las personas cada vez más experimentan fuertes síntomas de alteración, trastorno y enfermedad mental.
      </p>
    </div>
  )
}