import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import Button from "../Button/Button"

type Props = {
    checkout?: number
}

export default function CheckoutForm({ checkout }: Props) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>('')
    const [isProcessing, setIsProcessing] = useState(false)

    const buyCart = async () => {
        localStorage.setItem('checkout', String(checkout))
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsProcessing(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/successPayment`,
            },
        })

        if (error && (error.type === "card_error" || error.type === "validation_error")) {
            setMessage(error.message || 'Ha ocurrido un error con el pago. Prueba nuevamente')
        } else {
            setMessage("Ha ocurrido un error inesperado. Prueba nuevamente.")
        }

        setIsProcessing(false)
    }

    return (
        <div className="payment__form" >
            {message && <h4 className="payment__message">{message}</h4>}
            <PaymentElement id="payment-element" />
            <Button
                label={isProcessing ? "Procesando pago ..." : "Pagar ahora"}
                handleClick={buyCart}
                disabled={isProcessing || !stripe || !elements}
                style={{ alignSelf: 'center' }}
                bgColor=""
            />
            {/* Show any error or success messages */}
        </div>
    )
}
