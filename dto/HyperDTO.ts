// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainArrayOf, isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { explainHyperComponentDTO, HyperComponentDTO, isHyperComponentDTO } from "./HyperComponentDTO";
import { explainHyperRouteDTO, HyperRouteDTO, isHyperRouteDTO } from "./HyperRouteDTO";
import { explainHyperViewDTO, HyperViewDTO, isHyperViewDTO } from "./HyperViewDTO";
import { DTOWithName } from "./types/DTOWithName";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithOptionalLanguage } from "./types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "./types/DTOWithOptionalPublicUrl";

export interface HyperDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalLanguage,
        DTOWithOptionalPublicUrl {
    readonly name       : string;
    readonly extend    ?: string;
    readonly components : readonly HyperComponentDTO[];
    readonly views      : readonly HyperViewDTO[];
    readonly routes     : readonly HyperRouteDTO[];
    readonly publicUrl ?: string;
    readonly language  ?: string;
}

export function createHyperDTO (
    name       : string,
    extend     : string | undefined,
    routes     : readonly HyperRouteDTO[],
    publicUrl  : string | undefined,
    language   : string | undefined,
    components : readonly HyperComponentDTO[],
    views      : readonly HyperViewDTO[],
) : HyperDTO {
    return {
        name,
        extend,
        publicUrl,
        language,
        routes,
        components,
        views,
    };
}

export function isHyperDTO (value: unknown) : value is HyperDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'components',
            'views',
            'routes',
            'extend',
            'publicUrl',
            'language',
        ])
        && isString(value?.name)
        && isArrayOf<HyperComponentDTO>(value?.components, isHyperComponentDTO)
        && isArrayOf<HyperViewDTO>(value?.views, isHyperViewDTO)
        && isArrayOf<HyperRouteDTO>(value?.routes, isHyperRouteDTO)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
    );
}

export function explainHyperDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'components',
                'views',
                'routes',
                'extend',
                'publicUrl',
                'language',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("components", explainArrayOf<HyperComponentDTO>("HyperComponentDTO", explainHyperComponentDTO, value?.components, isHyperComponentDTO))
            , explainProperty("views", explainArrayOf<HyperViewDTO>("HyperViewDTO", explainHyperViewDTO, value?.views, isHyperViewDTO))
            , explainProperty("routes", explainArrayOf<HyperRouteDTO>("HyperRouteDTO", explainHyperRouteDTO, value?.routes, isHyperRouteDTO))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
        ]
    );
}

export function stringifyHyperDTO (value : HyperDTO) : string {
    return `HyperDTO(${value})`;
}

export function parseHyperDTO (value: unknown) : HyperDTO | undefined {
    if (isHyperDTO(value)) return value;
    return undefined;
}

export function isHyperDTOOrUndefined (value: unknown): value is HyperDTO | undefined {
    return isUndefined(value) || isHyperDTO(value);
}

export function explainHyperDTOOrUndefined (value: unknown): string {
    return isHyperDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperDTO', 'undefined']));
}
