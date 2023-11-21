import { createTextComponent, TEXT_COMPONENT_NAME } from './TextComponent';

describe('createTextComponent', () => {
    test('creates a valid TextComponent HyperComponentDTO', () => {
        const textComponent = createTextComponent();

        expect(textComponent).toBeDefined();
        expect(textComponent.name).toBe(TEXT_COMPONENT_NAME);
        expect(textComponent.content).toEqual([]);
        expect(textComponent.meta).toBe(undefined);
    });
});