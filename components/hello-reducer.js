const initialState = {
    item: 'hello redux'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            return { ...state, item: action.item };
        default:
            return state;
    }
};
