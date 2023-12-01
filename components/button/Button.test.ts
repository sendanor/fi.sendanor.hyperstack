import {Button, createButton} from "./Button";
import {BUTTON_COMPONENT_NAME} from "./ButtonComponent";

describe('createButton', () => {
    it('should create Button with provided name, text, and eventName', () => {
        const name = 'ButtonName';
        const text = 'Click me';
        const eventName = 'buttonClick';

        const expectedButton: Button = {
            name: name,
            content: [text],
            extend: BUTTON_COMPONENT_NAME,
            meta: {
                eventName: eventName,
            },
        };

        const button: Button = createButton(name, text, eventName);

        expect(button).toEqual(expectedButton);
    });
});