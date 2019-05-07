import { withFetchPokerPlayers } from './withFetchPokerPlayers';
import { compose, lifecycle, withProps } from 'recompose';

export const enhance = compose(
    withProps({
        pokerPlayers: [],
        fetching: false,
        error: {}
    }),
    lifecycle({
        componentWillMount() {
            this.setState({ fetching: true });
            withFetchPokerPlayers({ order: 'desc', sortField: 'winnings'})
                .then(pokerPlayers => this.setState({ pokerPlayers }))
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({fetching: false}))
        }
    })
)