import { matchRoutes } from 'react-router-config';
import Routes from 'client/pages/routes';

export default async (url) => {
    const matchingRoutes = matchRoutes(Routes, url);

    let promises = [];

    matchingRoutes.forEach(({ route }) => {
        if (route.loadData) {
            promises.push(route.loadData());
        }
    });

    return Promise.all(promises);
}
