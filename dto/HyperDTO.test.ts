import {
    HyperDTO,
    isHyperDTO,
    createHyperDTO,
    isHyperDTOOrUndefined,
    stringifyHyperDTO,
    parseHyperDTO,
    explainHyperDTOOrUndefined,
    explainHyperDTO,
} from './HyperDTO';

describe('HyperDTO', () => {
    const validHyperDTO: HyperDTO = {
        name: 'SampleDTO',
        components: [],
        views: [],
        routes: [],
        extend: 'extendValue',
        publicUrl: 'https://example.com',
        language: 'en',
    };

    const invalidHyperDTO: Partial<HyperDTO> = {
        // Define an invalid HyperDTO here for testing purposes
        name: 'InvalidDTO',
        // ... other properties
    };

    test('isHyperDTO function should validate a valid HyperDTO', () => {
        expect(isHyperDTO(validHyperDTO)).toBe(true);
    });

    test('isHyperDTO function should invalidate an invalid HyperDTO', () => {
        expect(isHyperDTO(invalidHyperDTO)).toBe(false);
    });

    test('isHyperDTOOrUndefined function should validate a valid HyperDTO or undefined', () => {
        expect(isHyperDTOOrUndefined(validHyperDTO)).toBe(true);
        expect(isHyperDTOOrUndefined(undefined)).toBe(true);
    });

    test('isHyperDTOOrUndefined function should invalidate an invalid HyperDTO', () => {
        expect(isHyperDTOOrUndefined(invalidHyperDTO)).toBe(false);
    });

    test('stringifyHyperDTO function should return a string representation of HyperDTO', () => {
        expect(stringifyHyperDTO(validHyperDTO)).toEqual('HyperDTO([object Object])');
    });

    test('parseHyperDTO function should parse valid HyperDTO and return it', () => {
        expect(parseHyperDTO(validHyperDTO)).toEqual(validHyperDTO);
    });

    test('parseHyperDTO function should return undefined for an invalid HyperDTO', () => {
        expect(parseHyperDTO(invalidHyperDTO)).toBeUndefined();
    });

    test('explainHyperDTOOrUndefined function should explain a valid HyperDTO or undefined', () => {
        expect(explainHyperDTOOrUndefined(validHyperDTO)).toEqual('OK');
        expect(explainHyperDTOOrUndefined(undefined)).toEqual('OK');
    });

    test('explainHyperDTOOrUndefined function should explain an invalid HyperDTO', () => {
        expect(explainHyperDTOOrUndefined(invalidHyperDTO)).not.toEqual('Ok');
    });

    test('explainHyperDTO function should explain the properties of HyperDTO', () => {
        // Pass the valid HyperDTO object here for explanation
        expect(explainHyperDTO(validHyperDTO)).toContain('OK');
        expect(explainHyperDTO(validHyperDTO)).toContain('OK');
        // ... other properties
    });
});
