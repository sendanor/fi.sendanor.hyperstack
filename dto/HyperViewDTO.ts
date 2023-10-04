// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { HyperComponentContent } from "./HyperComponentDTO";
import { explainHyperSeoDTOOrUndefined, HyperSeoDTO, isHyperSeoDTOOrUndefined } from "./HyperSeoDTO";
import { explainHyperStyleDTOOrUndefined, HyperStyleDTO, isHyperStyleDTOOrUndefined } from "./HyperStyleDTO";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithName } from "./types/DTOWithName";

export interface HyperViewDTO
    extends
        DTOWithOptionalExtend,
        DTOWithName
{
    readonly name            : string;
    readonly extend         ?: string;
    readonly publicUrl      ?: string;
    readonly language       ?: string;
    readonly seo            ?: HyperSeoDTO;
    readonly style          ?: HyperStyleDTO;
    readonly content        ?: HyperComponentContent;
}

export function createHyperViewDTO (
    name      : string,
    extend    : string | undefined,
    publicUrl : string | undefined,
    language  : string | undefined,
    seo       : HyperSeoDTO | undefined,
    content   : HyperComponentContent | undefined,
    style     : HyperStyleDTO | undefined,
) : HyperViewDTO {
    return {
        name,
        extend,
        publicUrl,
        seo,
        language,
        content,
        style,
    };
}

export function isHyperViewDTO (value: unknown) : value is HyperViewDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'publicUrl',
            'language',
            'seo',
            'style',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
        && isHyperSeoDTOOrUndefined(value?.seo)
        && isHyperStyleDTOOrUndefined(value?.style)
    );
}

export function explainHyperViewDTO (value: any) : string {
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
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("seo", explainHyperSeoDTOOrUndefined(value?.seo))
            , explainProperty("style", explainHyperStyleDTOOrUndefined(value?.style))
        ]
    );
}

export function stringifyHyperViewDTO (value : HyperViewDTO) : string {
    return `HyperViewDTO(${value})`;
}

export function parseHyperViewDTO (value: unknown) : HyperViewDTO | undefined {
    if (isHyperViewDTO(value)) return value;
    return undefined;
}

export function isHyperViewDTOOrUndefined (value: unknown): value is HyperViewDTO | undefined {
    return isUndefined(value) || isHyperViewDTO(value);
}

export function explainHyperViewDTOOrUndefined (value: unknown): string {
    return isHyperViewDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperViewDTO', 'undefined']));
}
