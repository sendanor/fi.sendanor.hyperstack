// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperStyleDTO } from "../../../dto/HyperStyleDTO";
import { createHyperViewDTO, HyperViewDTO } from "../../../dto/HyperViewDTO";
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from "../constants/colors";

export const DEFAULT_VIEW_NAME: string = 'DefaultView';

export type DefaultView = HyperViewDTO;

export function createDefaultView () : DefaultView {
    return createHyperViewDTO(
        DEFAULT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        createHyperStyleDTO(
            DARK_TEXT_COLOR,
            DARK_BACKGROUND_COLOR,
        ),
        undefined,
    );
}
