import { injectReducer } from '../../store/reducers';
import TestContainer from './containers/TestContainer';
import testReducer from './modules/testReducer';

// export default (store) => ({
//     path: '/',
//     getComponent (nextState, cb) {
//         // injectReducer(store, { key: 'test', testReducer });
//         // cb(null, TestContainer);
//     }
// })

import TestView from './components/TestView';

export default {
    component: TestView
}
