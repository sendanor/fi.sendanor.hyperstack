// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isHyperViewDTO } from "../dto/HyperViewDTO";
import { HyperDTO } from "../dto/HyperDTO";
import { HttpService } from "../../../hg/core/HttpService";
import { LogService } from "../../../hg/core/LogService";
import { ReadonlyJsonAny } from "../../../hg/core/Json";
import { isHyperComponentDTO } from "../dto/HyperComponentDTO";
import { isHyperRouteDTO } from "../dto/HyperRouteDTO";

const LOG = LogService.createLogger('HttpService');

export async function populateHyperDTO (
    hyper: HyperDTO,
    baseUrl: string = 'https://localhost:3001'
): Promise<HyperDTO> {
    const newHyper = JSON.parse(JSON.stringify(hyper));

    for (const view of hyper.views) {
        newHyper.views.push(view);
        let extend: string | undefined = view.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend)
    
            if ( !isHyperViewDTO(response) ) {
                LOG.debug(`response = `, response);
                throw new TypeError(`Response was not HyperViewDTO`);
            }
            newHyper.views.push(response);
        }
    }

    for (const component of hyper.components) {
        newHyper.components.push(component);
        let extend: string | undefined = component.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend)
    
            if ( !isHyperComponentDTO(response) ) {
                LOG.debug(`response = `, response);
                throw new TypeError(`Response was not HyperComponentDTO`);
            }
            newHyper.components.push(response);
        }
    }

    for (const route of hyper.routes) {
        newHyper.routes.push(route);
        let extend: string | undefined = route.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend)
    
            if ( !isHyperRouteDTO(response) ) {
                LOG.debug(`response = `, response);
                throw new TypeError(`Response was not HyperRouteDTO`);
            }
            newHyper.routes.push(response);
        }
    }

    return newHyper;
}