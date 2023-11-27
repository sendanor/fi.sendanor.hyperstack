// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { HyperComponentContent, HyperComponentDTO } from "../dto/HyperComponentDTO";
import { HyperSeoDTO } from "../dto/HyperSeoDTO";
import { HyperStyleDTO } from "../dto/HyperStyleDTO";
import { createHyperViewDTO, HyperViewDTO } from "../dto/HyperViewDTO";
import { ComponentEntity, isComponentEntity } from "./ComponentEntity";

export class ViewEntity {

    protected _name : string;
    protected _extend : string | undefined;
    protected _publicUrl : string | undefined;
    protected _language : string | undefined;
    protected _seo : HyperSeoDTO | undefined;
    protected _style : HyperStyleDTO | undefined;
    protected _content : HyperComponentContent | undefined;
    protected _meta : ReadonlyJsonObject | undefined;

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
            this._publicUrl,
            this._language,
            this._seo,
            this._content ?? [],
            this._style,
            this._meta,
        );
    }

    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
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

    public getLanguage () : string | undefined {
        return this._language;
    }

    public setLanguage (value : string) : this {
        this._language = value;
        return this;
    }

    public getPublicUrl () : string | undefined {
        return this._publicUrl;
    }

    public setPublicUrl (value : string) : this {
        this._publicUrl = value;
        return this;
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}

