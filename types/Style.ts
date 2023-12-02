// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { HyperStyleDTO } from "../dto/HyperStyleDTO";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Interface for Style entities.
 */
export interface Style
    extends
        Extendable,
        JsonSerializable
{

    /**
     * Returns the DTO object.
     */
    getDTO () : HyperStyleDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    extend (name : string) : this;

    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

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
