// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { ExtendableDTO } from "./types/ExtendableDTO";
import { explainStyleDTOOrUndefined, StyleDTO, isStyleDTOOrUndefined } from "./StyleDTO";
import { DTOWithContent } from "./types/DTOWithContent";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithName } from "./types/DTOWithName";

export type ComponentContent = string | ComponentDTO | readonly (string|ComponentDTO)[];

export function isComponentContent ( value: unknown) : value is ComponentContent {
    return (
        isStringOrComponentDTO(value)
        || isArrayOf<string|ComponentDTO>(value, isStringOrComponentDTO)
    );
}

export function isComponentContentOrUndefined ( value: unknown) : value is ComponentContent | undefined {
    return isUndefined(value) || isComponentContent(value);
}

export function explainComponentContentOrUndefined ( value: unknown): string {
    return isComponentContentOrUndefined(value) ? explainOk() : explainNot(explainOr(['ComponentContent', 'undefined']));
}

export interface ComponentDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithContent<ComponentDTO>,
        ExtendableDTO
{
    readonly name     : string;
    readonly content  : ComponentContent;
    readonly extend  ?: string;
    readonly meta    ?: ReadonlyJsonObject;
    readonly style   ?: StyleDTO;
}

export function createComponentDTO (
    name      : string,
    extend    : string | undefined,
    content   : ComponentContent,
    meta      : ReadonlyJsonObject | undefined,
    style     : StyleDTO | undefined,
) : ComponentDTO {
    return {
        name,
        extend,
        content,
        meta,
        style,
    };
}

export function isComponentDTO ( value: unknown) : value is ComponentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'content',
            'meta',
            'style',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
        && isComponentContentOrUndefined(value?.content)
        && isReadonlyJsonObjectOrUndefined(value?.meta)
        && isStyleDTOOrUndefined(value?.style)
    );
}

export function explainComponentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'content',
                'meta',
                'style',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("content", explainComponentContentOrUndefined(value?.content))
            , explainProperty("meta", explainReadonlyJsonObjectOrUndefined(value?.meta))
            , explainProperty("style", explainStyleDTOOrUndefined(value?.style))
        ]
    );
}

export function stringifyComponentDTO (value : ComponentDTO) : string {
    return `ComponentDTO(${value})`;
}

export function parseComponentDTO (value: unknown) : ComponentDTO | undefined {
    if (isComponentDTO(value)) return value;
    return undefined;
}

export function isComponentDTOOrUndefined (value: unknown): value is ComponentDTO | undefined {
    return isUndefined(value) || isComponentDTO(value);
}

export function explainComponentDTOOrUndefined (value: unknown): string {
    return isComponentDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ComponentDTO', 'undefined']));
}

export type StringOrComponentDTO = string | ComponentContent;

export function isStringOrComponentDTO (value: unknown) : value is StringOrComponentDTO {
    return (
        isString(value)
        || isComponentDTO(value)
    );
}

export function explainStringOrComponentDTO (value: unknown): string {
    return isStringOrComponentDTO(value) ? explainOk() : explainNot(explainOr(['ComponentDTO', 'string']));
}

export function isComponentDTOOrString (value: unknown): value is StringOrComponentDTO {
    return isStringOrComponentDTO(value);
}

export function explainComponentDTOOrString (value: unknown): string {
    return explainStringOrComponentDTO(value);
}
