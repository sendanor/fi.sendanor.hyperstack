// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { has } from "../../../hg/core/functions/has";
import { map } from "../../../hg/core/functions/map";
import { isReadonlyJsonArray, isReadonlyJsonArrayOf, isReadonlyJsonObject, ReadonlyJsonAny, ReadonlyJsonArray, ReadonlyJsonArrayOf, ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { isBoolean } from "../../../hg/core/types/Boolean";
import { isNumber } from "../../../hg/core/types/Number";
import { isString } from "../../../hg/core/types/String";
import { TestCallbackNonStandard } from "../../../hg/core/types/TestCallback";
import { createHyperComponentDTO, HyperComponentContent, HyperComponentDTO } from "../dto/HyperComponentDTO";
import { Component } from "./Component";

export type ComponentEntityContent = string | ComponentEntity | HyperComponentDTO | readonly (string|ComponentEntity|HyperComponentDTO)[];

export class ComponentEntity implements Component {

    protected _name : string;
    protected _extend : string | undefined;
    protected _content : HyperComponentContent | undefined;
    protected _meta : ReadonlyJsonObject | undefined;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._content = undefined;
        this._meta = undefined;
    }


    public getName () : string {
        return this._name;
    }

    public getDTO () : HyperComponentDTO {
        return createHyperComponentDTO(
            this._name,
            this._extend,
            this._content ?? [],
            this._meta,
        );
    }

    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    public hasMeta (name : string) : boolean {
        return this._meta ? has(this._meta, name) : false;
    }

    public getMeta (name : string) : ReadonlyJsonAny | undefined {
        return this._meta && has(this._meta, name) ? this._meta[name] as ReadonlyJsonAny : undefined;
    }

    public setMeta (value: ReadonlyJsonObject) : this {
        if (this._meta) {
            this._meta = {
                ...this._meta,
                ...value,
            };
        } else {
            this._meta = {
                ...value,
            };
        }
        return this;
    }

    public getMetaString (name : string) : string | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isString(value) ? value : undefined;
    }

    public setMetaString (name : string, value: string) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    public getMetaBoolean (name : string) : boolean | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isBoolean(value) ? value : undefined;
    }

    public setMetaBoolean (name : string, value: boolean) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    public getMetaNumber (name : string) : number | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isNumber(value) ? value : undefined;
    }

    public setMetaNumber (name : string, value: number) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    public getMetaObject (name : string) : ReadonlyJsonObject | null | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonObject(value) ? value : undefined;
    }

    public setMetaObject (name : string, value: ReadonlyJsonObject | null) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    public getMetaArray (
        name : string,
    ) : ReadonlyJsonArray | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonArray(value) ? value : undefined;
    }

    public getMetaArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
        name : string,
        isItemOf : TestCallbackNonStandard,
    ) : ReadonlyJsonArrayOf<T> | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonArrayOf<T>(value, isItemOf) ? value : undefined;
    }

    public setMetaArray<T extends ReadonlyJsonAny = ReadonlyJsonAny> (name : string, value: ReadonlyJsonArrayOf<T> | null) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    public extend (name : string) : this {
        this._extend = name;
        return this;
    }

    public getExtend () : string | undefined {
        return this._extend;
    }

    public add (value : ComponentEntityContent) : this {

        if (isComponentEntity(value)) {
            value = [value.getDTO()];
        } else if (!isArray(value)) {
            value = [value];
        }

        const list : readonly (string | HyperComponentDTO)[] = map(
            value,
            (item : string | HyperComponentDTO | ComponentEntity) : string | HyperComponentDTO => isComponentEntity( item ) ? item.getDTO() : item
        ) as readonly (string | HyperComponentDTO)[];

        if (this._content === undefined) {
            this._content = list;
        } else if (!isArray(this._content)) {
            this._content = [this._content, ...list];
        } else {
            this._content = [...this._content, ...list];
        }

        return this;
    }

    public addText (value : string) : this {
        return this.add(value);
    }


    public static create (name : string) : ComponentEntity {
        return new this(name);
    }

}

export function isComponentEntity (value: unknown): value is ComponentEntity {
    return value instanceof ComponentEntity;
}
