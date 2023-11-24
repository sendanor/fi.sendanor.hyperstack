// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperViewDTO, HyperViewDTO } from "../../dto/HyperViewDTO";
import { HyperRedirectView } from "./HyperRedirectView";

export const REDIRECT_VIEW_NAME: string = 'HyperRedirect';

export type HyperRedirectViewDTO = HyperViewDTO;

export function createHyperRedirectViewDTO (
    dto: HyperRedirectView
) : HyperRedirectViewDTO {
    return createHyperViewDTO(
        REDIRECT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        undefined,
        [
        ],
        undefined,
        {
            location: dto.location,
        },
    );
}
