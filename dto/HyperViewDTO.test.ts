import {
    createHyperViewDTO,
    isHyperViewDTO,
    explainHyperViewDTO,
    stringifyHyperViewDTO,
    parseHyperViewDTO,
    isHyperViewDTOOrUndefined,
    explainHyperViewDTOOrUndefined,
} from './HyperViewDTO';

describe('HyperViewDTO functions', () => {
    describe('createHyperViewDTO', () => {
        it('creates a HyperViewDTO object', () => {
            const hyperView = createHyperViewDTO('Example', 'Extended', 'http://example.com', 'en', undefined, undefined, undefined);
            expect(hyperView).toEqual({
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            });
        });
    });

    describe('isHyperViewDTO', () => {
        it('returns true for a valid HyperViewDTO object', () => {
            const validHyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            expect(isHyperViewDTO(validHyperView)).toBe(true);
        });

        it('returns false for an invalid HyperViewDTO object', () => {
            const invalidHyperView = {
                name: 'InvalidExample',
                invalidField: 'InvalidField',
            };
            expect(isHyperViewDTO(invalidHyperView)).toBe(false);
        });
    });

    describe('explainHyperViewDTO', () => {
        it('returns explanation for a HyperViewDTO object', () => {
            const hyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            const explanation = explainHyperViewDTO(hyperView);
            // Add your specific expectation for the explanation here
            expect(typeof explanation).toBe('string');
        });
    });

    describe('stringifyHyperViewDTO', () => {
        it('returns string representation of a HyperViewDTO object', () => {
            const hyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            const stringRepresentation = stringifyHyperViewDTO(hyperView);
            // Add your specific expectation for the string representation here
            expect(typeof stringRepresentation).toBe('string');
        });
    });

    describe('parseHyperViewDTO', () => {
        it('returns HyperViewDTO for a valid object, undefined otherwise', () => {
            const validHyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            const parsed = parseHyperViewDTO(validHyperView);
            expect(parsed).toEqual(validHyperView);

            const invalidObject = {
                name: 'InvalidExample',
                invalidField: 'InvalidField',
            };
            const parsedInvalid = parseHyperViewDTO(invalidObject);
            expect(parsedInvalid).toBeUndefined();
        });
    });

    describe('isHyperViewDTOOrUndefined', () => {
        it('returns true for a valid HyperViewDTO object or undefined', () => {
            const validHyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            expect(isHyperViewDTOOrUndefined(validHyperView)).toBe(true);
            expect(isHyperViewDTOOrUndefined(undefined)).toBe(true);
        });

        it('returns false for an invalid HyperViewDTO object', () => {
            const invalidHyperView = {
                name: 'InvalidExample',
                invalidField: 'InvalidField',
            };
            expect(isHyperViewDTOOrUndefined(invalidHyperView)).toBe(false);
        });
    });

    describe('explainHyperViewDTOOrUndefined', () => {
        it('returns explanation for a HyperViewDTO object or undefined', () => {
            const validHyperView = {
                name: 'Example',
                extend: 'Extended',
                publicUrl: 'http://example.com',
                language: 'en',
                seo: undefined,
                content: undefined,
                style: undefined,
            };
            const explanation = explainHyperViewDTOOrUndefined(validHyperView);
            // Add your specific expectation for the explanation here
            expect(typeof explanation).toBe('string');

            const undefinedValue: undefined = undefined;
            const undefinedExplanation = explainHyperViewDTOOrUndefined(undefinedValue);
            // Add your specific expectation for the undefined explanation here
            expect(typeof undefinedExplanation).toBe('string');
        });
    });
});