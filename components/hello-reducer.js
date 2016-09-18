const initialState = {
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITEMS_SUCCESS':
            return { ...state, items: action.items };
        default:
            return state;
    }
};
