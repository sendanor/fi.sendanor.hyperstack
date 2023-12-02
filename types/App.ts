// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { HyperComponentDTO } from "../dto/HyperComponentDTO";
import { HyperDTO } from "../dto/HyperDTO";
import { HyperRouteDTO } from "../dto/HyperRouteDTO";
import { HyperViewDTO } from "../dto/HyperViewDTO";
import { ComponentEntity } from "./ComponentEntity";
import { Extendable } from "./Extendable";
import { JsonSerializable } from "./JsonSerializable";
import { RouteEntity } from "./RouteEntity";
import { ViewEntity } from "./ViewEntity";

/**
 * Interface for application definitions.
 */
export interface App
    extends
        Extendable,
        JsonSerializable
{

    /**
     * @inheritDoc
     */
    getName () : string;

    /**
     * Get DTO presentation.
     */
    getDTO () : HyperDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

    /**
     * @inheritDoc
     */
    extend (name : string) : this;

    /**
     * Add a route.
     *
     * @param route
     */
    addRoute (
        route : HyperRouteDTO | RouteEntity | readonly (HyperRouteDTO | RouteEntity)[]
    ) : this;

    /**
     * Add a view.
     *
     * @param view
     */
    addView (view : HyperViewDTO | ViewEntity | readonly (HyperViewDTO | ViewEntity)[]) : this;

    /**
     * Add a component.
     *
     * @param component
     */
    addComponent (component : HyperComponentDTO | ComponentEntity | readonly (HyperComponentDTO | ComponentEntity)[] ) : this;

    /**
     * Get the language.
     */
    getLanguage () : string | undefined;

    /**
     * Set the language.
     *
     * @param value
     */
    setLanguage (value : string) : this;

    /**
     * Get the public URL.
     */
    getPublicUrl () : string | undefined;

    /**
     * Set the public URL.
     *
     * @param value
     */
    setPublicUrl (value : string) : this;

}
