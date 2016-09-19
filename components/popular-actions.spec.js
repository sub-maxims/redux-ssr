import tapeTest from 'tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

function preparePopularActions(mockGetItems = {}) {
    return proxyquire('./popular-actions', {
        './popular-api': mockGetItems
    }).getItemsAction;
}

tapeTest.test('getItemsAction', (suite) => {

    suite.test('- should return a function for use with the thunk middleware', (assert) => {
        const getItemsAction = preparePopularActions();

        assert.equals(
            typeof getItemsAction(),
            'function',
            'getItemsAction should return a function'
        );
        assert.end();
    });

    suite.test('- getItems should be called', (assert) => {
        const mockGetItems = {
            getItems: sinon.stub().returns({
                then: () => {}
            })
        };
        const fetchPopularItems = preparePopularActions(mockGetItems);
        const fetching = fetchPopularItems();
        const dispatch = sinon.spy();

        fetching(dispatch);
        assert.ok(mockGetItems.getItems.called, 'getItems should be called');
        assert.end();
    });

    suite.test('- an action should be dispatched', (assert) => {
        const mockResult = 'test';
        const mockGetItems = {
            getItems: sinon.stub().returns(Promise.resolve(mockResult))
        };
        const fetchPopularItems = preparePopularActions(mockGetItems);
        const fetching = fetchPopularItems();
        const dispatch = sinon.spy();
        
        fetching(dispatch).then(() => {
            assert.ok(dispatch.calledWith({
                type: 'GET_ITEMS_SUCCESS',
                items: mockResult
            }), 'the action-object should contain the mockresult and the correct type');
        });
        assert.end();
    });
});