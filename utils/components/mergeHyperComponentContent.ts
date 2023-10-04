// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isArray } from "../../../../hg/core/types/Array";
import { HyperComponentContent } from "../../dto/HyperComponentDTO";

export function mergeHyperComponentContent (
    a: HyperComponentContent | undefined,
    b: HyperComponentContent | undefined,
) : HyperComponentContent {
    return [
        ...(a !== undefined ? ( isArray( a ) ? a : [ a ] ) : []),
        ...(b !== undefined ? ( isArray( b ) ? b : [ b ] ) : []),
    ];
}
