import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import StripeProvider from '../../stripeProvider'

const PaymentForm: React.FC = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission or show a loading indicator.
            return
        }

        // Use stripe and elements to process the payment.
        // Example: createPaymentMethod or confirmCardPayment

        // Reset the form after successful payment processing.
    }

    return (
        <StripeProvider>
            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                    <CardElement />
                </label>
                <button type="submit">Pay</button>
            </form>
        </StripeProvider>
    )
}

export default PaymentForm
