import React from 'react'
import CheckoutComponent from './_components/checkout'
import { Metadata } from 'next'
import { getSession } from '@lib/session'
export const metadata: Metadata = {
    title: "Checkout"
}

async function CheckoutPage() {
    const session = await getSession();


    return (
        <CheckoutComponent session={session} />
    )
}

export default CheckoutPage