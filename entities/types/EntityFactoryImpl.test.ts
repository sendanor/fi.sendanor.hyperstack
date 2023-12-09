// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe, beforeEach } from "@jest/globals";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import { EntityType } from "./EntityType";

describe('EntityFactoryImpl', () => {

    describe('#create', () => {

        it('can create an entity factory instance', () => {
            const item = EntityFactoryImpl.create();
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityFactoryImpl);
        });

        it('can create an entity factory instance with a property', () => {
            const item = (
                EntityFactoryImpl
                    .create()
                    .add( "name", "string")
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(1);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string"]);
        });

        it('can create an entity factory instance with an optional property', () => {
            const item = (
                EntityFactoryImpl
                    .create()
                    .add( "name", "string", "undefined")
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(1);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string", "undefined"]);
        });

    });

    describe('#createTypeCheckFn', () => {

        it('can create a test function for null values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('null');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(true);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for undefined values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('undefined');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(true);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for boolean values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('boolean');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(true);
            expect( fn(false) ).toBe(true);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for number values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('number');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(true);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for integer values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('integer');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for integer or string values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('integer', 'string');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(true);
        });

        it('can create a test function for integer or undefined values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn('integer', 'undefined');
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(true);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

    });

    describe('.createDefaultDTO', () => {

        it('can create a default DTO object with undefined value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "string", "undefined")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({});
        });

        it('can create a default DTO object with null value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "string", "null")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name: null });
        });

        it('can create a default DTO object with null and undefined values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "string", "null", "undefined")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ });
        });

        it('can create a default DTO object with string value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "string")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '' });
        });

        it('can create a default DTO object with number value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "number")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with boolean value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "boolean")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : false });
        });

        it('can create a default DTO object with integer value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", "integer")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with multiple properties', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "age", "integer")
                .add( "name", "string")
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '', age: 0 });
        });

        it('can create a default DTO object with custom default values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age", "integer").setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name", "string").setDefaultValue('Smith') )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 'Smith', age: 30 });
        });

    });

    describe('.createIsDTO', () => {

        it('can create a test function for DTOs', () => {

            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age", "integer").setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name", "string").setDefaultValue('Smith') )
            );

            const fn = item.createIsDTO();

            expect( fn({name : 'John', age: 20}) ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

        });

    });

    describe('.createEntityType', () => {

        interface MyDTO extends DTO {
            readonly age : number;
            readonly name : string;
        }

        interface MyEntity extends Entity<MyDTO> {
            getAge () : number;
            getName () : string;
            setAge (age: number) : this;
            setName (name: string) : this;
            age (age: number) : this;
            name (name: string) : this;
        }

        interface MyReadonlyEntity extends Entity<MyDTO> {
            getAge () : number;
            getName () : string;
        }

        let factory : EntityFactoryImpl<MyEntity, MyDTO>;

        beforeEach ( () => {
            factory = (
                EntityFactoryImpl.create<MyEntity, MyDTO>()
                    .add( EntityPropertyImpl.create("age", "integer").setDefaultValue(30) )
                    .add( EntityPropertyImpl.create("name", "string").setDefaultValue('Smith') )
            );
        });

        describe('.getName and .getAge', () => {

            it('can create an entity constructor with .getName and .getAge', () => {
                const MyType = factory.createEntityType();
                const entity = MyType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
            });

            it('can create an entity constructor with readonly entities', () => {
                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });
                const entity = ReadonlyEntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                expect( entity.setName ).toBe(undefined);
                expect( entity.setAge ).toBe(undefined);
            });

        });

        describe('.setName and .setAge', () => {

            it('can create an entity constructor with writable entities with .setName and .setAge', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                entity.setName('Alice').setAge(18);
                expect( entity.getName() ).toBe('Alice');
                expect( entity.getAge() ).toBe(18);
            });

        });

        describe('.name and .age', () => {

            it('can create an entity constructor with writable entities with .name and .age', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                entity.name('Alice').age(18);
                expect( entity.getName() ).toBe('Alice');
                expect( entity.getAge() ).toBe(18);
            });

        });

        describe('.getDTO', () => {

            it('can create an entity constructor with .getDTO', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getDTO() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.toJSON', () => {

            it('can create an entity constructor with .toJSON', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.toJSON() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.valueOf', () => {

            it('can create an entity constructor with .valueOf', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.valueOf() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('#isDTO', () => {

            it('can create a test function for readonly DTOs', () => {

                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });

                expect( ReadonlyEntityType.isDTO({name : 'John', age: 30}) ).toBe(true);
                expect( ReadonlyEntityType.isDTO({name : 'John', age: null}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({name : 123, age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({name : 123}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(123) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(null) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(undefined) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO([]) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(true) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(false) ).toBe(false);
                expect( ReadonlyEntityType.isDTO("hello world") ).toBe(false);

            });

            it('can create a test function for DTOs', () => {

                const EntityType = factory.createEntityType();

                expect( EntityType.isDTO({name : 'John', age: 30}) ).toBe(true);
                expect( EntityType.isDTO({name : 'John', age: null}) ).toBe(false);
                expect( EntityType.isDTO({name : 123, age: 30}) ).toBe(false);
                expect( EntityType.isDTO({age: 30}) ).toBe(false);
                expect( EntityType.isDTO({name : 123}) ).toBe(false);
                expect( EntityType.isDTO(123) ).toBe(false);
                expect( EntityType.isDTO(null) ).toBe(false);
                expect( EntityType.isDTO(undefined) ).toBe(false);
                expect( EntityType.isDTO({}) ).toBe(false);
                expect( EntityType.isDTO([]) ).toBe(false);
                expect( EntityType.isDTO(true) ).toBe(false);
                expect( EntityType.isDTO(false) ).toBe(false);
                expect( EntityType.isDTO("hello world") ).toBe(false);

            });

        });

        describe('#is', () => {


            it('can create a test function for readonly entities', () => {

                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });
                const entity = ReadonlyEntityType.create();

                expect( ReadonlyEntityType.is(entity) ).toBe(true);
                expect( ReadonlyEntityType.is({name : 'John', age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.is({name : 'John', age: null}) ).toBe(false);
                expect( ReadonlyEntityType.is({name : 123, age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.is({age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.is({name : 123}) ).toBe(false);
                expect( ReadonlyEntityType.is(123) ).toBe(false);
                expect( ReadonlyEntityType.is(null) ).toBe(false);
                expect( ReadonlyEntityType.is(undefined) ).toBe(false);
                expect( ReadonlyEntityType.is({}) ).toBe(false);
                expect( ReadonlyEntityType.is([]) ).toBe(false);
                expect( ReadonlyEntityType.is(true) ).toBe(false);
                expect( ReadonlyEntityType.is(false) ).toBe(false);
                expect( ReadonlyEntityType.is("hello world") ).toBe(false);

            });

            it('can create a test function for entities', () => {

                const EntityType = factory.createEntityType();
                const entity = EntityType.create();

                expect( EntityType.is(entity) ).toBe(true);
                expect( EntityType.is({name : 'John', age: 30}) ).toBe(false);
                expect( EntityType.is({name : 'John', age: null}) ).toBe(false);
                expect( EntityType.is({name : 123, age: 30}) ).toBe(false);
                expect( EntityType.is({age: 30}) ).toBe(false);
                expect( EntityType.is({name : 123}) ).toBe(false);
                expect( EntityType.is(123) ).toBe(false);
                expect( EntityType.is(null) ).toBe(false);
                expect( EntityType.is(undefined) ).toBe(false);
                expect( EntityType.is({}) ).toBe(false);
                expect( EntityType.is([]) ).toBe(false);
                expect( EntityType.is(true) ).toBe(false);
                expect( EntityType.is(false) ).toBe(false);
                expect( EntityType.is("hello world") ).toBe(false);

            });

        });

        describe('#createFromDTO', () => {

            it('can create an entity from DTO', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.createFromDTO({name:'Jack', age:38});
                expect( entity.getName() ).toBe('Jack');
                expect( entity.getAge() ).toBe(38);
            });

        });

        describe('#getProperties', () => {

            it('can get entity properties', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.getProperties();
                expect( entity.length ).toBe(2);
                expect( entity[0].getPropertyName()).toBe('age');
                expect( entity[1].getPropertyName()).toBe('name');
            });

        });


    });

    describe('with inner entities', () => {

        interface CarDTO extends DTO {
            readonly model: string;
        }

        interface Car extends Entity<CarDTO> {
            getModel() : string;
        }

        interface DriverDTO extends DTO {
            readonly name : string;
            readonly age : number;
            readonly car : CarDTO;
        }

        interface Driver extends Entity<DriverDTO> {
            getCar() : Car;
            getCarDTO() : CarDTO;
        }

        let carFactory : EntityFactoryImpl<Car, CarDTO>;
        let CarType : EntityType<Car, CarDTO>;
        let driverFactory : EntityFactoryImpl<Driver, DriverDTO>;
        let DriverType : EntityType<Driver, DriverDTO>;

        beforeEach(() => {

            carFactory = (
                EntityFactoryImpl.create<Car, CarDTO>()
                .add( EntityPropertyImpl.create("model", "string").setDefaultValue("Ford") )
            );
            CarType = carFactory.createEntityType();

            driverFactory = (
                EntityFactoryImpl.create<Driver, DriverDTO>()
                .add( EntityPropertyImpl.create("age", "integer").setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name", "string").setDefaultValue('Smith') )
                .add( EntityPropertyImpl.create("car", CarType) )
            );
            DriverType = driverFactory.createEntityType();

        });

        describe('.createDefaultDTO', () => {

            it('can create a default DTO object with an inner entity value', () => {
                expect( driverFactory.createDefaultDTO() ).toStrictEqual({
                    name : 'Smith',
                    age: 30,
                    car: {model: "Ford"}
                });
            });

        });

        describe('.create', () => {

            it('can create a entity with DTO getters for an inner entity property .getCar()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCar().getDTO() ).toStrictEqual({model: "Ford"});
            });

            it('can create a entity with DTO getters for an inner entity property .getCarDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCarDTO() ).toStrictEqual({model: "Ford"});
            });

        });

    });

});
