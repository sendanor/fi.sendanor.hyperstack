import { mergeHyperComponentContent } from "./mergeHyperComponentContent";

describe('mergeHyperComponentContent', () => {
    test('merges arrays of strings', () => {
        const result = mergeHyperComponentContent(['a', 'b'], ['c', 'd']);
        expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    test('merges arrays of HyperComponentDTO', () => {
        const componentA = { type: 'exampleA', /* other properties */ } as any;
        const componentB = { type: 'exampleB', /* other properties */ } as any;

        const result = mergeHyperComponentContent([componentA], [componentB]);
        expect(result).toEqual([componentA, componentB]);
    });

    test('merges arrays of strings and HyperComponentDTO', () => {
        const component = { type: 'example', /* other properties */ } as any;

        const result = mergeHyperComponentContent(['a', 'b'], [component]);
        expect(result).toEqual(['a', 'b', component]);
    });

    test('handles undefined inputs', () => {
        const result = mergeHyperComponentContent(undefined, undefined);
        expect(result).toEqual([]);
    });
});
