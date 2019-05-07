import CountryData from 'country-data'

export const withHasCountry = ({ country }) => {
    return {
        hasCountry: country !== '' && CountryData.countries.hasOwnProperty(country)
    }
}