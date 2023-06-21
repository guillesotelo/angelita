import { useEffect, useState } from "react"

import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm"
import { loadStripe, Stripe } from "@stripe/stripe-js"
import { createPayment, getPublicKey } from "../../services"

function Payment() {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
    const [clientSecret, setClientSecret] = useState("")

    console.log('stripePromise', stripePromise)
    console.log('clientSecret', clientSecret)

    useEffect(() => {
        getStripePublicKey()
        createPaymentIntent()
    }, [])

    const getStripePublicKey = async () => {
        try {
            await getPublicKey().then(data => {
                if (data && data.key) setStripePromise(loadStripe(data.key))
            })
        } catch {
            return ''
        }
    }

    const createPaymentIntent = async () => {
        try {
            await createPayment({}).then(data => {
                if (data && data.secret) setClientSecret(data.secret)
            })
        } catch {
            return ''
        }
    }

    return (
        <div className="payment__container">
            <h2 className="service-template__title">Checkout</h2>
            {clientSecret && stripePromise ?
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm />
                </Elements>
                :
                <h4 className="service-template__prices">Cargando medios de pago...</h4>
            }
        </div>
    )
}

export default Payment
