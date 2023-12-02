// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { SizeDTO } from "../../dto/SizeDTO";
import { JsonSerializable } from "./JsonSerializable";
import { Style } from "./Style";
import { UnitType } from "./UnitType";

/**
 * Presents a color value
 */
export interface Size extends JsonSerializable {

    /**
     * Returns the DTO object.
     */
    getDTO () : SizeDTO;

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

export function isSize (value : unknown) : value is Size {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getValue)
        && isFunction(value?.setValue)
        && isFunction(value?.getUnitType)
        && isFunction(value?.getCssStyles)
    );
}

