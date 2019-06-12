import { hot } from 'react-hot-loader/root';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './About.scss';

const mapStateToProps = ({ texts }) => ({
    texts: texts.data
});

@withRouter
@connect(mapStateToProps)
class About extends React.Component {
    render() {
        const { texts } = this.props;

        return (
            <div>
                <div className="about">ABOUT</div>
                <div>
                    { texts.map((text) => <div key={ text._id }>{ text.text }</div>) }
                </div>
                <Link to="/about/123?query=hello">change location</Link>
            </div>
        );
    }
}

export default hot(About);
