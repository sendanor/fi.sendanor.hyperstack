import { HyperComponent } from "../../dto/types/HyperComponent";
import {createTitleTextComponent, TITLE_TEXT_COMPONENT_NAME, TitleTextComponent} from "./TitleTextComponent";

describe('createTitleTextComponent', () => {
    it('should create TitleTextComponent with default values', () => {
        const expectedTitleTextComponent: TitleTextComponent = {
            name: TITLE_TEXT_COMPONENT_NAME,
            extend: HyperComponent.H1,
            content: [],
            meta: undefined,
        };

        const titleTextComponent: TitleTextComponent = createTitleTextComponent();

        expect(titleTextComponent).toEqual(expectedTitleTextComponent);
    });
});