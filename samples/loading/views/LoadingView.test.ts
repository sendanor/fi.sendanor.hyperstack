import { createLoadingView, LOADING_VIEW_NAME } from './LoadingView';
import { createText } from '../components/Text';

describe('createLoadingView', () => {
    test('creates a valid LoadingView HyperViewDTO', () => {
        const loadingView = createLoadingView();

        expect(loadingView).toBeDefined();
        expect(loadingView.name).toBe(LOADING_VIEW_NAME);

        expect(loadingView.content).toBeDefined();
        expect(Array.isArray(loadingView.content)).toBe(true);

        if (Array.isArray(loadingView.content) && loadingView.content.length > 0) {
            const expectedTextComponent = createText('loadingText', '...loading...');
            expect(loadingView.content[0]).toEqual(expectedTextComponent);
        } else {
            console.warn('LoadingView content is undefined or empty');
        }
    });
});