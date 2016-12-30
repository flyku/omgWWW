import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';

export default class TestView extends Component {
    render () {
        const {test} = this.props;
        return (
            <h1>
                这是 Guess 下的视觉组件 <br/>
                <IndexLink to='/'>
                点这里去Home
                </IndexLink>
            </h1>
        );
    }
}
