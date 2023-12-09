// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityProperty } from "./EntityProperty";

/**
 * Interface for entity types, e.g. the public API for static methods in an
 * entity class.
 */
export interface EntityType<
    T extends Entity<D>,
    D extends DTO,
> {

    /**
     * Creates an entity with default values.
     */
    create () : T;

    /**
     * Creates an entity from a DTO object.
     *
     * @param dto
     */
    createFromDTO (
        dto : D,
    ) : T;

    /**
     * Return DTO property configurations.
     */
    getProperties () : readonly EntityProperty[];

    /**
     * Returns `true` if value is type of the entity.
     *
     * @param value
     */
    is (value: unknown): value is T;

    /**
     * Returns `true` if value is type of the entity DTO object.
     *
     * @param value
     */
    isDTO (value: unknown): value is D;

}

export function isEntityType<
    T extends Entity<D>,
    D extends DTO,
> (value : unknown) : value is EntityType<T, D> {
    return (
        isObject(value)
        && isFunction(value?.create)
        && isFunction(value?.createFromDTO)
        && isFunction(value?.getProperties)
        && isFunction(value?.is)
        && isFunction(value?.isDTO)
    );
}
