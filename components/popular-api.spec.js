import tapeTest from 'tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

function preparePopularApi(mockFetch) {
    return proxyquire('./popular-api', {
        'isomorphic-fetch': mockFetch
    });
}
 
tapeTest.test('getItems', (suite) => {
    suite.test('- should call fetch with the correct popular url', (assert) => {
        const correctUrl = 'https://unsplash.it/list';
        const mockFetch = sinon.stub().returns({
            then: () => {}
        });
        const popularApi = preparePopularApi(mockFetch);

        popularApi.getItems();
        assert.ok(mockFetch.calledWith(correctUrl), 'fetch should be called with the correct popular url');
        assert.end();
    });

    suite.test('- should convert the result to json', (assert) => {
        const mockResult = {
            json: sinon.spy()
        };
        const mockFetch = sinon.stub().returns(Promise.resolve(mockResult));
        const popularApi = preparePopularApi(mockFetch);
        const getPopularItems = popularApi.getItems();

        getPopularItems.then(() => {
            assert.ok(mockResult.json.called, 'after fetch we should call the json() function on the response object');
            assert.end();
        })
    });
});