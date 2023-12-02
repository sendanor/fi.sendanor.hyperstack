// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTOWithName } from "./DTOWithName";
import { DTOWithOptionalExtend } from "./DTOWithOptionalExtend";

/**
 * Interface for extendable DTOs.
 */
export interface ExtendableDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend
{

    /**
     * @inheritDoc
     */
    readonly name    : string;

    /**
     * @inheritDoc
     */
    readonly extend ?: string | undefined;

}
