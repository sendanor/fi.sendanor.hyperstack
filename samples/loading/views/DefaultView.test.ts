import { createDefaultView, DEFAULT_VIEW_NAME } from './DefaultView';
import { createHyperStyleDTO, HyperStyleDTO } from '../../../dto/HyperStyleDTO';
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from '../constants/colors';

describe('createDefaultView', () => {
    test('creates a valid DefaultView HyperViewDTO', () => {
        const defaultView = createDefaultView();

        expect(defaultView).toBeDefined();
        expect(defaultView.name).toBe(DEFAULT_VIEW_NAME);

        const expectedStyle: HyperStyleDTO = createHyperStyleDTO(DARK_TEXT_COLOR, DARK_BACKGROUND_COLOR);
        expect(defaultView.style).toEqual(expectedStyle);
    });
});