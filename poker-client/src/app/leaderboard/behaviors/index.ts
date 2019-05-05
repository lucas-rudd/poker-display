import { withFetchPokerPlayers } from './withFetchPokerPlayers';
import { compose, lifecycle, withProps } from 'recompose';

const formatWinnings = (winnings) => {
    if(winnings >= 1000000000) {
        return `$${winnings / 1000000000}B`;
    }
    if(winnings >= 1000000) {
        return `$${winnings / 1000000}M`;
    }
    if(winnings >= 1000) {
        return `$${winnings / 1000}K`
    }
    return `${winnings}`
}

export const enhance = compose(
    withProps({
        pokerPlayers: [],
        fetching: false,
        error: {}
    }),
    lifecycle({
        componentWillMount() {
            this.setState({ fetching: true });
            withFetchPokerPlayers({ order: 'desc', sortField: 'winnings'}).then(pokerPlayers => {
                this.setState({ fetching: false});
                this.setState({ pokerPlayers });
            }).catch((error) => {
                this.setState({fetching: false});
                this.setState({ error })
            })
        },
        componentWillUpdate(_, nextState) {
            if(nextState.pokerPlayers) {
                nextState.pokerPlayers = nextState.pokerPlayers.map(({winnings, ...rest}) => {
                    return { winnings: formatWinnings(winnings), ...rest }
                })
            }
        }
    })
)