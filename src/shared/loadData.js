import { matchRoutes } from 'react-router-config';

export default async (routes, url) => {
    const matchingRoutes = matchRoutes(routes, url);

    let promises = [];

    matchingRoutes.forEach((route) => {
        if (route.route.loadData) {
            promises.push(route.route.loadData({
                match: route.match,
                url,
            }));
        }
    });

    return Promise.all(promises);
}
