// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createStyleDTO } from "../../../dto/StyleDTO";
import { createViewDTO, ViewDTO } from "../../../dto/ViewDTO";
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from "../constants/colors";

export const DEFAULT_VIEW_NAME: string = 'DefaultView';

export type DefaultView = ViewDTO;

export function createDefaultView () : DefaultView {
    return createViewDTO(
        DEFAULT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        createStyleDTO(
            DARK_TEXT_COLOR,
            DARK_BACKGROUND_COLOR,
        ),
        undefined,
    );
}
