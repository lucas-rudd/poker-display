import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import CountryData from 'country-data'
import { PokerPlayerName } from './styles';

const hasCountry = (country) => {
    return CountryData.countries.hasOwnProperty(country);
}

export const PokerPlayer: React.FC<{id, firstName, lastName, winnings, image, country}> = ({ firstName, lastName, winnings, image, country='' }) => {
    const countryCode = country.toUpperCase();
    return (
        <React.Fragment>
            <th scope="row">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img height='48px' width='48px' src={image || `${process.env.PUBLIC_URL}/no_image_available.png`}/>
                    <PokerPlayerName>{firstName} {lastName}</PokerPlayerName>
                </div>
            </th>
            <td>{winnings}</td>
            <td>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontSize: '150%'}}>
                          {hasCountry(country) ? CountryData.countries[countryCode].emoji : '' }
                    </span>
                    <div style={{paddingLeft: '10px'}}>
                        {hasCountry(country) ? CountryData.countries[countryCode].name : ''}
                    </div>
                </div>

            </td>
        </React.Fragment>
    )
}