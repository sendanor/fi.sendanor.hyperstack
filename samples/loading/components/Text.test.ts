import { createText } from './Text';

describe('createText', () => {
    test('creates a valid Text HyperComponentDTO', () => {
        const name = 'SampleText';
        const textContent = 'This is some sample text.';

        const textComponent = createText(name, textContent);

        expect(textComponent).toBeDefined();
        expect(textComponent.name).toBe(name);
        expect(textComponent.content).toEqual([textContent]);
        expect(textComponent.meta).toBe(undefined);
    });
});