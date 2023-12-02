// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { ExtendableDTO } from "../types/ExtendableDTO";

export interface HyperStyleDTO extends ExtendableDTO {
    readonly name             : string;
    readonly extend          ?: string;
    readonly textColor       ?: string;
    readonly backgroundColor ?: string;
}

export function getCssStyles (
    style: HyperStyleDTO,
) : ReadonlyJsonObject {
    return {
        ...(style?.textColor ? { color: style?.textColor } : {}),
        ...(style?.backgroundColor ? { backgroundColor: style?.backgroundColor } : {}),
    }
}

export function createHyperStyleDTO (
    name            : string,
    extend          : string | undefined,
    textColor       : string | undefined,
    backgroundColor : string | undefined,
) : HyperStyleDTO {
    return {
        name,
        extend,
        textColor,
        backgroundColor,
    };
}

export function isHyperStyleDTO (value: unknown) : value is HyperStyleDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'textColor',
            'backgroundColor',
        ])
        && isStringOrUndefined(value?.name)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.textColor)
        && isStringOrUndefined(value?.backgroundColor)
    );
}

export function explainHyperStyleDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'textColor',
                'backgroundColor',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainString(value?.extend))
            , explainProperty("textColor", explainString(value?.textColor))
            , explainProperty("backgroundColor", explainString(value?.backgroundColor))
        ]
    );
}

export function stringifyHyperStyleDTO (value : HyperStyleDTO) : string {
    return `HyperStyleDTO(${value})`;
}

export function parseHyperStyleDTO (value: unknown) : HyperStyleDTO | undefined {
    if (isHyperStyleDTO(value)) return value;
    return undefined;
}

export function isHyperStyleDTOOrUndefined (value: unknown): value is HyperStyleDTO | undefined {
    return isUndefined(value) || isHyperStyleDTO(value);
}

export function explainHyperStyleDTOOrUndefined (value: unknown): string {
    return isHyperStyleDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperStyleDTO', 'undefined']));
}
