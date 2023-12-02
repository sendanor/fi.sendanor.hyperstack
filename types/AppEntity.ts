// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { forEach } from "../../../hg/core/functions/forEach";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { HyperComponentDTO } from "../dto/HyperComponentDTO";
import { createHyperDTO, HyperDTO } from "../dto/HyperDTO";
import { HyperRouteDTO } from "../dto/HyperRouteDTO";
import { HyperViewDTO } from "../dto/HyperViewDTO";
import { App } from "./App";
import { ComponentEntity, isComponentEntity } from "./ComponentEntity";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";
import { isRouteEntity, RouteEntity } from "./RouteEntity";
import { isViewEntity, ViewEntity } from "./ViewEntity";

export class AppEntity
    implements
        App
{

    public static create (name : string) : AppEntity {
        return new this(name);
    }

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

    /**
     * @inheritDoc
     */
    public getName () : string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
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

}

export function isHyperEntity (value: unknown): value is AppEntity {
    return value instanceof AppEntity;
}

