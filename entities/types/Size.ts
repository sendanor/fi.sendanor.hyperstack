// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { JsonSerializable } from "./JsonSerializable";
import { UnitType } from "./UnitType";

/**
 * Presents a color value
 */
export interface Size extends JsonSerializable {

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
    getValue () : number;

    /**
     * Set a value.
     *
     * @param value
     * @param unit
     */
    setValue (
        value : number,
        unit  ?: UnitType | undefined,
    ) : this;

    /**
     * Get unit type.
     */
    getUnitType () : UnitType;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

}
