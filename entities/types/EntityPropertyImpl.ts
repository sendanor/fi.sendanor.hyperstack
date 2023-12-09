// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { upperFirst } from "../../../../hg/core/functions/upperFirst";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
} from "./EntityProperty";
import {
    EntityType,
    isEntityType,
} from "./EntityType";

export class EntityPropertyImpl
    implements EntityProperty {

    /**
     * Create an entity property.
     *
     * @param name The name of the property
     * @param types Type(s) of the property
     */
    public static create (
        name : string,
        ...types : readonly EntityPropertyType[]
    ) : EntityPropertyImpl {
        return new EntityPropertyImpl(
            name,
            types,
            this._createDefaultValueFromTypes(types),
        );
    }

    protected static _createDefaultValueFromTypes (
        types: readonly EntityPropertyType[]
    ) : EntityPropertyValue {
        if (types.length === 0 || types.includes("undefined")) return undefined;
        if (types.includes("null")) return null;
        if (types.includes("string")) return "";
        if (types.includes("number")) return 0;
        if (types.includes("integer")) return 0;
        if (types.includes("boolean")) return false;

        const Type : EntityPropertyType | undefined = find(
            types,
            (item : EntityPropertyType) => isEntityType(item)
        ) as EntityType<Entity<DTO>, DTO>;

        if ( Type !== undefined ) {
            return Type.create();
        }

        return undefined;
    }

    /**
     * The name of the property.
     *
     * @private
     */
    private readonly _name : string;

    /**
     * Type(s) of the property.
     *
     * @private
     */
    private readonly _types : readonly EntityPropertyType[];

    /**
     * The default value of the property.
     *
     * @private
     */
    private _defaultValue : EntityPropertyValue;

    /**
     * Construct the property entity.
     *
     * @param name The name of the property
     * @param types Types of the property
     * @param defaultValue Default value
     * @protected
     */
    protected constructor (
        name : string,
        types : readonly EntityPropertyType[],
        defaultValue : EntityPropertyValue,
    ) {
        this._name = name;
        this._types = types;
        this._defaultValue = defaultValue;
    }

    /**
     * @inheritDoc
     */
    public getPropertyName () : string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public getTypes () : readonly EntityPropertyType[] {
        return this._types;
    }

    public getDefaultValue () : EntityPropertyValue {
        return this._defaultValue;
    }

    public setDefaultValue (value: EntityPropertyValue) : this {
        this._defaultValue = value;
        return this;
    }

    public defaultValue (value: EntityPropertyValue) : this {
        return this.setDefaultValue(value);
    }

    public getGetterNames () : readonly string[] {
        const propertyName : string = this.getPropertyName();
        const getterName : string = `get${ upperFirst(propertyName) }`;
        return [
            getterName,
        ];
    }

    public getSetterNames () : readonly string[] {
        const propertyName : string = this.getPropertyName();
        const setterName : string = `set${ upperFirst(propertyName) }`;
        const setterName2 : string = `${ propertyName }`;
        return [
            setterName,
            setterName2,
        ];
    }

}
