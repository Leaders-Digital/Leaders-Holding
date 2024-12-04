import React from 'react'
import Link from 'next/link'

const Support = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section className="wpo-support-section">
            <div className="container">
                <div className="wpo-support-wrapper">
                    <div className="wpo-support-text">
                        <h2>Vous Avez une Question Différente ?</h2>
                        <p>Veuillez soumettre une demande via notre support dédié. C'est un excellent endroit pour apprendre, partager et résoudre des problèmes. Commencez dès maintenant.</p>
                    </div>
                    <div className="wpo-support-btn">
                        <Link onClick={ClickHandler} href="/contact">Soumettre une Demande de Support</Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Support;