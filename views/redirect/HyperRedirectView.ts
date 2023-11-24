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
export interface HyperRedirectView {
    readonly location: string;
}

export function createHyperRedirectView (
    location : string
) : HyperRedirectView {
    return {
        location
    };
}

export function isHyperRedirectView (value: unknown) : value is HyperRedirectView {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'location',
        ])
        && isString(value?.location)
    );
}

export function explainHyperRedirectView (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'location',
            ])
            , explainProperty("location", explainString(value?.location))
        ]
    );
}

export function stringifyHyperRedirectView (value : HyperRedirectView) : string {
    return `HyperRedirectView(${value})`;
}

export function parseHyperRedirectView (value: unknown) : HyperRedirectView | undefined {
    if (isHyperRedirectView(value)) return value;
    return undefined;
}

export function isHyperRedirectViewOrUndefined (value: unknown): value is HyperRedirectView | undefined {
    return isUndefined(value) || isHyperRedirectView(value);
}

export function explainHyperRedirectViewOrUndefined (value: unknown): string {
    return isHyperRedirectViewOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperRedirectView', 'undefined']));
}
