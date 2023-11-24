// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperViewDTO, HyperViewDTO } from "../../../dto/HyperViewDTO";
import { createText } from "../components/Text";
import { DEFAULT_VIEW_NAME } from "./DefaultView";

export const LOADING_VIEW_NAME: string = 'LoadingView';

export type LoadingView = HyperViewDTO;

export function createLoadingView () : LoadingView {
    return createHyperViewDTO(
        LOADING_VIEW_NAME,
        DEFAULT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        [
            createText('loadingText', '...loading...'),
        ],
        undefined,
        undefined,
    );
}
