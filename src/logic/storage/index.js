export const saveGameToLocalStorage = ({ board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', JSON.stringify(turn));
}

export const resetGameToLocalStorages = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn'); 
}