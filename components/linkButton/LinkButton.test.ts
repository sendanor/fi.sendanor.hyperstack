import {LinkButton} from "./LinkButton";
import { LINK_BUTTON_COMPONENT_NAME, LinkButtonComponent } from "./LinkButtonComponent";

describe('createLinkButton', () => {
    it('should create LinkButton with provided name, text, and href', () => {
        const name = 'LinkButtonName';
        const text = 'Visit our website';
        const href = 'https://example.com';

        const expectedLinkButton: LinkButtonComponent = {
            name: name,
            extend: LINK_BUTTON_COMPONENT_NAME,
            content: [text],
            meta: {
                href: href,
            },
        };

        const linkButton: LinkButton = LinkButton.createButton(name, text, href);

        expect(linkButton).toEqual(expectedLinkButton);
    });
});