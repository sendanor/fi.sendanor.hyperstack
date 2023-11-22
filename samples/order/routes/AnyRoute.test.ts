import { createAnyRoute, ANY_ROUTE_NAME } from './AnyRoute';

describe('createAnyRoute', () => {
    test('creates a valid AnyRoute HyperRouteDTO with redirect', () => {
        const redirect = '/some-redirect-path';

        const anyRoute = createAnyRoute(redirect);

        expect(anyRoute).toBeDefined();
        expect(anyRoute.name).toBe(ANY_ROUTE_NAME);
        expect(anyRoute.path).toBe('*');
        expect(anyRoute.redirect).toBe(redirect);
    });

    test('creates a valid AnyRoute HyperRouteDTO without redirect', () => {
        const anyRoute = createAnyRoute('');

        expect(anyRoute).toBeDefined();
        expect(anyRoute.name).toBe(ANY_ROUTE_NAME);
        expect(anyRoute.path).toBe('*');
        expect(anyRoute.redirect).toBe("");
    });
});