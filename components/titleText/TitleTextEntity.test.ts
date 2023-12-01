import {TitleTextEntity} from "./TitleTextEntity";
import {TITLE_TEXT_COMPONENT_NAME} from "./TitleTextComponent";

describe('TitleTextEntity', () => {
    describe('#createText', () => {
        it('should create TitleText with provided name and text', () => {
            const name = 'TitleTextName';
            const text = 'The Title';

            const expectedTitleText: TitleTextEntity = {
                name: name,
                extend: TITLE_TEXT_COMPONENT_NAME,
                content: [text],
                meta: undefined,
            };

            const titleText: TitleTextEntity = TitleTextEntity.createText(name, text);

            expect(titleText).toEqual(expectedTitleText);
        });
    });
});
