import React from 'react';
import { PokerPlayer } from '../poker-player';
import { PokerPlayerTable, PokerPlayerTableCaption } from './styles';
import logo from '../../logo.svg';
import { enhance } from '../behaviors';

const renderPokerPlayers = (pokerPlayers) => {
    return pokerPlayers.map(({_id, firstName, lastName, image, winnings, country}) => {
        return (
            <tr className="poker-player-table-row">
                <PokerPlayer id={_id} firstName={firstName} lastName={lastName} image={image} winnings={winnings} country={country}/>
            </tr>
        );
    })
}

const PokerPlayerContainer: React.FC<{pokerPlayers, fetching?, error?}> = enhance(({fetching = false, error = {}, pokerPlayers}) => {
    const tableBody = fetching ? (<img src={logo} className="app-logo" alt="logo" />) : renderPokerPlayers(pokerPlayers);
        return (
            <div className="scroller">
                <PokerPlayerTable className="poker-player-table">
                    <PokerPlayerTableCaption>ALL-TIME TOURNAMENT EARNINGS</PokerPlayerTableCaption>
                    <thead className="poker-player-header">
                        <tr className="poker-player-table-row">
                            <th scope="col">Player</th>
                            <th scope="col">Winnings</th>
                            <th scope="col">Native Of</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </PokerPlayerTable>
            </div>
        );
    });

export const PokerPlayerLeaderboard = PokerPlayerContainer;
