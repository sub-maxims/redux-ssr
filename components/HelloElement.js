import React from 'react';

const HelloElement = ({items}) => {
    let index = 0;
    return (
        <ul>
            {items.slice(0,10).map(item => (
                <li key={index++}>
                    <img src={`https://unsplash.it/400/300?image=${item.id}`} />
                    <p>{item.author}</p>
                </li>
            ))}
        </ul>
    ) 
}

export default HelloElement;