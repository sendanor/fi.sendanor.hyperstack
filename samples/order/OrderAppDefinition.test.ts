import { createOrderAppDefinitions } from './OrderAppDefinition';
import { createAnyRoute } from './routes/AnyRoute';
import { createLoginRoute } from './routes/LoginRoute';
import { createTextComponent } from './components/TextComponent';
import { createDefaultView } from './views/DefaultView';
import { createLoginView } from './views/LoginView';

describe('createOrderAppDefinitions', () => {
    test('creates a valid OrderAppDefinition HyperDTO', () => {
        const myAppName = 'MyOrderApp';
        const publicUrl = 'http://example.com';
        const language = 'en';

        const orderAppDefinitions = createOrderAppDefinitions(myAppName, publicUrl, language);

        expect(orderAppDefinitions).toBeDefined();
        expect(orderAppDefinitions.name).toBe(myAppName);

        const expectedLoginRoute = createLoginRoute('LoginRoute');
        const expectedAnyRoute = createAnyRoute('LoginRoute');
        expect(orderAppDefinitions.routes).toEqual([expectedLoginRoute, expectedAnyRoute]);

        const expectedTextComponent = createTextComponent();
        const expectedDefaultView = createDefaultView();
        const expectedLoginView = createLoginView();
        expect(orderAppDefinitions.components).toEqual([expectedTextComponent]);
        expect(orderAppDefinitions.views).toEqual([expectedDefaultView, expectedLoginView]);
    });
});