// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { SizeDTO, createSizeDTO } from "../dto/SizeDTO";
import { Size } from "./types/Size";
import { UnitType } from "./types/UnitType";

/**
 * Size entity.
 */
export class SizeEntity
    implements Size
{

    /**
     * Creates a color entity.
     *
     * @param value
     * @param unit Defaults to pixels.
     */
    public static create (
        value  : number,
        unit  ?: UnitType,
    ) : SizeEntity {
        return new SizeEntity(
            value,
            unit ?? UnitType.PX,
        );
    }

    public static createZero () : SizeEntity {
        return SizeEntity.create(0);
    }

    /**
     * Creates a color entity from a DTO.
     *
     * @param dto
     */
    public static createFromDTO (
        dto : SizeDTO,
    ) : SizeEntity {
        return SizeEntity.create(
            dto.value,
            dto.unit ?? UnitType.PX,
        );
    }

    private _value : number;
    private _unit : UnitType;

    protected constructor (
        value : number,
        unit : UnitType,
    ) {
        this._value = value;
        this._unit = unit;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : SizeDTO {
        return createSizeDTO(
            this._value,
            this._unit,
        );
    }

    /**
     * @inheritDoc
     */
    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    /**
     * @inheritDoc
     */
    public setValue (
        value  : number,
        unit  ?: UnitType | undefined,
    ) : this {
        this._value = value;
        if (unit !== undefined) {
            this._unit = unit;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getValue () : number {
        return this._value;
    }

    /**
     * @inheritDoc
     */
    public getUnitType () : UnitType {
        return this._unit;
    }

    public getCssStyles (): string {
        if (this._value === 0) return `0`;
        return `${this._value}${this._unit}`;
    }

}

export function isSizeEntity (value: unknown): value is SizeEntity {
    return value instanceof SizeEntity;
}
