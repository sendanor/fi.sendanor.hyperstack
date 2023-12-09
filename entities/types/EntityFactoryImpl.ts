// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { filter } from "../../../../hg/core/functions/filter";
import { forEach } from "../../../../hg/core/functions/forEach";
import { has } from "../../../../hg/core/functions/has";
import { map } from "../../../../hg/core/functions/map";
import { reduce } from "../../../../hg/core/functions/reduce";
import { some } from "../../../../hg/core/functions/some";
import {
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
import { BaseEntity } from "./BaseEntity";
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
    GetterMethod,
    PropertyTypeCheckFn,
    SetterMethod,
    TypeCheckFn,
} from "./EntityFactory";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
    VariableType,
} from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import { IsDTO } from "./IsDTO";

export interface PropertyGetterOptions {
    readonly entityAsDTO ?: boolean;
}

/**
 * @inheritDoc
 */
export class EntityFactoryImpl<
    T extends Entity<D>,
    D extends DTO,
>
    implements EntityFactory<T, D> {


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createProperty  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param name
     */
    public static createProperty (
        name : string
    ): EntityProperty {
        return EntityPropertyImpl.create(name);
    }


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////  #create  /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an entity factory.
     */
    public static create<
        T extends Entity<D>,
        D extends DTO,
    > () : EntityFactoryImpl<T, D> {
        return new EntityFactoryImpl<T, D>();
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createTypeCheckFn  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param types
     */
    public static createTypeCheckFn (
        ...types: readonly EntityPropertyType[]
    ) : TypeCheckFn {
        return reduce(
            types,
            (prev: TypeCheckFn, item: EntityPropertyType) : TypeCheckFn => {
                if (isEntityType(item)) {
                    return (value: unknown) : boolean => prev(value) || item.isEntity(value);
                }
                switch (item) {
                    case VariableType.BOOLEAN: return (value: unknown) : boolean => prev(value) || isBoolean(value);
                    case VariableType.STRING: return (value: unknown) : boolean => prev(value) || isString(value);
                    case VariableType.INTEGER: return (value: unknown) : boolean => prev(value) || isInteger(value);
                    case VariableType.NUMBER: return (value: unknown) : boolean => prev(value) || isNumber(value);
                    case VariableType.NULL: return (value: unknown) : boolean => prev(value) || isNull(value);
                    case VariableType.UNDEFINED: return (value: unknown) : boolean => prev(value) || isUndefined(value);
                    default: throw new TypeError(`createTypeCheckFn: Unknown variable type: ${item}`);
                }
            },
            () : boolean => false,
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createPropertyGetter /////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param propertyName
     * @param types
     * @param opts
     */
    public static createPropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[],
        opts ?: PropertyGetterOptions | undefined,
    ) : GetterMethod<T, D, any> {
        return reduce(
            types,
            (
                prev: GetterMethod<T, D, any> | undefined,
                type: EntityPropertyType
            ) : GetterMethod<T, D, any> => {
                const fn : GetterMethod<T, D, any>= this.createSinglePropertyGetter(
                    propertyName,
                    type,
                    opts,
                );
                if (prev === undefined) return fn;
                return function (
                    this: T,
                ) : any {
                    return prev.call(this) ?? fn.call(this);
                };
            },
            undefined
        ) ?? function (this: T) : any {};
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////  #createSinglePropertyGetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: EntityPropertyType,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, EntityPropertyValue>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: EntityType<T, D>,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, Entity<D>>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, EntityPropertyValue>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.STRING,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, string>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.NUMBER,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, number>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.INTEGER,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, number>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.BOOLEAN,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, boolean>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.NULL,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, null>;

    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: VariableType.UNDEFINED,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, undefined>;

    /**
     * Implementation.
     *
     * @param propertyName
     * @param type
     * @param opts
     */
    public static createSinglePropertyGetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        type: EntityType<T, D> | VariableType,
        opts ?: PropertyGetterOptions | undefined,
    ): GetterMethod<T, D, EntityPropertyValue> {

        if ( isEntityType(type) && !opts?.entityAsDTO ) {
            return function entityGetterMethod (
                this: T,
            ) : Entity<any> | undefined {
                const dto = this._getPropertyValue(propertyName);
                return dto ? type.createFromDTO(dto) : undefined;
            };
        }

        return function scalarGetterMethod (
            this: T,
        ) : any {
            return this._getPropertyValue(propertyName);
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  #createPropertySetter ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createPropertySetter<
        T extends BaseEntity<D>,
        D extends DTO,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[]
    ) : SetterMethod<T, D, unknown> {

        const entityTypes : EntityType<Entity<DTO>, DTO>[] = filter(
            types,
            (type) => isEntityType(type)
        ) as EntityType<Entity<DTO>, DTO>[];

        type IsOurEntityCallback = (value: unknown) => value is Entity<DTO>;

        const isOurEntity : IsOurEntityCallback | undefined = entityTypes.length ? reduce(
            entityTypes,
            (prev: IsOurEntityCallback | undefined, Type: EntityType<Entity<DTO>, DTO>) : IsOurEntityCallback => {
                if (prev === undefined) {
                    return (value: unknown) : value is Entity<DTO> => Type.isEntity(value);
                }
                return (value: unknown) : value is Entity<DTO> => prev(value) || Type.isEntity(value);
            },
            undefined,
        ) : undefined;

        if ( isOurEntity) {
            return function entitySetterMethod (
                this: T,
                value: unknown
            ) : T {
                if ( isOurEntity(value) ) {
                    return this._setPropertyValue(propertyName, value.getDTO());
                } else {
                    return this._setPropertyValue(propertyName, value);
                }
            };
        }

        return function setterMethod (
            this: T,
            value: unknown
        ) : T {
            return this._setPropertyValue(propertyName, value);
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  private properties ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Internal properties.
     *
     * @private
     */
    private readonly _properties : EntityProperty[];


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  new constructor /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Construct an entity factory.
     *
     * @protected
     */
    protected constructor () {
        this._properties = [];
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  public methods //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


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
    public createProperty (name : string) : EntityProperty {
        return EntityFactoryImpl.createProperty(name);
    }

    /**
     * @inheritDoc
     */
    public add (
        name  : EntityProperty | string,
        ...types : EntityPropertyType[]
    ) : this {
        if ( isString(name) ) {
            this._properties.push( this.createProperty(name).types(...types) );
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

        /**
         * @see EntityType as well, which describes the static API.
         */
        class FinalType
            extends BaseEntity<D>
        {

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

            public static isEntity (value: unknown) : value is T {
                return value instanceof FinalType;
            }

            public static isDTO (value: unknown) : value is D {
                return isDTO(value);
            }

            protected constructor (
                dto ?: D | undefined,
            ) {
                super( dto ?? defaultDto );
            }

            public getEntityType () : EntityType<Entity<D>, D> {
                return FinalType;
            }

        }

        forEach(
            properties,
            (item: EntityProperty) : void => {
                const propertyName : string = item.getPropertyName();
                const types : readonly EntityPropertyType[] = item.getTypes();

                const hasEntityType : boolean = some(
                    types,
                    (type) : boolean => isEntityType(type)
                );

                const getterMethod = EntityFactoryImpl.createPropertyGetter<FinalType, D>(
                    propertyName,
                    types,
                );

                const dtoGetterMethod = hasEntityType ? EntityFactoryImpl.createPropertyGetter<FinalType, D>(
                    propertyName,
                    types,
                    {
                        entityAsDTO: true
                    }
                ) : undefined;

                forEach(
                    item.getGetterNames(),
                    (methodName : string): void => {

                        if (!has(FinalType.prototype, methodName)) {
                            (FinalType.prototype as any)[methodName] = getterMethod;
                        }

                        if (dtoGetterMethod) {
                            const dtoMethodName = `${methodName}DTO`;
                            if (!has(FinalType.prototype, dtoMethodName)) {
                                (FinalType.prototype as any)[dtoMethodName] = dtoGetterMethod;
                            }
                        }

                    }
                );

                if (!immutable) {
                    const setterMethod = EntityFactoryImpl.createPropertySetter<FinalType, D>(
                        propertyName,
                        types,
                    );
                    forEach(
                        item.getSetterNames(),
                        (methodName : string): void => {
                            if (!has(FinalType.prototype, methodName)) {
                                (FinalType.prototype as any)[methodName] = setterMethod;
                            }
                        }
                    );
                }

            }
        );

        return FinalType;

    }


}
