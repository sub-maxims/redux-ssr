import { getItemsAction } from './popular-actions';

export const mapStateToProps = (state) => ({ popularItems: state.items });

export const mapDispatchToProps = (dispatch) => ({
    fetchPopularResults: () => {
        dispatch(getItemsAction());
    }
});