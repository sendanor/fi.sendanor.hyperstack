import {BUTTON_COMPONENT_NAME, ButtonComponent, createButtonComponent} from "./ButtonComponent";
import {HyperComponent} from "../../../../../sendanor/hyperstack/dto/types/HyperComponent";

describe('createButtonComponent', () => {
    it('should create ButtonComponent with default values', () => {
        const expectedButtonComponent: ButtonComponent = {
            name: BUTTON_COMPONENT_NAME,
            extend: HyperComponent.Button,
            content: [],
            meta: undefined,
        };

        const buttonComponent: ButtonComponent = createButtonComponent();

        expect(buttonComponent).toEqual(expectedButtonComponent);
    });
});