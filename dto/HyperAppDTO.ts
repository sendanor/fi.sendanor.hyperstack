// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainArrayOf, isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { explainHyperRouteDTO, HyperRouteDTO, isHyperRouteDTO } from "./HyperRouteDTO";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithOptionalLanguage } from "./types/DTOWithOptionalLanguage";
import { DTOWithName } from "./types/DTOWithName";
import { DTOWithOptionalPublicUrl } from "./types/DTOWithOptionalPublicUrl";

export interface HyperAppDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalLanguage,
        DTOWithOptionalPublicUrl
{
    readonly name       : string;
    readonly routes     : readonly HyperRouteDTO[];
    readonly extend    ?: string;
    readonly publicUrl ?: string;
    readonly language  ?: string;
}

export function createHyperAppDTO (
    name      : string,
    extend    : string | undefined,
    routes    : readonly HyperRouteDTO[],
    publicUrl : string | undefined,
    language  : string | undefined,
) : HyperAppDTO {
    return {
        name,
        extend,
        publicUrl,
        language,
        routes,
    };
}

export function isHyperAppDTO (value: unknown) : value is HyperAppDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'publicUrl',
            'language',
            'routes',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
        && isArrayOf<HyperRouteDTO>(value?.routes, isHyperRouteDTO)
    );
}

export function explainHyperAppDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'publicUrl',
                'language',
                'routes',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("isStringOrUndefined", explainStringOrUndefined(value?.isStringOrUndefined))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("routes", explainArrayOf<HyperRouteDTO>("HyperRouteDTO", explainHyperRouteDTO, value?.routes, isHyperRouteDTO))
        ]
    );
}

export function stringifyHyperAppDTO (value : HyperAppDTO) : string {
    return `HyperAppDTO(${value})`;
}

export function parseHyperAppDTO (value: unknown) : HyperAppDTO | undefined {
    if (isHyperAppDTO(value)) return value;
    return undefined;
}

export function isHyperAppDTOOrUndefined (value: unknown): value is HyperAppDTO | undefined {
    return isUndefined(value) || isHyperAppDTO(value);
}

export function explainHyperAppDTOOrUndefined (value: unknown): string {
    return isHyperAppDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperAppDTO', 'undefined']));
}
