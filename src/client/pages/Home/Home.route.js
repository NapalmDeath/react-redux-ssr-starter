import Home from './index';

export default (store) => ({
    path: '/home/:id?',
    component: Home,
    loadData: () =>
      new Promise(resolve =>
        setTimeout(() => {
            resolve(true);
        }, 1000)
      )
})
