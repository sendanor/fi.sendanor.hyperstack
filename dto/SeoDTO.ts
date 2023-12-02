// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { ExtendableDTO } from "./types/ExtendableDTO";

export interface SeoDTO {
    readonly title       ?: string;
    readonly description ?: string;
    readonly siteName    ?: string;
}

export function createSeoDTO (
    title       : string | undefined,
    description : string | undefined,
    siteName    : string | undefined,
) : SeoDTO {
    return {
        title,
        description,
        siteName,
    };
}

export function isSeoDTO ( value: unknown) : value is SeoDTO {
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

export function explainSeoDTO ( value: any) : string {
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

export function stringifySeoDTO ( value : SeoDTO) : string {
    return `SeoDTO(${value})`;
}

export function parseSeoDTO ( value: unknown) : SeoDTO | undefined {
    if (isSeoDTO(value)) return value;
    return undefined;
}

export function isSeoDTOOrUndefined ( value: unknown): value is SeoDTO | undefined {
    return isUndefined(value) || isSeoDTO(value);
}

export function explainSeoDTOOrUndefined ( value: unknown): string {
    return isSeoDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SeoDTO', 'undefined']));
}
