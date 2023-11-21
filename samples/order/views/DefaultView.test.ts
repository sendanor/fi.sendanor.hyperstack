import { createDefaultView } from './DefaultView';
import { createHyperStyleDTO } from '../../../dto/HyperStyleDTO';
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from '../constants/colors';

describe('createDefaultView', () => {
    test('creates a valid DefaultView HyperViewDTO', () => {
        const defaultView = createDefaultView();

        expect(defaultView).toBeDefined();
        expect(defaultView.name).toBe('DefaultView');

        const expectedStyle = createHyperStyleDTO(DARK_TEXT_COLOR, DARK_BACKGROUND_COLOR);
        expect(defaultView.style).toEqual(expectedStyle);
    });
});