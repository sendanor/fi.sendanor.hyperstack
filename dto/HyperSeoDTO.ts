// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";

export interface HyperSeoDTO {
    readonly title       ?: string;
    readonly description ?: string;
    readonly siteName    ?: string;
}

export function createHyperSeoDTO (
    title       : string | undefined,
    description : string | undefined,
    siteName    : string | undefined,
) : HyperSeoDTO {
    return {
        title,
        description,
        siteName,
    };
}

export function isHyperSeoDTO (value: unknown) : value is HyperSeoDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'title',
            'description',
            'siteName',
        ])
        && isStringOrUndefined(value?.title)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.siteName)
    );
}

export function explainHyperSeoDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'title',
                'description',
                'siteName',
            ])
            , explainProperty("title", explainStringOrUndefined(value?.title))
            , explainProperty("description", explainStringOrUndefined(value?.description))
            , explainProperty("siteName", explainStringOrUndefined(value?.siteName))
        ]
    );
}

export function stringifyHyperSeoDTO (value : HyperSeoDTO) : string {
    return `HyperSeoDTO(${value})`;
}

export function parseHyperSeoDTO (value: unknown) : HyperSeoDTO | undefined {
    if (isHyperSeoDTO(value)) return value;
    return undefined;
}

export function isHyperSeoDTOOrUndefined (value: unknown): value is HyperSeoDTO | undefined {
    return isUndefined(value) || isHyperSeoDTO(value);
}

export function explainHyperSeoDTOOrUndefined (value: unknown): string {
    return isHyperSeoDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperSeoDTO', 'undefined']));
}
