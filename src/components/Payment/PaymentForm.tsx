import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import Button from "../Button/Button"

export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const buyCart = async () => {
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
                return_url: `${window.location.origin}`,
            },
        })

        if (error && (error.type === "card_error" || error.type === "validation_error")) {
            setMessage(error.message || 'Unknown payment error')
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsProcessing(false)
    }

    return (
        <div className="payment__form" >
            <PaymentElement id="payment-element" />
            <Button
                label={isProcessing ? "Procesando pago ..." : "Pagar ahora"}
                handleClick={buyCart}
                disabled={isProcessing || !stripe || !elements}
                style={{ alignSelf: 'center' }}
                bgColor=""
            />
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </div>
    )
}
