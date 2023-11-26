// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { isArray } from "../../../hg/core/types/Array";
import { HyperComponentContent, HyperComponentDTO } from "../dto/HyperComponentDTO";
import { createHyperViewDTO, HyperViewDTO } from "../dto/HyperViewDTO";
import { ComponentEntity, isComponentEntity } from "./ComponentEntity";

export class ViewEntity {

    protected _name : string;
    protected _extend : string | undefined;
    protected _content : HyperComponentContent | undefined;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._content = undefined;
    }

    public getName () : string {
        return this._name;
    }

    public getDTO () : HyperViewDTO {
        return createHyperViewDTO(
            this._name,
            this._extend,
            undefined,
            undefined,
            undefined,
            this._content ?? [],
            undefined,
            undefined,
        );
    }

    public extend (name : string) : this {
        this._extend = name;
        return this;
    }

    public add (value : string | HyperComponentDTO | readonly (string|HyperComponentDTO|ComponentEntity)[] | ComponentEntity ) : this {

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

    public static create (name : string) : ViewEntity {
        return new ViewEntity(
            name,
        );
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}

