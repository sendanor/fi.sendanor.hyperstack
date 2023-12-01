import {createLinkButtonComponent, LinkButtonComponent, LINK_BUTTON_COMPONENT_NAME} from "./LinkButtonComponent";
import {HyperComponent} from "../../../../../sendanor/hyperstack/dto/types/HyperComponent";

describe('createLinkButtonComponent', () => {
    it('should create LinkButtonComponent with default values', () => {
        const expectedLinkButtonComponent: LinkButtonComponent = {
            name: LINK_BUTTON_COMPONENT_NAME,
            extend: HyperComponent.LinkButton,
            content: [],
            meta: {},
        };

        const linkButtonComponent: LinkButtonComponent = createLinkButtonComponent();

        expect(linkButtonComponent).toEqual(expectedLinkButtonComponent);
    });
});