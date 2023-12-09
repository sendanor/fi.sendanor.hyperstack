// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";

/**
 *
 */
export type EntityPropertyType = EntityType<Entity<DTO>, DTO> | "string" | "number" | "boolean" | "integer" | "null" | "undefined";

/**
 *
 */
export type EntityPropertyValue = Entity<DTO> | string | number | boolean | null | undefined;

/**
 * Presents a property of an entity or entity DTO with a name and type(s).
 */
export interface EntityProperty {

    /**
     * The name of property
     */
    getPropertyName () : string;

    /**
     * Accepted type(s) of the property.
     */
    getTypes () : readonly EntityPropertyType[];

    /**
     *
     */
    getDefaultValue () : EntityPropertyValue;

    /**
     * Returns names for getter functions.
     */
    getGetterNames () : readonly string[];

    /**
     * Returns names for setter functions.
     */
    getSetterNames () : readonly string[];

}
