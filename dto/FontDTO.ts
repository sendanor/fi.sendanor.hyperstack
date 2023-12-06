// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { explainFontStyleOrUndefined, FontStyle, isFontStyleOrUndefined } from "../entities/types/FontStyle";
import { explainFontVariantOrUndefined, FontVariant, isFontVariantOrUndefined } from "../entities/types/FontVariant";
import { explainFontWeightOrUndefined, FontWeight, isFontWeightOrUndefined } from "../entities/types/FontWeight";
import { explainSizeDTOOrUndefined, isSizeDTOOrUndefined, SizeDTO } from "./SizeDTO";

export interface FontDTO {
    readonly style ?: FontStyle;
    readonly variant ?: FontVariant;
    readonly weight ?: FontWeight;
    readonly size ?: SizeDTO;
    readonly lineHeight ?: SizeDTO;
    readonly family ?: string;
}

export function createFontDTO (
    style : FontStyle | undefined,
    variant : FontVariant | undefined,
    weight : FontWeight | undefined,
    size : SizeDTO | undefined,
    lineHeight : SizeDTO | undefined,
    family : string | undefined,
) : FontDTO {
    return {
        ...(style !== undefined ? {style}: {}),
        ...(variant !== undefined ? {variant}: {}),
        ...(weight !== undefined ? {weight}: {}),
        ...(size !== undefined ? {size}: {}),
        ...(lineHeight !== undefined ? {lineHeight}: {}),
        ...(family !== undefined ? {family}: {}),
    };
}

export function isFontDTO (value: unknown) : value is FontDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'style',
            'variant',
            'weight',
            'size',
            'lineHeight',
            'family',
        ])
        && isFontStyleOrUndefined(value?.style)
        && isFontVariantOrUndefined(value?.variant)
        && isFontWeightOrUndefined(value?.weight)
        && isSizeDTOOrUndefined(value?.size)
        && isSizeDTOOrUndefined(value?.lineHeight)
        && isStringOrUndefined(value?.family)
    );
}

export function explainFontDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'style',
                'variant',
                'weight',
                'size',
                'lineHeight',
                'family',
            ])
            , explainProperty("style", explainFontStyleOrUndefined(value?.style))
            , explainProperty("variant", explainFontVariantOrUndefined(value?.variant))
            , explainProperty("weight", explainFontWeightOrUndefined(value?.weight))
            , explainProperty("size", explainSizeDTOOrUndefined(value?.size))
            , explainProperty("lineHeight", explainSizeDTOOrUndefined(value?.lineHeight))
            , explainProperty("family", explainStringOrUndefined(value?.family))
        ]
    );
}

export function stringifyFontDTO (value : FontDTO) : string {
    return `FontDTO(${value})`;
}

export function parseFontDTO (value: unknown) : FontDTO | undefined {
    if (isFontDTO(value)) return value;
    return undefined;
}

export function isFontDTOOrUndefined (value: unknown): value is FontDTO | undefined {
    return isUndefined(value) || isFontDTO(value);
}

export function explainFontDTOOrUndefined (value: unknown): string {
    return isFontDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FontDTO', 'undefined']));
}
