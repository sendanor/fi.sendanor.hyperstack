// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { DTO } from "../../dto/types/DTO";
import { EntityType } from "./EntityType";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Entity interface.
 */
export interface Entity<T extends DTO>
    extends JsonSerializable
{

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns the DTO.
     */
    getDTO () : T;

    /**
     * Returns the type of the entity
     */
    getEntityType () : EntityType<Entity<T>, T>;

}

export function isEntity<T extends DTO> (value : unknown) : value is Entity<T> {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getDTO)
    );
}
