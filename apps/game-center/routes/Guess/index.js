import TestView from './components/TestView';

export default (store) => ({
    path: '/guess',
    getComponent: function (nextState, cb) {
        cb(null, TestView);
    }
});