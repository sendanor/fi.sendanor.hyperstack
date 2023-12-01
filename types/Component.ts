// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isFunction } from "../../../hg/core/types/Function";
import { isObject } from "../../../hg/core/types/Object";
import { HyperComponentDTO } from "../dto/HyperComponentDTO";
import { ComponentEntityContent } from "./ComponentEntity";

export interface Component {
    getName () : string;
    getDTO () : HyperComponentDTO;
    valueOf() : ReadonlyJsonObject;
    toJSON () : ReadonlyJsonObject;
    setMeta (value: ReadonlyJsonObject) : this;
    extend (name : string) : this;
    getExtend () : string | undefined;
    add (value : ComponentEntityContent) : this;
    addText (value : string) : this;
}

/**
 * Tries to detect if this value is an interface for Component.
 *
 * This function cannot really detect if the value has the correct interface.
 * It can only detect that the object has a create function.
 *
 * @param value
 */
export function isComponent (value: unknown): value is Component {
    return (
        isObject(value)
        && isFunction(value?.getName)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.setMeta)
        && isFunction(value?.extend)
        && isFunction(value?.getExtend)
        && isFunction(value?.add)
        && isFunction(value?.addText)
    );
}
