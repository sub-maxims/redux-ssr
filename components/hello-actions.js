import { getItems } from './hello-api';

const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';

function getItemsSuccessAction(data) {
    return {
        type: GET_ITEMS_SUCCESS,
        items: data
    };
};

export const getItemsAction = () => (dispatch) => {
    getItems().then(items => dispatch(getItemsSuccessAction(items)));
};