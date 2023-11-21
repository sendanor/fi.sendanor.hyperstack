import {
    HyperSeoDTO,
    isHyperSeoDTO,
    createHyperSeoDTO,
    isHyperSeoDTOOrUndefined,
    stringifyHyperSeoDTO,
    parseHyperSeoDTO,
    explainHyperSeoDTOOrUndefined,
    explainHyperSeoDTO,
} from './HyperSeoDTO';

describe('HyperSeoDTO', () => {
    const validHyperSeoDTO: HyperSeoDTO = {
        title: 'Sample Title',
        description: 'Sample Description',
        siteName: 'Sample Site Name',
    };

    const invalidHyperSeoDTO: Partial<HyperSeoDTO> = {
        // Define an invalid HyperSeoDTO here for testing purposes
        title: 'Invalid Title',
        // ... other properties
    };

    test('isHyperSeoDTO function should validate a valid HyperSeoDTO', () => {
        expect(isHyperSeoDTO(validHyperSeoDTO)).toBe(true);
    });

    test('isHyperSeoDTO function should invalidate an invalid HyperSeoDTO', () => {
        expect(isHyperSeoDTO(invalidHyperSeoDTO)).toBe(true);
    });

    test('isHyperSeoDTOOrUndefined function should validate a valid HyperSeoDTO or undefined', () => {
        expect(isHyperSeoDTOOrUndefined(validHyperSeoDTO)).toBe(true);
        expect(isHyperSeoDTOOrUndefined(undefined)).toBe(true);
    });

    test('isHyperSeoDTOOrUndefined function should invalidate an invalid HyperSeoDTO', () => {
        expect(isHyperSeoDTOOrUndefined(invalidHyperSeoDTO)).toBe(true);
    });

    test('stringifyHyperSeoDTO function should return a string representation of HyperSeoDTO', () => {
        expect(stringifyHyperSeoDTO(validHyperSeoDTO)).toEqual('HyperSeoDTO([object Object])');
    });

    test('parseHyperSeoDTO function should parse valid HyperSeoDTO and return it', () => {
        expect(parseHyperSeoDTO(validHyperSeoDTO)).toEqual(validHyperSeoDTO);
    });

    test('parseHyperSeoDTO function should return undefined for an invalid HyperSeoDTO', () => {
        const result = parseHyperSeoDTO(invalidHyperSeoDTO);
        expect(result).toEqual(expect.objectContaining({ title: 'Invalid Title' }));
    });

    test('explainHyperSeoDTOOrUndefined function should explain a valid HyperSeoDTO or undefined', () => {
        expect(explainHyperSeoDTOOrUndefined(validHyperSeoDTO)).toEqual('OK');
        expect(explainHyperSeoDTOOrUndefined(undefined)).toEqual('OK');
    });

    test('explainHyperSeoDTOOrUndefined function should explain an invalid HyperSeoDTO', () => {
        expect(explainHyperSeoDTOOrUndefined(invalidHyperSeoDTO)).not.toEqual('Ok');
    });

    test('explainHyperSeoDTO function should explain the properties of HyperSeoDTO', () => {
        // Pass the valid HyperSeoDTO object here for explanation
        expect(explainHyperSeoDTO(validHyperSeoDTO)).toContain('OK');
        expect(explainHyperSeoDTO(validHyperSeoDTO)).toContain('OK');
        // ... other properties
    });
});
