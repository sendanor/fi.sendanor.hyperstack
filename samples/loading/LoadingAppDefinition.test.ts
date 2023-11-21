import { createLoadingAppDefinition, LOADING_ROUTE_NAME } from './LoadingAppDefinition';
import { createAnyRoute } from './routes/AnyRoute';
import { createLoadingRoute } from './routes/LoadingRoute';
import { createTextComponent } from './components/TextComponent';
import { createDefaultView } from './views/DefaultView';
import { createLoadingView } from './views/LoadingView';

describe('createLoadingAppDefinition', () => {
    test('creates a valid LoadingAppDefinition HyperDTO', () => {
        const myAppName = 'MyLoadingApp';
        const publicUrl = 'mockPublicUrl';
        const language = 'en';

        const loadingAppDefinition = createLoadingAppDefinition(myAppName, publicUrl, language);

        expect(loadingAppDefinition).toBeDefined();
        expect(loadingAppDefinition.name).toBe(myAppName);
        expect(loadingAppDefinition.routes).toBeDefined();
        expect(loadingAppDefinition.routes.length).toBe(2); // Assuming 2 routes are added

        const expectedLoadingRoute = createLoadingRoute(LOADING_ROUTE_NAME);
        const expectedAnyRoute = createAnyRoute(LOADING_ROUTE_NAME);

        expect(loadingAppDefinition.routes).toContainEqual(expectedLoadingRoute);
        expect(loadingAppDefinition.routes).toContainEqual(expectedAnyRoute);

        expect(loadingAppDefinition.publicUrl).toBe(publicUrl);
        expect(loadingAppDefinition.language).toBe(language);
        expect(loadingAppDefinition.components).toBeDefined();
        expect(loadingAppDefinition.components.length).toBe(1); // Assuming 1 component is added
        expect(loadingAppDefinition.views).toBeDefined();
        expect(loadingAppDefinition.views.length).toBe(2); // Assuming 2 views are added

        const expectedTextComponent = createTextComponent();
        const expectedDefaultView = createDefaultView();
        const expectedLoadingView = createLoadingView();

        expect(loadingAppDefinition.components).toContainEqual(expectedTextComponent);
        expect(loadingAppDefinition.views).toContainEqual(expectedDefaultView);
        expect(loadingAppDefinition.views).toContainEqual(expectedLoadingView);
    });
});