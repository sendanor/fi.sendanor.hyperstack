// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../../hg/core/Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { ExtendableDTO } from "./types/ExtendableDTO";
import { explainComponentContentOrUndefined, ComponentContent, isComponentContentOrUndefined } from "./ComponentDTO";
import { explainSeoDTOOrUndefined, SeoDTO, isSeoDTOOrUndefined } from "./SeoDTO";
import { explainStyleDTOOrUndefined, StyleDTO, isStyleDTOOrUndefined } from "./StyleDTO";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithName } from "./types/DTOWithName";

export interface ViewDTO
    extends
        DTOWithOptionalExtend,
        DTOWithName,
        ExtendableDTO
{
    readonly name            : string;
    readonly extend         ?: string;
    readonly publicUrl      ?: string;
    readonly language       ?: string;
    readonly seo            ?: SeoDTO;
    readonly style          ?: StyleDTO;
    readonly content        ?: ComponentContent;
    readonly meta           ?: ReadonlyJsonObject;
}

export function createViewDTO (
    name      : string,
    extend    : string | undefined,
    publicUrl : string | undefined,
    language  : string | undefined,
    seo       : SeoDTO | undefined,
    content   : ComponentContent | undefined,
    style     : StyleDTO | undefined,
    meta      : ReadonlyJsonObject | undefined,
) : ViewDTO {
    return {
        name,
        extend,
        publicUrl,
        seo,
        language,
        content,
        style,
        meta,
    };
}

export function isViewDTO ( value: unknown) : value is ViewDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'publicUrl',
            'language',
            'seo',
            'style',
            'content',
            'meta',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
        && isSeoDTOOrUndefined(value?.seo)
        && isStyleDTOOrUndefined(value?.style)
        && isComponentContentOrUndefined(value?.content)
        && isReadonlyJsonObjectOrUndefined(value?.meta)
    );
}

export function explainViewDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'publicUrl',
                'language',
                'seo',
                'style',
                'content',
                'meta',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("seo", explainSeoDTOOrUndefined(value?.seo))
            , explainProperty("style", explainStyleDTOOrUndefined(value?.style))
            , explainProperty("content", explainComponentContentOrUndefined(value?.content))
            , explainProperty("meta", explainReadonlyJsonObjectOrUndefined(value?.meta))
        ]
    );
}

export function stringifyViewDTO ( value : ViewDTO) : string {
    return `ViewDTO(${value})`;
}

export function parseViewDTO ( value: unknown) : ViewDTO | undefined {
    if (isViewDTO(value)) return value;
    return undefined;
}

export function isViewDTOOrUndefined ( value: unknown): value is ViewDTO | undefined {
    return isUndefined(value) || isViewDTO(value);
}

export function explainViewDTOOrUndefined ( value: unknown): string {
    return isViewDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ViewDTO', 'undefined']));
}
