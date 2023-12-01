// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonAny, ReadonlyJsonArray, ReadonlyJsonArrayOf, ReadonlyJsonObject } from "../../../hg/core/Json";
import { isFunction } from "../../../hg/core/types/Function";
import { isObject } from "../../../hg/core/types/Object";
import { TestCallbackNonStandard } from "../../../hg/core/types/TestCallback";
import { HyperComponentDTO } from "../dto/HyperComponentDTO";
import { ComponentEntityContent } from "./ComponentEntity";

export interface Component {
    getName () : string;
    getDTO () : HyperComponentDTO;
    valueOf() : ReadonlyJsonObject;
    toJSON () : ReadonlyJsonObject;
    hasMeta (name : string) : boolean;
    getMeta (name : string) : any | undefined;
    setMeta (value: ReadonlyJsonObject) : this;

    getMetaString (name : string) : string | undefined;
    setMetaString (name : string, value: string) : this;

    getMetaNumber (name : string) : number | undefined;
    setMetaNumber (name : string, value: number) : this;

    getMetaBoolean (name : string) : boolean | undefined;
    setMetaBoolean (name : string, value: boolean) : this;

    getMetaObject (name : string) : ReadonlyJsonObject | null | undefined;
    setMetaObject (name : string, value: ReadonlyJsonObject | null) : this;

    getMetaArray (name : string) : ReadonlyJsonArray | undefined;
    getMetaArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (name : string, isItemOf : TestCallbackNonStandard) : ReadonlyJsonArrayOf<T> | undefined;
    setMetaArray (name : string, value: ReadonlyJsonArray) : this;

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
        && isFunction(value?.hasMeta)
        && isFunction(value?.getMeta)
        && isFunction(value?.setMeta)
        && isFunction(value?.getMetaString)
        && isFunction(value?.setMetaString)
        && isFunction(value?.getMetaNumber)
        && isFunction(value?.setMetaNumber)
        && isFunction(value?.getMetaBoolean)
        && isFunction(value?.setMetaBoolean)
        && isFunction(value?.getMetaObject)
        && isFunction(value?.setMetaObject)
        && isFunction(value?.extend)
        && isFunction(value?.getExtend)
        && isFunction(value?.add)
        && isFunction(value?.addText)
    );
}
