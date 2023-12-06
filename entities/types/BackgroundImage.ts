// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { BackgroundImageDTO } from "../../dto/BackgroundImageDTO";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Presents a background image value
 */
export interface BackgroundImage extends JsonSerializable {

    /**
     * Returns the DTO object.
     */
    getDTO () : BackgroundImageDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

    /**
     * Get url.
     */
    getUrl () : string;

    /**
     * Set image by URL.
     *
     * @param value
     * @param unit
     */
    url (value : string) : this;

}

export function isBackgroundImage (value : unknown) : value is BackgroundImage {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getUrl)
        && isFunction(value?.url)
    );
}

