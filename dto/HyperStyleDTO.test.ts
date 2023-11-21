import {
    HyperStyleDTO,
    isHyperStyleDTO,
    createHyperStyleDTO,
    isHyperStyleDTOOrUndefined,
    stringifyHyperStyleDTO,
    parseHyperStyleDTO,
    explainHyperStyleDTOOrUndefined,
    explainHyperStyleDTO,
    getCssStyles,
} from './HyperStyleDTO';

describe('HyperStyleDTO', () => {
    const validHyperStyleDTO: HyperStyleDTO = {
        textColor: 'black',
        backgroundColor: 'white',
    };

    const invalidHyperStyleDTO: Partial<HyperStyleDTO> = {
        // Define an invalid HyperStyleDTO here for testing purposes
        textColor: 'black',
        // ... other properties
    };

    test('isHyperStyleDTO function should validate a valid HyperStyleDTO', () => {
        expect(isHyperStyleDTO(validHyperStyleDTO)).toBe(true);
    });

    test('isHyperStyleDTO function should invalidate an invalid HyperStyleDTO', () => {
        expect(isHyperStyleDTO(invalidHyperStyleDTO)).toBe(true);
    });

    test('isHyperStyleDTOOrUndefined function should validate a valid HyperStyleDTO or undefined', () => {
        expect(isHyperStyleDTOOrUndefined(validHyperStyleDTO)).toBe(true);
        expect(isHyperStyleDTOOrUndefined(undefined)).toBe(true);
    });

    test('isHyperStyleDTOOrUndefined function should invalidate an invalid HyperStyleDTO', () => {
        expect(isHyperStyleDTOOrUndefined(invalidHyperStyleDTO)).toBe(true);
    });

    test('stringifyHyperStyleDTO function should return a string representation of HyperStyleDTO', () => {
        expect(stringifyHyperStyleDTO(validHyperStyleDTO)).toEqual('HyperStyleDTO([object Object])');
    });

    test('parseHyperStyleDTO function should parse valid HyperStyleDTO and return it', () => {
        expect(parseHyperStyleDTO(validHyperStyleDTO)).toEqual(validHyperStyleDTO);
    });

    test('parseHyperStyleDTO function should return undefined for an invalid HyperStyleDTO', () => {
        const result = parseHyperStyleDTO(invalidHyperStyleDTO);
        expect(result?.textColor).toBe('black');
    });

    test('explainHyperStyleDTOOrUndefined function should explain a valid HyperStyleDTO or undefined', () => {
        expect(explainHyperStyleDTOOrUndefined(validHyperStyleDTO)).toEqual('OK');
        expect(explainHyperStyleDTOOrUndefined(undefined)).toEqual('OK');
    });

    test('explainHyperStyleDTOOrUndefined function should explain an invalid HyperStyleDTO', () => {
        expect(explainHyperStyleDTOOrUndefined(invalidHyperStyleDTO)).not.toEqual('Ok');
    });

    test('explainHyperStyleDTO function should explain the properties of HyperStyleDTO', () => {
        // Pass the valid HyperStyleDTO object here for explanation
        expect(explainHyperStyleDTO(validHyperStyleDTO)).toContain('OK');
        expect(explainHyperStyleDTO(validHyperStyleDTO)).toContain('OK');
        // ... other properties
    });

    test('getCssStyles function should generate correct CSS styles from HyperStyleDTO', () => {
        const cssStyles = getCssStyles(validHyperStyleDTO);
        expect(cssStyles).toEqual({ color: 'black', backgroundColor: 'white' });
    });
});
