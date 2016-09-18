import React from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
    require('./hello.scss');
}

// Extract the props we want to connect from the current store state
const mapStateToProps = (state) => ({ hello: state.item })

class HelloMessage extends React.Component {
    render() {  
        return (
            <div>
                <h2 className='header'>Nu populair</h2>
                <p>{this.props.hello}</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HelloMessage);