// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainArrayOf, isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";
import { ExtendableDTO } from "./types/ExtendableDTO";
import { explainComponentDTO, ComponentDTO, isComponentDTO } from "./ComponentDTO";
import { explainRouteDTO, RouteDTO, isRouteDTO } from "./RouteDTO";
import { explainViewDTO, ViewDTO, isViewDTO } from "./ViewDTO";
import { DTOWithName } from "./types/DTOWithName";
import { DTOWithOptionalExtend } from "./types/DTOWithOptionalExtend";
import { DTOWithOptionalLanguage } from "./types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "./types/DTOWithOptionalPublicUrl";

export interface AppDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalLanguage,
        DTOWithOptionalPublicUrl,
        ExtendableDTO
{
    readonly name       : string;
    readonly components : readonly ComponentDTO[];
    readonly views      : readonly ViewDTO[];
    readonly routes     : readonly RouteDTO[];
    readonly extend    ?: string;
    readonly publicUrl ?: string;
    readonly language  ?: string;
}

export function createAppDTO (
    name       : string,
    extend     : string | undefined,
    routes     : readonly RouteDTO[],
    publicUrl  : string | undefined,
    language   : string | undefined,
    components : readonly ComponentDTO[],
    views      : readonly ViewDTO[],
) : AppDTO {
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

export function isAppDTO ( value: unknown) : value is AppDTO {
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
        && isArrayOf<ComponentDTO>(value?.components, isComponentDTO)
        && isArrayOf<ViewDTO>(value?.views, isViewDTO)
        && isArrayOf<RouteDTO>(value?.routes, isRouteDTO)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
    );
}

export function explainAppDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'routes',
                'publicUrl',
                'language',
                'components',
                'views',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("routes", explainArrayOf<RouteDTO>("RouteDTO", explainRouteDTO, value?.routes, isRouteDTO))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("components", explainArrayOf<ComponentDTO>("ComponentDTO", explainComponentDTO, value?.components, isComponentDTO))
            , explainProperty("views", explainArrayOf<ViewDTO>("ViewDTO", explainViewDTO, value?.views, isViewDTO))
        ]
    );
}

export function stringifyAppDTO ( value : AppDTO) : string {
    return `AppDTO(${value})`;
}

export function parseAppDTO ( value: unknown) : AppDTO | undefined {
    if (isAppDTO(value)) return value;
    return undefined;
}

export function isAppDTOOrUndefined ( value: unknown): value is AppDTO | undefined {
    return isUndefined(value) || isAppDTO(value);
}

export function explainAppDTOOrUndefined ( value: unknown): string {
    return isAppDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['AppDTO', 'undefined']));
}
