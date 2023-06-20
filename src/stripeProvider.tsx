import React, { ReactNode } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const { REACT_APP_STRIPE_PUBLIC } = process.env

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC || '')

interface StripeProviderProps {
    children: ReactNode
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export default StripeProvider
