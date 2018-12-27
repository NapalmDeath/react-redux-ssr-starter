import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './About.scss';

const mapStateToProps = ({ texts }) => ({
    texts: texts.data
});

@withRouter
@connect(mapStateToProps)
export default class extends React.Component {
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
