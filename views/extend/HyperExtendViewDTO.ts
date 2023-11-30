// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperViewDTO, HyperViewDTO } from "../../dto/HyperViewDTO";
import { HyperExtendView } from "./HyperExtendView";

export const EXTEND_VIEW_NAME: string = 'HyperExtendView';

export type HyperExtendViewDTO = HyperViewDTO;

export function createHyperExtendViewDTO (
    dto: HyperExtendView
) : HyperExtendViewDTO {
    return createHyperViewDTO(
        EXTEND_VIEW_NAME,
        dto.extend,
        undefined,
        undefined,
        undefined,
        [],
        undefined,
        undefined,
    );
}
