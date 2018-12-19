import Home from './Home';
import About from './About';

const Routes = [
    {
        path: '/home',
        component: Home,
        loadData: () => new Promise(resolve => setTimeout(() => { resolve(true); }, 1000)),
    },
    {
        path: '/about',
        component: About,
        loadData: () => new Promise(resolve => setTimeout(() => { resolve(true); }, 3000)),
    },
];

export default Routes;
