// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../hg/core/functions/forEach";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { HyperComponentDTO } from "../dto/HyperComponentDTO";
import { createHyperDTO, HyperDTO } from "../dto/HyperDTO";
import { HyperRouteDTO } from "../dto/HyperRouteDTO";
import { HyperViewDTO } from "../dto/HyperViewDTO";
import { ComponentEntity, isComponentEntity } from "./ComponentEntity";
import { isRouteEntity, RouteEntity } from "./RouteEntity";
import { isViewEntity, ViewEntity } from "./ViewEntity";

export class HyperEntity {

    protected _name : string;
    protected _extend : string | undefined;
    protected _components : HyperComponentDTO[];
    protected _views : HyperViewDTO[];
    protected _routes : HyperRouteDTO[];
    protected _publicUrl ?: string;
    protected _language ?: string;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._components = [];
        this._views = [];
        this._routes = [];
        this._publicUrl = undefined;
        this._language = undefined;
    }

    public getName () : string {
        return this._name;
    }

    public getDTO () : HyperDTO {
        return createHyperDTO(
            this._name,
            this._extend,
            this._routes,
            this._publicUrl,
            this._language,
            this._components,
            this._views,
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

    public static create (name : string) : HyperEntity {
        return new HyperEntity(name);
    }

    public addRoute (
        route : HyperRouteDTO | RouteEntity | readonly (HyperRouteDTO | RouteEntity)[]
    ) : this {
        if ( isArray(route) ) {
            forEach(
                route,
                (item: HyperRouteDTO | RouteEntity) : void => {
                    this.addRoute(item);
                }
            );
        } else if( isRouteEntity(route) ) {
            this._routes.push( route.getDTO() );
        } else {
            this._routes.push( route );
        }
        return this;
    }

    public addView (view : HyperViewDTO | ViewEntity | readonly (HyperViewDTO | ViewEntity)[]) : this {
        if ( isArray(view) ) {
            forEach(
                view,
                (item: HyperViewDTO | ViewEntity) : void => {
                    this.addView(item);
                }
            );
        } else if( isViewEntity(view) ) {
            this._views.push( view.getDTO() );
        } else {
            this._views.push( view );
        }
        return this;
    }

    public addComponent (component : HyperComponentDTO | ComponentEntity | readonly (HyperComponentDTO | ComponentEntity)[] ) : this {
        if ( isArray(component) ) {
            forEach(
                component,
                (item: HyperComponentDTO | ComponentEntity) : void => {
                    this.addComponent(item);
                }
            );
        } else if( isComponentEntity(component) ) {
            this._components.push( component.getDTO() );
        } else {
            this._components.push( component );
        }
        return this;
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

export function isHyperEntity (value: unknown): value is HyperEntity {
    return value instanceof HyperEntity;
}

