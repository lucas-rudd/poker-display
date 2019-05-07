import React from 'react';
import CountryData from 'country-data'
import { PokerPlayerName, FormattedTableRow } from './styles';
import { enhance } from "./behaviors";

export const PokerPlayerView: React.FC<{id, firstName, lastName, winnings, image, country, hasCountry}> = ({ firstName, lastName, winnings, image, country='', hasCountry = false }) => {
    return (
        <React.Fragment>
            <th scope="row">
                <FormattedTableRow>
                    <img height='48px' width='48px' src={image || `${process.env.PUBLIC_URL}/no_image_available.png`}/>
                    <PokerPlayerName>{firstName} {lastName}</PokerPlayerName>
                </FormattedTableRow>
            </th>
            <td>{winnings}</td>
            <td>
                { hasCountry ?
                    (<FormattedTableRow>
                        <span style={{fontSize: '150%'}}>
                            {CountryData.countries[country].emoji}
                        </span>
                        <div style={{paddingLeft: '10px'}}>
                            {CountryData.countries[country].name}
                        </div>
                    </FormattedTableRow>)
                    :
                    (<FormattedTableRow>
                        Country Not Available
                    </FormattedTableRow>)
                }
            </td>
        </React.Fragment>
    )
};

export const PokerPlayer = enhance(PokerPlayerView)