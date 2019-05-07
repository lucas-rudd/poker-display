import axios from 'axios';

const pokerPlayersBaseUrl = process.env.REACT_APP_POKER_PLAYERS_BASE_ENDPOINT;
const getPokerPlayersPath = process.env.REACT_APP_GET_POKER_PLAYERS_PATH;

export const withFetchPokerPlayers = async (params?: { sortField: string, order: string}) => {
    const pokerPlayers = await axios.get(`${pokerPlayersBaseUrl}${getPokerPlayersPath}`, {
        params
    });
    return pokerPlayers.data;
}