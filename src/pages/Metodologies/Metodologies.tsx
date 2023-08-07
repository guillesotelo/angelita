import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Metodologies({ }: Props) {
    const { lang, isMobile } = useContext(AppContext)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    return (
        <div className="page__container" style={{ padding: !isMobile ? '.5rem 25rem' : '' }}>
            <h1 className="page__title">Metodología en Sesión</h1>
            <p className="page__text">
                <strong>Afecto - Formación – Reflexión - Interactividad – Práctica</strong>
            </p>
            <p className="page__text">
                Esta terapéutica procura el cambio a nivel metacognitivo (más allá de la cognición: la causa en el pensamiento y la experiencia más allá de todo conocimiento) y no se enfoca en los efectos. Los efectos irán desapareciendo naturalmente, una vez se haya precisado el nuevo paradigma y su sistema de valores.
                <br />
                <br />
                Cuando tengas clara la prioridad, la decisión será muy sencilla y en cualquier caso no habrá juicio de por medio sino comprensión.
            </p>
            <p className="page__text">
                <strong>Afecto:</strong> Todo acompañamiento y asistencia que ofrezco al consultante se gestiona a través de la comprensión libre de juicio y opinión; desde la igualdad y unidad como seres humanos. Acompaño, capacito, afirmo, centro y contengo al paciente, en tanto integra, aprende y ejercita de manera natural y espontánea el nuevo paradigma que se le propone.
            </p>
            <p className="page__text">
                <strong>Formación Psicológica:</strong> A través del marco de referencia transpersonal el consultante descubre y abraza su identidad esencial, reconocerá la única causa del problema, que consiste en la libre elección inconsciente de creencias y pensamientos distorsionados acerca de quién es el mismo y que vez tras vez le ocasionan inquietud, temor, sufrimiento, dolor, adicción, apego, etc.
                Al entrenarse en los mecanismos para reconocer y disolver la causa, las experiencias presentes y futuras estarán bajo la consciente capacidad de elegir y controlar y de esta manera, no ser arrastrado por fuerzas externas, vacías y carentes de poder.
            </p>
            <p className="page__text">
                <strong>Reflexión:</strong> La agitación, el agotamiento y la somatización, ocurren por la elección del pensamiento que momento a momento el consultante más valora, para ello el trabajo reflexivo y de reconocimiento de esos pensamientos que desencadenan manifestaciones emocionales y experiencias negativas, es clave.
                Al cambiar el deseo, la valoración y la manera de pensar (virtuosa), indefectiblemente afectará la experiencia somática que en primera instancia evitará el secuestro emocional dominante por inercia y de esta forma se abre el camino a una nueva y expansiva experiencia relacional.
            </p>
            <p className="page__text">
                <strong>Interactividad:</strong> A través del compromiso y honestidad con el propio proceso, el consultante podrá ejecutar registros y tareas que resultan muy provechosas para interactuar propositivamente en la siguiente sesión con preguntas y respuestas, para así avanzar en el descubrimiento y comprensión de la fuerza, sabiduría y poder interior del que dispone y a elegirlo sistemáticamente a voluntad.
            </p>

            <p className="page__text">
                <strong>Técnicas y Prácticas:</strong> Al reconocer los EFECTOS cotidianos de la causa del problema, el consultante podrá hacer uso de prácticas terapéuticas, trucos y rituales muy sencillos que codificarán y afianzarán una nueva ruta de respuesta neuronal y decodificar las viejas memorias con sus improntas emocionales asociadas a ellas en el cerebro, de manera que, aquellas reacciones emocionales, sentimientos, actitudes, conductas y formas de relacionarse inconscientes  y destructivas se debiliten tanto como quiera.
            </p>
            <br />
            <br />
            <table>
                <tr>
                    <th>META TERAPÉUTICA</th>
                    <th>OBJETIVOS TERAPÉUTICOS</th>
                </tr>
                <tr>
                    <td>
                        <ul>
                            <li>Reconocimiento de la identidad o núcleo  esencial no dual</li>
                            <br />
                            <li>Reconocimiento de la neurosis y su profundidad (alteración, trastorno o enfermedad mental, debida al contenido egóico)</li>
                            <br />
                            <li>Reconocimiento y aplicación del perdón como herramienta única de liberación de la neurosis (atasco o enfrascamiento psicológico)</li>
                            <br />
                            <li>Resolución del conflicto inter e intra personal</li>
                            <br />
                            <li>Recuperación de la Fuerza de Voluntad</li>
                            <br />
                            <li>Empoderamiento para elegir la nueva ruta mental</li>
                            <br />
                            <li>Paz y contentamiento mental a voluntad, sin depender de causas externas.</li>
                            <br />
                            <li>Responsabilidad - Afrontamiento – Resiliencia</li>
                            <br />
                            <li>Autonomía y empoderamiento</li>
                            <br />
                            <li>Interdependencia</li>
                            <br />
                            <li>Relaciones y experiencias solventes, dignas y gratificantes</li>
                            <br />
                            <li>Bio-descodificación, Codificación y Regulación Emocional</li>
                            <br />
                            <li>Respuesta Autógena de Calma: sosiego y serenidad a voluntad</li>
                            <br />
                            <li>Respuesta Autógena de Calma: sosiego y serenidad a voluntad</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>Que el terapeuta y el consultante crezcan y sanen juntos a través de la experiencia de encontrarse el uno en el otro.</li>
                            <br />
                            <li>Que el terapeuta y el consultante se hallen portadores de libertad, gozo y paz y desde ese estado contribuyan en sus relaciones intrapersonales, interpersonales y a su comunidad.</li>
                            <br />
                            <li>Que el terapeuta y el consultante inviertan en la PERSONA CREATIVA  que son y no en el PERSONAJE - GUIÓN  QUE SE HAN FABRICADO.</li>
                            <br />
                            <li>Que el terapeuta y el consultante vayan directo a la CAUSA ERRÓNEA INCONSCIENTE en lugar de corregir los  EFECTOS.</li>
                            <br />
                            <li>Que el terapeuta y consultante descubran y abracen su Identidad Esencial, su  Potencial Interior, aquí y ahora, en lugar de recurrir a sus sombras y al análisis de  su condicionamiento pasado.</li>
                            <br />
                            <li>Observar desde la Identidad Esencial los efectos de  creencias distorsionadas acerca de ti, en forma de sentimientos, actitudes, conductas, relaciones y experiencias.</li>
                            <br />
                            <li>No perder tiempo analizando las memorias del pasado: creencias y dinámicas de relacionamiento, que refuerzan el personaje.</li>
                            <br />
                            <li>No perder tiempo tratando de modificar, condicionar, coaccionar o manipular la conducta propia o ajena, actitudes y sentimientos, que refuerzan el personaje.</li>
                            <br />
                            <li>No perder tiempo ni energía tratando de mejorar o ser alguien a nivel conductual, reforzando el personaje.</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    )
}