// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { StyleDTO } from "../../dto/StyleDTO";
import { ColorEntity } from "../ColorEntity";
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
    getTextColor () : ColorEntity | undefined;

    /**
     * Set text color.
     *
     * @param value
     */
    setTextColor (value: ColorEntity | undefined) : this;

    /**
     * Get background color
     */
    getBackgroundColor () : ColorEntity | undefined;

    /**
     * Set background color.
     *
     * @param value
     */
    setBackgroundColor (value: ColorEntity | undefined) : this;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

}
