import fetch from 'isomorphic-fetch';

export const getItems = () => {
    const url = 'https://unsplash.it/list';
    return fetch(url).then(res => res.json());
}
