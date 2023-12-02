// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { HyperComponentContent, HyperComponentDTO } from "../dto/HyperComponentDTO";
import { HyperSeoDTO } from "../dto/HyperSeoDTO";
import { HyperStyleDTO } from "../dto/HyperStyleDTO";
import { createHyperViewDTO, HyperViewDTO } from "../dto/HyperViewDTO";
import { ComponentEntity, isComponentEntity } from "./ComponentEntity";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";
import { View } from "./View";

/**
 * Entity for Hyper views.
 */
export class ViewEntity
    implements
        View
{

    public static create (name : string) : ViewEntity {
        return new ViewEntity(
            name,
        );
    }

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

    /**
     * @inheritDoc
     */
    public getName () : string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public getExtend () : string | undefined {
        return this._extend;
    }

    /**
     * @inheritDoc
     */
    public extend (name : string) : this {
        this._extend = name;
        return this;
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
    public addText (value : string) : this {
        return this.add(value);
    }

    /**
     * @inheritDoc
     */
    public getLanguage () : string | undefined {
        return this._language;
    }

    /**
     * @inheritDoc
     */
    public setLanguage (value : string) : this {
        this._language = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getPublicUrl () : string | undefined {
        return this._publicUrl;
    }

    /**
     * @inheritDoc
     */
    public setPublicUrl (value : string) : this {
        this._publicUrl = value;
        return this;
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
    public setRefresh (value: number) : this {
        return this.setMeta({
            refresh: value,
        });
    }

    /**
     * @inheritDoc
     */
    public setIntervalRefresh (value: number) : this {
        return this.setRefresh(value).setTimestamp(new Date().toISOString());
    }

    /**
     * @inheritDoc
     */
    public setTimestamp (value: string) : this {
        return this.setMeta({
            timestamp: value,
        });
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}

