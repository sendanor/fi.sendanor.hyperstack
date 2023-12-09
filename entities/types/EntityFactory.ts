// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
} from "./EntityProperty";
import { EntityType } from "./EntityType";
import { IsDTO } from "./IsDTO";

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
     * Get properties.
     */
    getProperties () : readonly EntityProperty[];

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
