import { createLoginView} from './LoginView';
import { createText } from '../components/Text';
import { DEFAULT_VIEW_NAME } from './DefaultView';

describe('createLoginView', () => {
    test('creates a valid LoginView HyperViewDTO', () => {
        const loginView = createLoginView();

        expect(loginView).toBeDefined();
        expect(loginView.name).toBe('LoginView');

        const expectedContent = [
            createText('project', 'Example'),
            createText('appName', 'OrderApp'),
        ];
        expect(loginView.content).toEqual(expectedContent);

        expect(loginView.extend).toBe(DEFAULT_VIEW_NAME);
    });
});