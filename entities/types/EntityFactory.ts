// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { DTO } from "../../dto/types/DTO";
import { BaseEntity } from "./BaseEntity";
import { Entity } from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
} from "./EntityProperty";
import { EntityType } from "./EntityType";
import { IsDTO } from "./IsDTO";

export type GetterMethod<
    T extends BaseEntity<D>,
    D extends DTO,
    R = any
> = (this: T) => R;

export type SetterMethod<
    T extends BaseEntity<D>,
    D extends DTO,
    R = any
> = (this: T, value: R) => T;

export interface TypeCheckFn {
    (value: unknown): boolean;
}

export interface PropertyTypeCheckFn {
    (value: ReadonlyJsonObject): boolean;
}

/**
 * Factory for entity classes.
 */
export interface EntityFactory<
    T extends Entity<D>,
    D extends DTO
> {

    /**
     * Get all defined properties.
     */
    getProperties () : readonly EntityProperty[];

    /**
     * Create a new property object, to be used with `.add( .createProperty(name) ... )`.
     *
     * @param name
     */
    createProperty (name : string) : EntityProperty;

    /**
     * Add a property with name and type(s).
     *
     * @param name The name of the property
     * @param types Type(s) of the property
     */
    add (name: string, ...types : EntityPropertyType[]) : this;

    /**
     * Add a property with a property entity.
     *
     * @param item The property
     */
    add (item: EntityProperty) : this;

    /**
     * Creates a default DTO object.
     */
    createDefaultDTO () : D;

    /**
     * Creates a test function for DTO object.
     */
    createIsDTO () : IsDTO<D>;

    /**
     * Creates an entity constructor.
     */
    createEntityType (
        opts : { immutable ?: boolean }
    ) : EntityType<T, D>;

}
