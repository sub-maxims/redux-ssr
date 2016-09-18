import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './hello-mappers';
import HelloElement from './HelloElement';

if (process.env.BROWSER) {
    require('./hello.scss');
}

class HelloMessage extends React.Component {
    componentWillMount () { 
        console.log('test');
        this.props.fetchItems();
    }
    render() {
        return (
            <div>
                <h2 className='header'>Nu populair</h2>
                <HelloElement items={this.props.hello} /> 
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloMessage);