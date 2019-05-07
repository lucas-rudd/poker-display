import { withFormatWinnings } from './withFormatWinnings';
import { withFormatCountry } from "./withFormatCountry";
import { withHasCountry } from "./withHasCountry";
import { compose, mapProps, withProps } from 'recompose';

export const enhance = compose(
    mapProps(withFormatWinnings, withFormatCountry),
    withProps(withHasCountry)
);