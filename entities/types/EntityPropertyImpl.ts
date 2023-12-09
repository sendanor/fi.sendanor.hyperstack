// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { upperFirst } from "../../../../hg/core/functions/upperFirst";
import { isBoolean } from "../../../../hg/core/types/Boolean";
import { isNull } from "../../../../hg/core/types/Null";
import {
    isInteger,
    isNumber,
} from "../../../../hg/core/types/Number";
import { isString } from "../../../../hg/core/types/String";
import { isUndefined } from "../../../../hg/core/types/undefined";
import { DTO } from "../../dto/types/DTO";
import {
    Entity,
    isEntity,
} from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
    VariableType,
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
     */
    public static create (
        name : string
    ) : EntityPropertyImpl {
        return new EntityPropertyImpl(
            name,
            [],
            undefined,
        );
    }

    public static createDefaultValueFromTypes (
        types: readonly EntityPropertyType[]
    ) : EntityPropertyValue {
        if (types.length === 0 || types.includes(VariableType.UNDEFINED)) return undefined;
        if (types.includes(VariableType.NULL)) return null;
        if (types.includes(VariableType.STRING)) return "";
        if (types.includes(VariableType.NUMBER)) return 0;
        if (types.includes(VariableType.INTEGER)) return 0;
        if (types.includes(VariableType.BOOLEAN)) return false;

        const Type : EntityPropertyType | undefined = find(
            types,
            (item : EntityPropertyType) => isEntityType(item)
        ) as EntityType<Entity<DTO>, DTO>;

        if ( Type !== undefined ) {
            return Type.create();
        }

        return undefined;
    }

    public static getEntityPropertyTypeFromVariable (
        value: EntityPropertyValue
    ) : EntityPropertyType {
        if (isString(value)) return VariableType.STRING;
        if (isInteger(value)) return VariableType.INTEGER;
        if (isNumber(value)) return VariableType.NUMBER;
        if (isBoolean(value)) return VariableType.BOOLEAN;
        if (isNull(value)) return VariableType.NULL;
        if (isUndefined(value)) return VariableType.UNDEFINED;
        if (isEntity(value)) return value.getEntityType();
        throw new TypeError(`The value was of unsupported type: "${value}"`)
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
    private _types : readonly EntityPropertyType[];

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

    /**
     * @inheritDoc
     */
    public setTypes (
        ...types : readonly EntityPropertyType[]
    ): this {
        this._types = types;
        this._defaultValue = EntityPropertyImpl.createDefaultValueFromTypes(types);
        return this;
    }

    /**
     * @inheritDoc
     */
    public types (
        ...types : readonly EntityPropertyType[]
    ) : this {
        return this.setTypes(...types);
    }

    /**
     * @inheritDoc
     */
    public getDefaultValue () : EntityPropertyValue {
        return this._defaultValue;
    }

    /**
     * @inheritDoc
     */
    public setDefaultValue (value: EntityPropertyValue) : this {
        if (!this._types.length) {
            this._types = [
                EntityPropertyImpl.getEntityPropertyTypeFromVariable(value)
            ];
        }
        this._defaultValue = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public defaultValue (value: EntityPropertyValue) : this {
        return this.setDefaultValue(value);
    }

    /**
     * @inheritDoc
     */
    public getGetterNames () : readonly string[] {
        const propertyName : string = this.getPropertyName();
        const getterName : string = `get${ upperFirst(propertyName) }`;
        return [
            getterName,
        ];
    }

    /**
     * @inheritDoc
     */
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
