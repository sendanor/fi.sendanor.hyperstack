// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { ComponentDTO } from "../dto/ComponentDTO";
import { ViewDTO } from "../dto/ViewDTO";
import { ComponentEntity } from "./ComponentEntity";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Interface for Hyper views.
 */
export interface View
 extends
     Extendable,
     JsonSerializable
{

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
    getName () : string;

    /**
     * @inheritDoc
     */
    extend (name : string) : this;

    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

    /**
     *
     */
    getDTO () : ViewDTO;

    /**
     * Add inner content.
     *
     * @param value
     */
    add (value : string | ComponentDTO | readonly (string|ComponentDTO|ComponentEntity)[] | ComponentEntity ) : this;

    /**
     * Add inner text content.
     *
     * @param value
     */
    addText (value : string) : this;

    /**
     *
     */
    getLanguage () : string | undefined;

    /**
     *
     * @param value
     */
    setLanguage (value : string) : this;

    /**
     *
     */
    getPublicUrl () : string | undefined;

    /**
     *
     * @param value
     */
    setPublicUrl (value : string) : this;

    /**
     *
     * @param value
     */
    setMeta (value: ReadonlyJsonObject) : this;

    /**
     * Set automatic refresh of the view after a timeout.
     *
     * See also `.setTimestamp()`.
     *
     * @param value
     */
    setRefresh (value: number) : this;

    /**
     * Set automatic refresh of the view after a timeout.
     *
     * @param value
     */
    setIntervalRefresh (value: number) : this;

    /**
     * Set timestamp of the view.
     *
     * This should be in ISO format like `'2023-11-29T21:38:38.483Z'`.
     *
     * Together with `.setRefresh()` this enables the view to update by intervals.
     *
     * @param value
     */
    setTimestamp (value: string) : this;

}
