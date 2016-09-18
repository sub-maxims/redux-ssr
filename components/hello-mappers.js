import { getItemsAction } from './hello-actions';

export const mapStateToProps = (state) => ({ hello: state.items });

export const mapDispatchToProps = (dispatch) => ({
    fetchItems: () => {
        dispatch(getItemsAction());
    }
});