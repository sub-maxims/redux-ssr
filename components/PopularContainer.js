import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './popular-mappers';
import PopularElement from './PopularElement';

if (process.env.BROWSER) {
    require('./popular.scss');
}

class PopularComponent extends React.Component {

    static propTypes = {
        popularItems: PropTypes.array.isRequired,
        fetchPopularResults: PropTypes.func.isRequired
    };

    componentWillMount () {
        this.props.fetchPopularResults();
    }
    render() {
        return (
            <div>
                <h2 className='header'>Nu populair</h2>
                <PopularElement items={this.props.popularItems} /> 
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularComponent);