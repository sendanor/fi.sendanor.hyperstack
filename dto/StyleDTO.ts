// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { isUndefined } from "../../../hg/core/types/undefined";
import { BackgroundDTO, explainBackgroundDTOOrUndefined, isBackgroundDTOOrUndefined } from "./BackgroundDTO";
import { BorderDTO, explainMultiBorderDTOOrUndefined, isMultiBorderDTOOrUndefined } from "./BorderDTO";
import { ColorDTO, explainColorDTOOrUndefined, isColorDTOOrUndefined } from "./ColorDTO";
import { explainFontDTOOrUndefined, FontDTO, isFontDTOOrUndefined } from "./FontDTO";
import {
    explainMultiSizeDTOOrUndefined,
    explainSizeDTOOrUndefined, isMultiSizeDTOOrUndefined,
    isSizeDTOOrUndefined,
    SizeDTO
} from "./SizeDTO";
import {
    explainTextDecorationDTOOrUndefined,
    isTextDecorationDTOOrUndefined,
    TextDecorationDTO,
} from "./TextDecorationDTO";

export interface StyleDTO {
    readonly textColor       ?: ColorDTO;
    readonly width           ?: SizeDTO;
    readonly height          ?: SizeDTO;
    readonly margin          ?: SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO];
    readonly padding         ?: SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO];
    readonly border          ?: BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO];
    readonly font            ?: FontDTO;
    readonly textDecoration  ?: TextDecorationDTO;
    readonly background      ?: BackgroundDTO;
}

export function createStyleDTO (
    textColor       : ColorDTO | undefined,
    background      : BackgroundDTO | undefined,
    width           : SizeDTO | undefined,
    height          : SizeDTO | undefined,
    margin          : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
    padding         : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
    border          : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined,
    font            : FontDTO | undefined,
    textDecoration  : TextDecorationDTO | undefined,
) : StyleDTO {
    return {
        ...(textColor !== undefined ? { textColor } : {}),
        ...(background !== undefined ? { background } : {}),
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...(margin !== undefined ? { margin } : {}),
        ...(padding !== undefined ? { padding } : {}),
        ...(border !== undefined ? { border } : {}),
        ...(font !== undefined ? { font } : {}),
        ...(textDecoration !== undefined ? { textDecoration } : {}),
    };
}

export function isStyleDTO ( value: unknown) : value is StyleDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'width',
            'height',
            'textColor',
            'margin',
            'padding',
            'border',
            'font',
            'textDecoration',
            'background',
        ])
        && isColorDTOOrUndefined(value?.textColor)
        && isSizeDTOOrUndefined(value?.width)
        && isSizeDTOOrUndefined(value?.height)
        && isMultiSizeDTOOrUndefined(value?.margin)
        && isMultiSizeDTOOrUndefined(value?.padding)
        && isMultiBorderDTOOrUndefined(value?.border)
        && isFontDTOOrUndefined(value?.font)
        && isTextDecorationDTOOrUndefined(value?.textDecoration)
        && isBackgroundDTOOrUndefined(value?.background)
    );
}

export function explainStyleDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'width',
                'height',
                'textColor',
                'margin',
                'padding',
                'border',
                'font',
                'textDecoration',
                'background',
            ])
            , explainProperty("width", explainSizeDTOOrUndefined(value?.width))
            , explainProperty("height", explainSizeDTOOrUndefined(value?.height))
            , explainProperty("textColor", explainColorDTOOrUndefined(value?.textColor))
            , explainProperty("margin", explainMultiSizeDTOOrUndefined(value?.margin))
            , explainProperty("padding", explainMultiSizeDTOOrUndefined(value?.padding))
            , explainProperty("border", explainMultiBorderDTOOrUndefined(value?.border))
            , explainProperty("font", explainFontDTOOrUndefined(value?.font))
            , explainProperty("textDecoration", explainTextDecorationDTOOrUndefined(value?.textDecoration))
            , explainProperty("background", explainBackgroundDTOOrUndefined(value?.background))
        ]
    );
}

export function stringifyStyleDTO ( value : StyleDTO) : string {
    return `StyleDTO(${value})`;
}

export function parseStyleDTO ( value: unknown) : StyleDTO | undefined {
    if (isStyleDTO(value)) return value;
    return undefined;
}

export function isStyleDTOOrUndefined ( value: unknown): value is StyleDTO | undefined {
    return isUndefined(value) || isStyleDTO(value);
}

export function explainStyleDTOOrUndefined ( value: unknown): string {
    return isStyleDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['StyleDTO', 'undefined']));
}
