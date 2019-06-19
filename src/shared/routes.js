import Home from 'client/pages/Home/Home.route';
import About from 'client/pages/About/About.route';

const routes = store => [
  Home(store),
  About(store)
];

export default routes;
