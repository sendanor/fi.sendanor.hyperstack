// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { DTOWithContent } from "./types/DTOWithContent";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithName } from "./types/DTOWithName";

export type HyperComponentContent = string | HyperComponentDTO | readonly (string|HyperComponentDTO)[];

export function isStringOrHyperComponentDTO (value: unknown) : value is string | HyperComponentContent {
    return isString(value) || isHyperComponentDTO(value);
}

export function isHyperComponentContent (value: unknown) : value is HyperComponentContent {
    return isStringOrHyperComponentDTO(value) || isArrayOf<string|HyperComponentDTO>(value, isStringOrHyperComponentDTO);
}

export function isHyperComponentContentOrUndefined (value: unknown) : value is HyperComponentContent | undefined {
    return isUndefined(value) || isHyperComponentContent(value);
}

export function explainHyperComponentContentOrUndefined (value: unknown): string {
    return isHyperComponentContentOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperComponentContent', 'undefined']));
}

export interface HyperComponentDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithContent<HyperComponentDTO>
{
    readonly name     : string;
    readonly content  : HyperComponentContent;
    readonly extend  ?: string;
}

export function createHyperComponentDTO (
    name      : string,
    extend    : string | undefined,
    content   : HyperComponentContent,
) : HyperComponentDTO {
    return {
        name,
        extend,
        content,
    };
}

export function isHyperComponentDTO (value: unknown) : value is HyperComponentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'content',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
    );
}

export function explainHyperComponentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'content',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
        ]
    );
}

export function stringifyHyperComponentDTO (value : HyperComponentDTO) : string {
    return `HyperComponentDTO(${value})`;
}

export function parseHyperComponentDTO (value: unknown) : HyperComponentDTO | undefined {
    if (isHyperComponentDTO(value)) return value;
    return undefined;
}

export function isHyperComponentDTOOrUndefined (value: unknown): value is HyperComponentDTO | undefined {
    return isUndefined(value) || isHyperComponentDTO(value);
}

export function explainHyperComponentDTOOrUndefined (value: unknown): string {
    return isHyperComponentDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperComponentDTO', 'undefined']));
}
