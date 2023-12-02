// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { StyleDTO } from "../../dto/StyleDTO";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Interface for Style entities.
 */
export interface Style
    extends
        JsonSerializable
{

    /**
     * Returns the DTO object.
     */
    getDTO () : StyleDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get text color.
     */
    getTextColor () : string | undefined;

    /**
     * Set text color.
     *
     * @param value
     */
    setTextColor (value: string | undefined) : this;

    /**
     * Get background color
     */
    getBackgroundColor () : string | undefined;

    /**
     * Set background color.
     *
     * @param value
     */
    setBackgroundColor (value: string | undefined) : this;

}
