import React from 'react';
import renderer from 'react-test-renderer';
import { PokerPlayerContainer } from '../../../../app/leaderboard';

const pokerPlayers = [{
    firstName: 'firstName',
    lastName: 'lastName',
    winnings: 100,
    image: 'base64EncodedImage',
    country: 'us'
}];

it('renders without crashing', () => {
    const tree = renderer.create(<PokerPlayerContainer fetching={true} error={{}} pokerPlayers={[]} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


it('renders table when pokerPlayer data and not fetching', () => {
    const tree = renderer.create(<PokerPlayerContainer fetching={false} error={{}} pokerPlayers={pokerPlayers} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})