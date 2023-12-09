// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { forEach } from "../../../../hg/core/functions/forEach";
import { upperFirst } from "../../../../hg/core/functions/upperFirst";
import { has } from "../../../../hg/core/functions/has";
import { map } from "../../../../hg/core/functions/map";
import { reduce } from "../../../../hg/core/functions/reduce";
import {
    isReadonlyJsonAny,
    ReadonlyJsonAny,
    ReadonlyJsonObject,
} from "../../../../hg/core/Json";
import { isBoolean } from "../../../../hg/core/types/Boolean";
import { isNull } from "../../../../hg/core/types/Null";
import {
    isInteger,
    isNumber,
} from "../../../../hg/core/types/Number";
import { hasNoOtherKeysInDevelopment } from "../../../../hg/core/types/OtherKeys";
import { isRegularObject } from "../../../../hg/core/types/RegularObject";
import { isString } from "../../../../hg/core/types/String";
import { isUndefined } from "../../../../hg/core/types/undefined";
import { DTO } from "../../dto/types/DTO";
import {
    Entity,
    isEntity,
} from "./Entity";
import {
    EntityType,
    isEntityType,
} from "./EntityType";
import {
    EntityFactory,
    PropertyTypeCheckFn,
    TypeCheckFn,
} from "./EntityFactory";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
} from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import { IsDTO } from "./IsDTO";

/**
 * @inheritDoc
 */
export class EntityFactoryImpl<
    T extends Entity<D>,
    D extends DTO,
>
    implements EntityFactory<T, D> {


    /**
     * Create an entity factory.
     */
    public static create<
        T extends Entity<D>,
        D extends DTO,
    > () : EntityFactoryImpl<T, D> {
        return new EntityFactoryImpl<T, D>();
    }

    public static createTypeCheckFn (
        ...types: readonly EntityPropertyType[]
    ) : TypeCheckFn {
        return reduce(
            types,
            (prev: TypeCheckFn, item: EntityPropertyType) : TypeCheckFn => {

                switch (item) {
                    case "boolean": return (value: unknown) : boolean => prev(value) || isBoolean(value);
                    case "string": return (value: unknown) : boolean => prev(value) || isString(value);
                    case "number": return (value: unknown) : boolean => prev(value) || isNumber(value);
                    case "integer": return (value: unknown) : boolean => prev(value) || isInteger(value);
                    case "null": return (value: unknown) : boolean => prev(value) || isNull(value);
                    case "undefined": return (value: unknown) : boolean => prev(value) || isUndefined(value);
                }

                if (isEntityType(item)) {
                    return (value: unknown) : boolean => prev(value) || item.is(value);
                }

                throw new TypeError(`createTypeCheckFn: Unknown type: ${item}`);
            },
            () : boolean => false,
        );
    }


    /**
     * Internal properties.
     *
     * @private
     */
    private readonly _properties : EntityProperty[];

    /**
     * Construct an entity factory.
     *
     * @protected
     */
    protected constructor() {
        this._properties = [];
    }


    /**
     * @inheritDoc
     */
    public getProperties () : readonly EntityProperty[] {
        return map(
            this._properties,
            (item : EntityProperty) => item
        );
    }

    /**
     * @inheritDoc
     */
    public add (
        name  : EntityProperty | string,
        ...types : EntityPropertyType[]
    ) : this {
        if ( isString(name) ) {
            this._properties.push( EntityPropertyImpl.create(name, ...types) );
        } else {
            this._properties.push( name );
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public createIsDTO () : IsDTO<D> {

        const properties : readonly EntityProperty[] = this.getProperties();

        const propertyNames : readonly string[] = map(
            properties,
            (item : EntityProperty) : string => item.getPropertyName()
        );

        const checkProperties = reduce(
            properties,
            (prev: PropertyTypeCheckFn, item: EntityProperty): PropertyTypeCheckFn => {
                const propertyName = item.getPropertyName();
                const isType = EntityFactoryImpl.createTypeCheckFn(...item.getTypes());
                return (value: ReadonlyJsonObject) : boolean => prev(value) && isType(value[propertyName]);
            },
            (): boolean => true,
        );

        return (value : unknown) : value is D => {
            return (
                isRegularObject(value)
                && hasNoOtherKeysInDevelopment(value, propertyNames)
                && checkProperties(value)
            );
        };
    }

    /**
     * @inheritDoc
     */
    public createDefaultDTO () : D {
        const properties : readonly EntityProperty[] = this.getProperties();
        return reduce(
            properties,
            (prev: D, item : EntityProperty): D => {
                let defValue : EntityPropertyValue = item.getDefaultValue();
                defValue = isEntity(defValue) ? defValue.getDTO() as Entity<DTO> : defValue;
                return {
                    ...prev,
                    ...(defValue !== undefined ? { [item.getPropertyName()] : defValue } : {})
                };
            },
            {} as unknown as D,
        );
    }

    /**
     * @inheritDoc
     */
    public createEntityType (
        opts : { immutable ?: boolean } = {}
    ) : EntityType<T, D> {

        const { immutable } = opts;

        const properties : readonly EntityProperty[] = this.getProperties();
        const isDTO = this.createIsDTO();
        const defaultDto : D = this.createDefaultDTO();

        class FinalType implements Entity<D> {

            protected _dto : D;

            public static create () : T {
                return new FinalType() as unknown as T;
            }

            public static createFromDTO (
                dto : D,
            ) : T {
                return new FinalType(dto) as unknown as T;
            }

            public static getProperties () : EntityProperty[] {
                return map(properties, (item: EntityProperty) : EntityProperty => item);
            }

            public static is (value: unknown) : value is T {
                return value instanceof FinalType;
            }

            public static isDTO (value: unknown) : value is D {
                return isDTO(value);
            }


            protected constructor (
                dto ?: D | undefined,
            ) {
                this._dto = dto ?? defaultDto;
            }

            protected _setPropertyValue (
                propertyName : string,
                value : unknown
            ) : this {
                if ( isReadonlyJsonAny(value) ) {
                    this._dto = {
                        ...this._dto,
                        [propertyName]: value,
                    };
                } else {
                    throw new TypeError(`The type of value not supported: ${value}`);
                }
                return this;
            }

            protected _getPropertyValue (
                propertyName : string,
            ) : ReadonlyJsonAny | undefined {
                if (has(this._dto, propertyName)) {
                    return (this._dto as any)[propertyName];
                } else {
                    return undefined;
                }
            }

            public getDTO () : D {
                return this._dto;
            }

            public toJSON () : ReadonlyJsonObject {
                return this._dto as unknown as ReadonlyJsonObject;
            }

            public valueOf () : ReadonlyJsonObject {
                return this.toJSON();
            }

        }

        forEach(
            properties,
            (item: EntityProperty) : void => {
                const propertyName : string = item.getPropertyName();

                forEach(
                    item.getGetterNames(),
                    (methodName : string): void => {
                        if (!has(FinalType.prototype, methodName)) {
                            (FinalType.prototype as any)[methodName] = getterMethod;
                        }
                    }
                );

                function getterMethod (
                    this: FinalType,
                ) : unknown {
                    return this._getPropertyValue(propertyName);
                }

                if (!immutable) {
                    forEach(
                        item.getSetterNames(),
                        (methodName : string): void => {
                            if (!has(FinalType.prototype, methodName)) {
                                (FinalType.prototype as any)[methodName] = setterMethod;
                            }
                        }
                    );
                }

                function setterMethod (
                    this: FinalType,
                    value: unknown
                ) : FinalType {
                    return this._setPropertyValue(propertyName, value);
                }

            }
        );

        return FinalType;

    }

}
