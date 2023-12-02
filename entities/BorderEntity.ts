// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { BorderDTO, createBorderDTO } from "../dto/BorderDTO";
import { ColorDTO } from "../dto/ColorDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { BorderStyle } from "../dto/types/BorderStyle";
import { ColorEntity } from "./ColorEntity";
import { SizeEntity } from "./SizeEntity";
import { Border } from "./types/Border";

/**
 * Border entity.
 */
export class BorderEntity
    implements Border
{

    /**
     * Creates a border entity.
     *
     * @param style
     * @param width
     * @param color
     */
    public static create (
        style : BorderStyle | undefined,
        width : SizeDTO | undefined,
        color : ColorDTO | undefined
    ) : BorderEntity {
        return new BorderEntity(
            style ?? BorderStyle.NONE,
            width,
            color,
        );
    }

    /**
     * Creates a border entity from a DTO.
     *
     * @param dto
     */
    public static createFromDTO (
        dto : BorderDTO,
    ) : BorderEntity {
        return BorderEntity.create(
            dto?.style,
            dto?.width,
            dto?.color,
        );
    }

    private _style : BorderStyle;
    private _width : SizeDTO | undefined;
    private _color : ColorDTO | undefined;

    protected constructor (
        style : BorderStyle,
        width : SizeDTO | undefined,
        color : ColorDTO | undefined
    ) {
        this._style = style;
        this._width = width;
        this._color = color;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : BorderDTO {
        return createBorderDTO(
            this._width,
            this._style,
            this._color,
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

    public getCssStyles (): string {
        return `${ SizeEntity.createFromDTO(this._width).getCssStyles() } ${
            this._style
        } ${ ColorEntity.createFromDTO(this._color).getCssStyles() }`;
    }

    public setStyle (value : BorderStyle) : this {
        this._style = value;
        return this;
    }

    public getStyle () : BorderStyle | undefined {
        return this._style;
    }

    public setWidth (value : SizeDTO) : this {
        this._width = value;
        return this;
    }

    public getWidth () : SizeDTO | undefined {
        return this._width;
    }

    public setColor (value : ColorDTO) : this {
        this._color = value;
        return this;
    }

    public getColor () : ColorDTO | undefined {
        return this._color;
    }

}

export function isBorderEntity (value: unknown): value is BorderEntity {
    return value instanceof BorderEntity;
}
