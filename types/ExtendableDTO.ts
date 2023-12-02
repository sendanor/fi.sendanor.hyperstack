// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * Interface for extendable DTOs.
 */
export interface ExtendableDTO {
    readonly name    : string;
    readonly extend ?: string | undefined;
}
