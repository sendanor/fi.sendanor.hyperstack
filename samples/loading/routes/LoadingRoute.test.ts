import { createLoadingRoute } from './LoadingRoute';
import { createHyperRouteDTO, HyperRouteDTO } from '../../../dto/HyperRouteDTO';

describe('createLoadingRoute', () => {
    test('creates a valid LoadingRoute HyperRouteDTO', () => {
        const routeName = 'LoadingRoute';

        const loadingRoute = createLoadingRoute(routeName);

        expect(loadingRoute).toBeDefined();
        expect(loadingRoute.name).toBe(routeName);
        expect(loadingRoute.path).toBe('/');
        expect(loadingRoute.redirect).toBeUndefined();
    });
});