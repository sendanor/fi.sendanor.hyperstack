// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { ColorDTO } from "../dto/ColorDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { createStyleDTO } from "../dto/StyleDTO";
import { StyleDTO } from "../dto/StyleDTO";
import { ColorEntity, isColorEntity } from "./ColorEntity";
import { isSizeEntity, SizeEntity } from "./SizeEntity";
import { Style } from "./types/Style";

/**
 * Style entity.
 */
export class StyleEntity
    implements Style
{

    /**
     * Width of the element.
     *
     * @protected
     */
    protected _width : SizeDTO | undefined;

    /**
     * Height of the element.
     *
     * @protected
     */
    protected _height : SizeDTO | undefined;

    /**
     * Text color.
     *
     * @protected
     */
    protected _textColor : ColorDTO | undefined;

    /**
     * Background color.
     *
     * @protected
     */
    protected _backgroundColor : ColorDTO | undefined;

    /**
     * Construct a style entity.
     *
     * @param style
     */
    public static createFromDTO (
        style ?: StyleDTO | undefined,
    ) : StyleEntity {
        return new this(
            StyleEntity.prepareColorDTO(style?.textColor),
            StyleEntity.prepareColorDTO(style?.backgroundColor),
            StyleEntity.prepareSizeDTO(style?.width),
            StyleEntity.prepareSizeDTO(style?.height),
        );
    }

    /**
     * Construct a style entity.
     *
     * @param textColor
     * @param backgroundColor
     * @param width
     * @param height
     * @protected
     */
    protected constructor (
        textColor : ColorDTO | undefined,
        backgroundColor : ColorDTO | undefined,
        width : SizeDTO | undefined,
        height : SizeDTO | undefined,
    ) {
        this._width = width;
        this._height = height;
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
    }

    public static prepareColorDTO (value : ColorEntity | ColorDTO | undefined) : ColorDTO | undefined {
        if (value === undefined) return undefined;
        if (isColorEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeDTO (value : SizeEntity | SizeDTO | undefined) : SizeDTO | undefined {
        if (value === undefined) return undefined;
        if (isSizeEntity(value)) return value.getDTO();
        return value;
    }

    /**
     * @inheritDoc
     */
    public getDTO () : StyleDTO {
        return createStyleDTO(
            this._textColor,
            this._backgroundColor,
            this._width,
            this._height,
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
    public getTextColor () : ColorEntity | undefined {
        return this._textColor ? ColorEntity.create(this._textColor.value) : undefined;
    }

    /**
     * @inheritDoc
     */
    public setTextColor (value: ColorEntity | undefined) : this {
        this._textColor = value ? value.getDTO() : undefined;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getBackgroundColor () : ColorEntity | undefined {
        return this._backgroundColor ? ColorEntity.create(this._backgroundColor.value) : undefined;
    }

    /**
     * @inheritDoc
     */
    public setBackgroundColor (value: ColorEntity | undefined) : this {
        this._backgroundColor = value ? value.getDTO() : undefined;
        return this;
    }

    public getCssStyles () : ReadonlyJsonObject {
        return {
            ...(this._textColor ? { color: ColorEntity.createFromDTO(this._textColor).getCssStyles() } : {}),
            ...(this._backgroundColor ? { backgroundColor: ColorEntity.createFromDTO(this._backgroundColor).getCssStyles() } : {}),
            ...(this._width ? { width: SizeEntity.createFromDTO(this._width).getCssStyles() } : {}),
            ...(this._height ? { height: SizeEntity.createFromDTO(this._height).getCssStyles() } : {}),
        };
    }

    /**
     *
     * @param style
     */
    public static getCssStyles (
        style: Style,
    ) : ReadonlyJsonObject {
        return style.getCssStyles();
    }

}

export function isStyleEntity (value: unknown): value is StyleEntity {
    return value instanceof StyleEntity;
}
