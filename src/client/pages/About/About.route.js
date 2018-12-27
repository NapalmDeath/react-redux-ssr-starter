import About from './About';
import { load } from 'store/texts';

export default (store) => ({
    path: '/about',
    component: About,

    loadData: ({
        match,
        url
    }) => {
        if (store.getState().texts.data.length === 0) {
            return store.dispatch(load());
        }
        console.log('Texts already loaded!');
    }
})
