export type dataObj = { [key: string | number]: any }

export type calendarType = { [key: string | number]: boolean }

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type eventType = {
    _id?: string
    name?: string
    participants?: number
    start?: Date
    end?: Date
    isVirtual?: boolean
    imageUrl?: string
    dateObject?: string
    serviceId?: string
    price?: number
    currency?: string
    discount?: string
    description?: string
    date?: string
    endTime?: string | null
    duration?: number | string
    link?: string
    linkPassword?: string
    otherData?: string
    removed?: boolean,
    service?: serviceType
    maxPax?: string
    createdAt?: Date
    updatedAt?: Date
}

export type bookingType = {
    _id?: string
    id?: string
    title?: string
    start?: Date
    end?: Date
    serviceId?: string
    name?: string
    price?: number
    currency?: string
    discount?: string
    type?: string
    duration?: number
    mark?: string
    day?: string
    time?: string
    username?: string
    email?: string
    country?: string
    phone?: string
    quantity?: number
    realQty?: number
    realPrice?: string
    priceInCents?: number
    image?: string
    imageUrl?: string
    description?: string
    date?: string
    dateObject?: string
    dateObjects?: string
    selectedTime?: string
    isPaid?: boolean
    fixedTime?: boolean
    startTime?: number
    endTime?: number
    isEvent?: boolean
    eventId?: string
    otherData?: string
    removed?: boolean
    sendEmail?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export type serviceType = {
    _id?: string
    name?: string
    price?: number
    currency?: string
    discount?: string
    type?: string
    duration?: number
    mark?: string
    day?: string
    time?: string
    image?: string
    imageUrl?: string
    description?: string
    serviceId?: string
    date?: string
    dateObject?: string
    dateObjects?: string
    fixedTime?: boolean
    startTime?: number
    endTime?: number
    isEvent?: boolean
    link?: string
    linkPassword?: string
    otherData?: string
    removed?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export type orderType = {
    _id?: string
    serviceId?: string
    name?: string
    price?: number
    currency?: string
    discount?: string
    type?: string
    duration?: number
    mark?: string
    day?: string
    time?: string
    username?: string
    email?: string
    country?: string
    phone?: string
    quantity?: number
    realQty?: number
    realPrice?: string
    priceInCents?: number
    image?: string
    imageUrl?: string
    description?: string
    date?: string
    dateObject?: string
    dateObjects?: string
    selectedTime?: string
    isPaid?: boolean
    fixedTime?: boolean
    startTime?: number
    endTime?: number
    isEvent?: boolean
    eventId?: string
    otherData?: string
    removed?: boolean
    rawData?: serviceType
    selectedDates?: Date[] | string[]
    checkout?: string
    items?: orderType[]
    locale?: string
    payment_intent?: string | null
    payment_intent_client_secret?: string | null
    redirect_status?: string | null
    createdAt?: Date
    updatedAt?: Date
}

export type contactType = {
    email?: string
    name?: string
    message?: string
}