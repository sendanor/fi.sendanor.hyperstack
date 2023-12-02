// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNumber, isNumber } from "../../../hg/core/types/Number";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { isUndefined } from "../../../hg/core/types/undefined";
import { explainUnitTypeOrUndefined, isUnitTypeOrUndefined, UnitType } from "../entities/types/UnitType";

export interface SizeDTO {
    readonly value: number;
    readonly unit ?: UnitType;
}

export function createSizeDTO (
    value : number,
    unit  ?: UnitType | undefined,
) : SizeDTO {
    return {
        value,
        ...(unit ? {unit} : {}),
    };
}

export function isSizeDTO (value: unknown) : value is SizeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'value',
            'unit',
        ])
        && isNumber(value?.value)
        && isUnitTypeOrUndefined(value?.unit)
    );
}

export function explainSizeDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'value',
                'unit',
            ])
            , explainProperty("value", explainNumber(value?.value))
            , explainProperty("unit", explainUnitTypeOrUndefined(value?.unit))
        ]
    );
}

export function stringifySizeDTO (value : SizeDTO) : string {
    return `SizeDTO(${value})`;
}

export function parseSizeDTO (value: unknown) : SizeDTO | undefined {
    if (isSizeDTO(value)) return value;
    return undefined;
}

export function isSizeDTOOrUndefined (value: unknown): value is SizeDTO | undefined {
    return isUndefined(value) || isSizeDTO(value);
}

export function explainSizeDTOOrUndefined (value: unknown): string {
    return isSizeDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SizeDTO', 'undefined']));
}
