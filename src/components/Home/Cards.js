import React, { Fragment } from 'react'
import './Card.scss'
const CardBody = () => {


return(
    <Fragment>
        <div>
        <section>
        <h1> ¡Vivir en estrés no es lo normal!</h1>
        <div className="content">
            <p>
                El cuerpo y la mente se encuentran en estados de supervivencia la mayor parte del tiempo, lo que
                provoca niveles de cortisol muy altos (hormona que se libera como respuesta al estrés). Esto
                eventualmente genera problemas de salud como ansiedad, insomnio, enfermedades de la piel,
                caída del cabello, problemas digestivos, enojo reprimido, colitis y la lista puede seguir.
                No hay mejor medicina que la meditación; La meditación te lleva a estados de consciencia más
                elevados permitiéndote por primera vez experimentar sensaciones de bienestar, calma y armonía
                como beneficio inmediato. ¡Meditar es una experiencia única que solo tú puedes experimentar
                para saber lo que es!</p>
            <a href>Leer Más</a></div>
        <div className="img-card">
                <img src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1596538186/Healing%20love/5337ab0e693d752d240c10c858c867ba_clgt0v.jpg" />   
            </div>
        </section>
        </div>
    </Fragment>
    )
}

export default CardBody