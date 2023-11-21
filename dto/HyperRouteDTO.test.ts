import {
    HyperRouteDTO,
    isHyperRouteDTO,
    createHyperRouteDTO,
    isHyperRouteDTOOrUndefined,
    stringifyHyperRouteDTO,
    parseHyperRouteDTO,
    explainHyperRouteDTOOrUndefined,
    explainHyperRouteDTO,
} from './HyperRouteDTO';

describe('HyperRouteDTO', () => {
    const validHyperRouteDTO: HyperRouteDTO = {
        name: 'SampleRouteDTO',
        path: '/sample',
        extend: 'extendValue',
        publicUrl: 'https://example.com',
        language: 'en',
        view: 'sampleView',
        redirect: 'redirectValue',
    };

    const invalidHyperRouteDTO: Partial<HyperRouteDTO> = {
        // Define an invalid HyperRouteDTO here for testing purposes
        name: 'InvalidRouteDTO',
        // ... other properties
    };

    test('isHyperRouteDTO function should validate a valid HyperRouteDTO', () => {
        expect(isHyperRouteDTO(validHyperRouteDTO)).toBe(true);
    });

    test('isHyperRouteDTO function should invalidate an invalid HyperRouteDTO', () => {
        expect(isHyperRouteDTO(invalidHyperRouteDTO)).toBe(false);
    });

    test('isHyperRouteDTOOrUndefined function should validate a valid HyperRouteDTO or undefined', () => {
        expect(isHyperRouteDTOOrUndefined(validHyperRouteDTO)).toBe(true);
        expect(isHyperRouteDTOOrUndefined(undefined)).toBe(true);
    });

    test('isHyperRouteDTOOrUndefined function should invalidate an invalid HyperRouteDTO', () => {
        expect(isHyperRouteDTOOrUndefined(invalidHyperRouteDTO)).toBe(false);
    });

    test('stringifyHyperRouteDTO function should return a string representation of HyperRouteDTO', () => {
        expect(stringifyHyperRouteDTO(validHyperRouteDTO)).toEqual('HyperRouteDTO([object Object])');
    });

    test('parseHyperRouteDTO function should parse valid HyperRouteDTO and return it', () => {
        expect(parseHyperRouteDTO(validHyperRouteDTO)).toEqual(validHyperRouteDTO);
    });

    test('parseHyperRouteDTO function should return undefined for an invalid HyperRouteDTO', () => {
        expect(parseHyperRouteDTO(invalidHyperRouteDTO)).toBeUndefined();
    });

    test('explainHyperRouteDTOOrUndefined function should explain a valid HyperRouteDTO or undefined', () => {
        expect(explainHyperRouteDTOOrUndefined(validHyperRouteDTO)).toEqual('OK');
        expect(explainHyperRouteDTOOrUndefined(undefined)).toEqual('OK');
    });

    test('explainHyperRouteDTOOrUndefined function should explain an invalid HyperRouteDTO', () => {
        expect(explainHyperRouteDTOOrUndefined(invalidHyperRouteDTO)).not.toEqual('OK');
    });

    test('explainHyperRouteDTO function should explain the properties of HyperRouteDTO', () => {
        // Pass the valid HyperRouteDTO object here for explanation
        expect(explainHyperRouteDTO(validHyperRouteDTO)).toContain('OK');
        expect(explainHyperRouteDTO(validHyperRouteDTO)).toContain('OK');
        // ... other properties
    });
});
