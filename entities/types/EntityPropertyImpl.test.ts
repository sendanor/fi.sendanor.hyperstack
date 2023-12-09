// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { EntityPropertyImpl } from "./EntityPropertyImpl";

describe('EntityPropertyImpl', () => {

    describe('#create', () => {

        it('can create a property', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            );
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityPropertyImpl);
        });

        it('can create property with a name', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            );
            expect( item.getPropertyName() ).toBe("test");
        });

        it('can create property with string type', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            );
            expect( item.getTypes() ).toStrictEqual(["string"]);
        });

        it('can create property with number type', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "number"
            );
            expect( item.getTypes() ).toStrictEqual(["number"]);
        });

        it('can create property with boolean type', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "boolean"
            );
            expect( item.getTypes() ).toStrictEqual(["boolean"]);
        });

        it('can create property with null type', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "null"
            );
            expect( item.getTypes() ).toStrictEqual(["null"]);
        });

        it('can create property with undefined type', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "undefined"
            );
            expect( item.getTypes() ).toStrictEqual(["undefined"]);
        });

        it('can create property with number and undefined types', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "number",
                "undefined",
            );
            expect( item.getTypes() ).toStrictEqual(["number", "undefined"]);
        });

        it('can create property with Entity type', () => {
            const carFactory = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("model", "string").setDefaultValue("Ford") )
            );
            const CarType = carFactory.createEntityType();
            const item = EntityPropertyImpl.create(
                "test",
                CarType
            );
            expect( item.getTypes() ).toStrictEqual([CarType]);
        });

    });

    describe('#getDefaultValue', () => {

        it('can get a default value', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            ).setDefaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

        it('can get a default value for an entity', () => {
            const carFactory = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("model", "string").setDefaultValue("Ford") )
            );
            const CarType = carFactory.createEntityType();
            const item = EntityPropertyImpl.create(
                "test",
                CarType
            );
            expect( (item.getDefaultValue() as any)?.getDTO() ).toStrictEqual({model: "Ford"});
        });

    });

    describe('#setDefaultValue', () => {

        it('can set a default value', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            ).setDefaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

    });

    describe('#defaultValue', () => {

        it('can set a default value', () => {
            const item = EntityPropertyImpl.create(
                "test",
                "string"
            ).defaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

    });

});
