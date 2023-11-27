// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { createHyperRouteDTO, HyperRouteDTO } from "../dto/HyperRouteDTO";

export class RouteEntity {

    protected _name : string;
    protected _path : string;
    protected _extend : string | undefined;
    protected _view : string | undefined;
    protected _language : string | undefined;
    protected _publicUrl : string | undefined;
    protected _redirect : string | undefined;

    protected constructor (
        name : string,
        path : string,
    ) {
        this._name = name;
        this._path = path;
        this._extend = undefined;
    }

    public getName () : string {
        return this._name;
    }

    public getPath () : string {
        return this._path;
    }

    public getExtend () : string | undefined {
        return this._extend;
    }

    public getView () : string | undefined {
        return this._view;
    }

    public setView (view : string) : this {
        this._view = view;
        return this;
    }

    public getLanguage () : string | undefined {
        return this._language;
    }

    public getPublicUrl () : string | undefined {
        return this._publicUrl;
    }

    public getRedirect () : string | undefined {
        return this._redirect;
    }

    public setRedirect (redirect : string | undefined) : this {
        this._redirect = redirect;
        return this;
    }

    public getDTO () : HyperRouteDTO {
        return createHyperRouteDTO(
            this._name,
            this._path,
            this._extend,
            this._publicUrl,
            this._language,
            this._view,
            this._redirect,
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

    public static create (
        name : string,
        path : string,
    ) : RouteEntity {
        return new RouteEntity( name, path );
    }

}

export function isRouteEntity (value: unknown): value is RouteEntity {
    return value instanceof RouteEntity;
}

