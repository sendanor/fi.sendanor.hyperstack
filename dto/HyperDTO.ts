// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainArrayOf, isArrayOf } from "../../../hg/core/types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { isUndefined } from "../../../hg/core/types/undefined";
import { explainHyperAppDTO, HyperAppDTO, isHyperAppDTO } from "./HyperAppDTO";
import { explainHyperComponentDTO, HyperComponentDTO, isHyperComponentDTO } from "./HyperComponentDTO";
import { explainHyperViewDTO, HyperViewDTO, isHyperViewDTO } from "./HyperViewDTO";

export interface HyperDTO {
    readonly components : readonly HyperComponentDTO[];
    readonly views      : readonly HyperViewDTO[];
    readonly apps       : readonly HyperAppDTO[];
}

export function createHyperDTO (
    components : readonly HyperComponentDTO[],
    views      : readonly HyperViewDTO[],
    apps       : readonly HyperAppDTO[],
) : HyperDTO {
    return {
        components,
        views,
        apps,
    };
}

export function isHyperDTO (value: unknown) : value is HyperDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'components',
            'views',
            'apps',
        ])
        && isArrayOf<HyperComponentDTO>(value?.components, isHyperComponentDTO)
        && isArrayOf<HyperViewDTO>(value?.views, isHyperViewDTO)
        && isArrayOf<HyperAppDTO>(value?.apps, isHyperAppDTO)
    );
}

export function explainHyperDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'components',
                'views',
                'apps',
            ])
            , explainProperty("components", explainArrayOf<HyperComponentDTO>("HyperComponentDTO", explainHyperComponentDTO, value?.components, isHyperComponentDTO))
            , explainProperty("views", explainArrayOf<HyperViewDTO>("HyperViewDTO", explainHyperViewDTO, value?.views, isHyperAppDTO))
            , explainProperty("apps", explainArrayOf<HyperAppDTO>("HyperAppDTO", explainHyperAppDTO, value?.apps, isHyperAppDTO))
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
