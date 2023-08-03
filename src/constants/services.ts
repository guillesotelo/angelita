export const SERVICES: { [key: number | string]: any } = {
    11: {
        name: 'Mente Divina',
        price: 15,
        currency: 'usd',
        type: 'group',
        duration: 1,
        mark: 'hour',
        day: 'Martes',
        time: '16hs (Berlin)',
        fixedTime: true,
        imageUrl: 'https://i.postimg.cc/SK8qSMvF/image14.jpg'
    },
    12: {
        name: 'Pedacito de Cielo',
        price: 0,
        currency: 'usd',
        type: 'group',
        duration: 1,
        mark: 'hour',
        day: 'Miércoles',
        time: '16hs (Berlin)',
        fixedTime: true,
        imageUrl: 'https://i.postimg.cc/SK8qSMvF/image14.jpg',
        isEvent: true
    },
    13: {
        name: 'Formación Psicológica',
        price: 50,
        currency: 'usd',
        type: 'group',
        duration: 4,
        mark: 'hour',
        day: '1er sábado del mes',
        time: '16hs (Berlin)',
        fixedTime: true,
        imageUrl: 'https://i.postimg.cc/SK8qSMvF/image14.jpg',
        isEvent: true
    },
    31: {
        name: 'Consejería',
        price: 50,
        currency: 'usd',
        type: 'group',
        duration: 1,
        mark: 'hour',
        day: 'Lunes a sábados',
        time: '11-19hs (Berlin)',
        discount: '>2=70%',
        fixedTime: false,
        startTime: 11,
        endTime: 19,
        imageUrl: 'https://i.postimg.cc/SxRCvytz/image9.jpg'
    },
    32: {
        name: 'Psicoterapia',
        price: 50,
        currency: 'usd',
        type: 'group',
        duration: 1,
        mark: 'hour',
        day: 'Lunes a sábados',
        time: '11-19hs (Berlin)',
        discount: '>2=70%',
        fixedTime: false,
        startTime: 11,
        endTime: 19,
        imageUrl: 'https://i.postimg.cc/SxRCvytz/image9.jpg'
    },
    1: {
        name: 'Encuentros Grupales',
    },
    2: {
        name: 'Psicoterapia Grupal',
        price: 25,
        currency: 'usd',
        type: 'group',
        duration: 1,
        mark: 'hour',
        day: 'Jueves y sábados',
        time: '16hs (Berlin)',
        fixedTime: true,
        imageUrl: 'https://i.postimg.cc/9XvfhcM7/image42.jpg'
    },
    3: {
        name: 'Psicoterapia Privada',
    }
}