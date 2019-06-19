import About from './index';
import { load } from 'store/texts';

export default (store) => ({
    path: '/about/:id?',
    component: About,

    loadData: ({
        match,
        url,
        prevLocation,
    }) => {
        console.log('prev location:', prevLocation);

        if (store.getState().texts.data.length === 0) {
            return store.dispatch(load());
        }

        console.log('Texts already loaded!');
    }
})
