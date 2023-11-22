import { createLoginRoute, LoginRoute } from './LoginRoute';
import { createHyperRouteDTO, HyperRouteDTO } from '../../../dto/HyperRouteDTO';
import { LOGIN_VIEW_NAME } from '../views/LoginView';

describe('createLoginRoute', () => {
    test('creates a valid LoginRoute HyperRouteDTO', () => {
        const routeName = 'LoginRoute';

        const loginRoute = createLoginRoute(routeName);

        expect(loginRoute).toBeDefined();
        expect(loginRoute.name).toBe(routeName);
        expect(loginRoute.path).toBe('/');
        expect(loginRoute.view).toBe(LOGIN_VIEW_NAME);
    });
});