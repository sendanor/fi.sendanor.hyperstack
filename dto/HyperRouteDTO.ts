// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithName } from "./types/DTOWithName";
import { DTOWithOptionalLanguage } from "./types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "./types/DTOWithOptionalPublicUrl";

export interface HyperRouteDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalPublicUrl,
        DTOWithOptionalLanguage
{
    readonly name       : string;
    readonly path       : string;
    readonly extend    ?: string;
    readonly publicUrl ?: string;
    readonly language  ?: string;
    readonly view      ?: string;
    readonly redirect  ?: string;
}

export function createHyperRouteDTO (
    name      : string,
    path      : string,
    extend    : string | undefined,
    publicUrl : string | undefined,
    language  : string | undefined,
    view      : string | undefined,
    redirect  : string | undefined,
) : HyperRouteDTO {
    return {
        name,
        path,
        extend,
        publicUrl,
        language,
        view,
        redirect,
    };
}

export function isHyperRouteDTO (value: unknown) : value is HyperRouteDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'path',
            'extend',
            'publicUrl',
            'language',
            'view',
            'redirect',
        ])
        && isString(value?.name)
        && isString(value?.path)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
        && isStringOrUndefined(value?.view)
        && isStringOrUndefined(value?.redirect)
    );
}

export function explainHyperRouteDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'path',
                'extend',
                'publicUrl',
                'language',
                'view',
                'redirect',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("path", explainString(value?.path))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("view", explainStringOrUndefined(value?.view))
            , explainProperty("redirect", explainStringOrUndefined(value?.redirect))
        ]
    );
}

export function stringifyHyperRouteDTO (value : HyperRouteDTO) : string {
    return `HyperRouteDTO(${value})`;
}

export function parseHyperRouteDTO (value: unknown) : HyperRouteDTO | undefined {
    if (isHyperRouteDTO(value)) return value;
    return undefined;
}

export function isHyperRouteDTOOrUndefined (value: unknown): value is HyperRouteDTO | undefined {
    return isUndefined(value) || isHyperRouteDTO(value);
}

export function explainHyperRouteDTOOrUndefined (value: unknown): string {
    return isHyperRouteDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperRouteDTO', 'undefined']));
}
