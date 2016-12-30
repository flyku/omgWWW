import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

import {createRoutes} from './routes/index';

// store 实例化
const store = createStore();

let render = () => {
    const routes = createRoutes(store);

    ReactDOM.render(
        <AppContainer
            store={store}
            history={hashHistory}
            routes={routes}
        />,
        document.getElementById('app')
    );
};

render();
