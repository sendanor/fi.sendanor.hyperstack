// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Presents a color value
 */
export interface Color extends JsonSerializable {

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get a value.
     */
    getValue () : string;

    /**
     * Set a value.
     *
     * @param value
     */
    setValue (value : string ) : this;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

}
