// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../../hg/core/types/RegularObject";
import { explainString, isString } from "../../../../hg/core/types/String";
import { isUndefined } from "../../../../hg/core/types/undefined";

/**
 * View to redirect the frontend to another view or URL.
 *
 * This is required since the frontend usually cannot detect the Location HTTP
 * header, e.g. the HTTP client library already implements the redirection.
 */
export interface HyperExtendView {
    readonly extend: string;
}

export function createHyperExtendView (
    extend : string
) : HyperExtendView {
    return {
        extend
    };
}

export function isHyperExtendView (value: unknown) : value is HyperExtendView {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'extend',
        ])
        && isString(value?.extend)
    );
}

export function explainHyperExtendView (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'extend',
            ])
            , explainProperty("extend", explainString(value?.extend))
        ]
    );
}

export function stringifyHyperExtendView (value : HyperExtendView) : string {
    return `HyperExtendView(${value})`;
}

export function parseHyperExtendView (value: unknown) : HyperExtendView | undefined {
    if (isHyperExtendView(value)) return value;
    return undefined;
}

export function isHyperExtendViewOrUndefined (value: unknown): value is HyperExtendView | undefined {
    return isUndefined(value) || isHyperExtendView(value);
}

export function explainHyperExtendViewOrUndefined (value: unknown): string {
    return isHyperExtendViewOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperExtendView', 'undefined']));
}
