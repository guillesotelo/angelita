export const checkLatamAccess = async () => {
    let res = false
    await fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((data) => {
            const countryCode = data.country_code
            const southAmericanCountries = ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PE', 'PY', 'SR', 'UY', 'VE']

            if (southAmericanCountries.includes(countryCode)) res = true
        })
        .catch((error) => {
            console.error('Error getting user location:', error)
        })
    return res
}