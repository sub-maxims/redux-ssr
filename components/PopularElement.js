import React, { PropTypes } from 'react';

const PopularElement = ({items}) => {
    let index = 0;
    return (
        <ul>
            {items.slice(0,10).map(item => (
                <li key={index++}>
                    <img className="imageItem" src={`https://unsplash.it/400/300?image=${item.id}`} />
                    <p className="imageAuthor">Author: {item.author}</p>
                </li>
            ))}
        </ul>
    ) 
}

PopularElement.propTypes = {
    items: PropTypes.array.isRequired,
}

export default PopularElement;