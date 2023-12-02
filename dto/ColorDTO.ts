// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, isString } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";

export interface ColorDTO {
    readonly value: string;
}

export function createColorDTO (
    value : string
) : ColorDTO {
    return {
        value
    };
}

export function isColorDTO (value: unknown) : value is ColorDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'value',
        ])
        && isString(value?.value)
    );
}

export function explainColorDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'value',
            ])
            , explainProperty("value", explainString(value?.value))
        ]
    );
}

export function stringifyColorDTO (value : ColorDTO) : string {
    return `ColorDTO(${value})`;
}

export function parseColorDTO (value: unknown) : ColorDTO | undefined {
    if (isColorDTO(value)) return value;
    return undefined;
}

export function isColorDTOOrUndefined (value: unknown): value is ColorDTO | undefined {
    return isUndefined(value) || isColorDTO(value);
}

export function explainColorDTOOrUndefined (value: unknown): string {
    return isColorDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ColorDTO', 'undefined']));
}
