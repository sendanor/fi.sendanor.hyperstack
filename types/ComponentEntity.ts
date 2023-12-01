// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
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
