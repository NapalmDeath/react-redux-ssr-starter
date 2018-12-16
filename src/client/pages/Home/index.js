import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./Home'),
    loading: (props) => {
        if (props.pastDelay) {
            return <div>Загрузка</div>;
        }
        return null;
    },
});
