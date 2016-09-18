import React from 'react';

if (process.env.BROWSER) {
    require('./hello.scss');
}

class HelloMessage extends React.Component {
    render() {  
        return (
            <div>
                <h2 className='header'>Nu populair</h2>
                <p>Hello world</p>
            </div>
        )
    }
}

export default HelloMessage;