import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';

export default class TestView extends Component {
    // const {test} = this.props;

    render () {
        return (
            <h1>
                这是Home下的视觉组件
                <IndexLink to='/guess'>
                    点这里去Guess
                </IndexLink>
            </h1>
        );
    }
}
