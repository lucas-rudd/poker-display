export const withFormatCountry = ({ country, ...props}) => {
    return {
        country: country.toUpperCase(),
        ...props
    }
}