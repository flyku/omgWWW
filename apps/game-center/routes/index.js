import HomeLayout from '../layouts/HomeLayout';
import Home from './Home';
import Guess from './Guess';

export const createRoutes = (store) => ({
    path: '/',
    component: HomeLayout,
    indexRoute: Home,
    childRoutes: [
        Guess(store)
    ]
});