import { populateHyperComponentDTO } from "./populateHyperComponentDTO";
import { HyperComponentDTO, } from "../../dto/HyperComponentDTO";

describe('populateHyperComponentDTO', () => {
    test('returns the same component if extend is undefined', () => {
        const component: HyperComponentDTO = {
            name: 'TestComponent',
            content: ['a', 'b'],
            meta: { key: 'value' },
        };

        const components: HyperComponentDTO[] = [];

        const result = populateHyperComponentDTO(component, components);
        expect(result).toEqual(component);
    });

    test('returns a new component with extended content', () => {
        const extendComponent: HyperComponentDTO = {
            name: 'ExtendComponent',
            content: ['c', 'd'],
            meta: { otherKey: 'otherValue' },
        };

        const component: HyperComponentDTO = {
            name: 'TestComponent',
            extend: 'ExtendComponent',
            content: ['a', 'b'],
            meta: { key: 'value' },
        };

        const components: HyperComponentDTO[] = [extendComponent];

        const result = populateHyperComponentDTO(component, components);

        const expected: HyperComponentDTO = {
            name: 'ExtendComponent',
            extend: undefined,
            content: ['c', 'd', 'a', 'b'],
            meta: { key: 'value', otherKey: 'otherValue' },
        };

        expect(result).toEqual(expected);
    });

    test('throws error if extend component not found', () => {
        const component: HyperComponentDTO = {
            name: 'TestComponent',
            extend: 'NonExistentComponent',
            content: ['a', 'b'],
            meta: { key: 'value' },
        };

        const components: HyperComponentDTO[] = [];

        expect(() => populateHyperComponentDTO(component, components)).toThrowError(
            TypeError('Could not find component by name NonExistentComponent to extend for TestComponent')
        );
    });
});