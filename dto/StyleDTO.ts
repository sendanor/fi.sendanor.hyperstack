// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import {
    explainStringOrUndefined,
    isStringOrUndefined,
} from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";

export interface StyleDTO {
    readonly textColor       ?: string;
    readonly backgroundColor ?: string;
}

export function getCssStyles (
    style: StyleDTO,
) : ReadonlyJsonObject {
    return {
        ...(style?.textColor ? { color: style?.textColor } : {}),
        ...(style?.backgroundColor ? { backgroundColor: style?.backgroundColor } : {}),
    }
}

export function createStyleDTO (
    textColor       : string | undefined,
    backgroundColor : string | undefined,
) : StyleDTO {
    return {
        textColor,
        backgroundColor,
    };
}

export function isStyleDTO ( value: unknown) : value is StyleDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'textColor',
            'backgroundColor',
        ])
        && isStringOrUndefined(value?.textColor)
        && isStringOrUndefined(value?.backgroundColor)
    );
}

export function explainStyleDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'textColor',
                'backgroundColor',
            ])
            , explainProperty("textColor", explainStringOrUndefined(value?.textColor))
            , explainProperty("backgroundColor", explainStringOrUndefined(value?.backgroundColor))
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
