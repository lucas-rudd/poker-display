export const withFormatWinnings = ({ winnings, ...props }) => {
    let formattedWinnings;
    if(winnings >= 1000000000) {
        formattedWinnings = `$${(winnings / 1000000000).toFixed(1)}B`;
    } else if(winnings >= 1000000) {
        formattedWinnings = `$${(winnings / 1000000).toFixed(1)}M`;
    } else if(winnings >= 1000) {
        formattedWinnings = `$${(winnings / 1000).toFixed(1)}K`
    } else {
        formattedWinnings = `$${winnings.toFixed(1)}`
    }
    return { winnings: formattedWinnings, ...props }
};