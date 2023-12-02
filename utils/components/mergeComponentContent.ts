// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isArray } from "../../../../hg/core/types/Array";
import { ComponentContent } from "../../dto/ComponentDTO";

export function mergeComponentContent (
    a: ComponentContent | undefined,
    b: ComponentContent | undefined,
) : ComponentContent {
    return [
        ...(a !== undefined ? ( isArray( a ) ? a : [ a ] ) : []),
        ...(b !== undefined ? ( isArray( b ) ? b : [ b ] ) : []),
    ];
}
