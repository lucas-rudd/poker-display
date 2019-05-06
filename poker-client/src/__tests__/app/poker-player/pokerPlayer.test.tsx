import React from 'react';
import renderer from 'react-test-renderer';
import { PokerPlayer } from '../../../app/leaderboard';

it('renders without crashing', () => {
    const tree = renderer.create(<PokerPlayer id={0} firstName="firstName" lastName="lastName" winnings={0} image="base64EncodedImage" country="us"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


it('renders PokerPlayer with K winnings', () => {
    const tree = renderer.create(<PokerPlayer id={0} firstName="firstName" lastName="lastName" winnings={1000} image="base64EncodedImage" country="us"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders PokerPlayer with M winnings', () => {
    const tree = renderer.create(<PokerPlayer id={0} firstName="firstName" lastName="lastName" winnings={1000000} image="base64EncodedImage" country="us"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders PokerPlayer with B winnings', () => {
    const tree = renderer.create(<PokerPlayer id={0} firstName="firstName" lastName="lastName" winnings={1000000000} image="base64EncodedImage" country="us"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders PokerPlayer when no image winnings', () => {
    const tree = renderer.create(<PokerPlayer id={0} firstName="firstName" lastName="lastName" winnings={1000} image="base64EncodedImage" country=""/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
