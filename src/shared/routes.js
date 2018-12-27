import Home from 'client/pages/Home';
import About from 'client/pages/About/About.route';

const routes = (store) => [
    {
        path: '/home/:id?',
        component: Home,
        loadData: () => new Promise(resolve => setTimeout(() => { resolve(true); }, 1000)),
    },
    About(store),
];

export default routes;
