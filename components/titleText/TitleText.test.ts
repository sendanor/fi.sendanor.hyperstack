import {createTitleText, TitleText} from "./TitleText";
import {TITLE_TEXT_COMPONENT_NAME} from "./TitleTextComponent";

describe('createTitleText', () => {
    it('should create TitleText with provided name and text', () => {
        const name = 'TitleTextName';
        const text = 'The Title';

        const expectedTitleText: TitleText = {
            name: name,
            extend: TITLE_TEXT_COMPONENT_NAME,
            content: [text],
            meta: undefined,
        };

        const titleText: TitleText = createTitleText(name, text);

        expect(titleText).toEqual(expectedTitleText);
    });
});