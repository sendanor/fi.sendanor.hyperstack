import {
    HyperComponentDTO,
    isHyperComponentDTO,
    isHyperComponentDTOOrUndefined,
    explainHyperComponentDTO,
    explainHyperComponentDTOOrUndefined,
    isHyperComponentContentOrUndefined,
    explainHyperComponentContentOrUndefined,
    stringifyHyperComponentDTO,
    parseHyperComponentDTO,
    createHyperComponentDTO,
    HyperComponentContent,
} from './HyperComponentDTO';

describe('HyperComponentDTO functions', () => {
    describe('isHyperComponentDTO', () => {
        it('correctly identifies a valid HyperComponentDTO', () => {
            const validDTO: HyperComponentDTO = {
                name: 'ValidName',
                content: 'ValidContent',
                extend: 'ValidExtend',
                meta: { key: 'value' },
            };
            expect(isHyperComponentDTO(validDTO)).toBe(true);
        });

        it('correctly identifies an invalid HyperComponentDTO', () => {
            const invalidDTO: any = {
                name: 'InvalidName',
                content: 'InvalidContent',
                extend: 'InvalidExtend',
                meta: 'InvalidMeta', // meta should be a ReadonlyJsonObject or undefined
            };
            expect(isHyperComponentDTO(invalidDTO)).toBe(false);
        });
    });

    // Add similar tests for other functions like isHyperComponentDTOOrUndefined, explainHyperComponentDTO, etc.

    describe('createHyperComponentDTO', () => {
        it('creates a HyperComponentDTO object with provided values', () => {
            const newDTO = createHyperComponentDTO(
                'NewName',
                'NewExtend',
                'NewContent',
                { key: 'value' }
            );

            expect(newDTO.name).toBe('NewName');
            expect(newDTO.extend).toBe('NewExtend');
            expect(newDTO.content).toBe('NewContent');
            expect(newDTO.meta).toEqual({ key: 'value' });
        });
    });

    // Test other functions in a similar manner...

    describe('stringifyHyperComponentDTO', () => {
        it('correctly stringifies a HyperComponentDTO', () => {
            const dto: HyperComponentDTO = {
                name: 'DTOName',
                content: 'DTOContent',
                extend: 'DTOExtend',
                meta: { key: 'value' },
            };
            expect(stringifyHyperComponentDTO(dto)).toBe(
                'HyperComponentDTO([object Object])'
            ); // Adjust expectation according to your desired output
        });
    });



    describe('parseHyperComponentDTO', () => {
        it('parses a valid HyperComponentDTO', () => {
            const dto: HyperComponentDTO = {
                name: 'DTOName',
                content: 'DTOContent',
                extend: 'DTOExtend',
                meta: { key: 'value' },
            };
            expect(parseHyperComponentDTO(dto)).toEqual(dto);
        });

        it('returns undefined for an invalid HyperComponentDTO', () => {
            const invalidDTO: any = {
                name: 'InvalidName',
                content: 'InvalidContent',
                extend: 'InvalidExtend',
                meta: 'InvalidMeta',
            };
            expect(parseHyperComponentDTO(invalidDTO)).toBeUndefined();
        });
    });


});

