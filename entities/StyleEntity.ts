// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { isNumber } from "../../../hg/core/types/Number";
import { isString } from "../../../hg/core/types/String";
import {
    ColorDTO,
    createColorDTO,
} from "../dto/ColorDTO";
import {
    createSizeDTO,
    isSizeDTO,
    SizeDTO,
} from "../dto/SizeDTO";
import { createStyleDTO } from "../dto/StyleDTO";
import { StyleDTO } from "../dto/StyleDTO";
import { ColorEntity, isColorEntity } from "./ColorEntity";
import { isSizeEntity, SizeEntity } from "./SizeEntity";
import { Style } from "./types/Style";
import { UnitType } from "./types/UnitType";

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
     * Padding of the element.
     *
     * @protected
     */
    protected _padding : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;

    /**
     * Margin of the element.
     *
     * @protected
     */
    protected _margin : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;

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

    public static create () : StyleEntity {
        return new this(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }

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
            StyleEntity.prepareSizeListDTO(style?.margin),
            StyleEntity.prepareSizeListDTO(style?.padding),
        );
    }

    /**
     * Construct a style entity.
     *
     * @param textColor
     * @param backgroundColor
     * @param width
     * @param height
     * @param margin
     * @param padding
     * @protected
     */
    protected constructor (
        textColor : ColorDTO | undefined,
        backgroundColor : ColorDTO | undefined,
        width : SizeDTO | undefined,
        height : SizeDTO | undefined,
        margin : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
        padding : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
    ) {
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
        this._width = width;
        this._height = height;
        this._margin = margin;
        this._padding = padding;
    }

    public static prepareColorDTO (value : ColorEntity | ColorDTO | string | undefined) : ColorDTO | undefined {
        if (value === undefined) return undefined;
        if (isString(value)) return createColorDTO(value);
        if (isColorEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeDTO (value : SizeEntity | SizeDTO | number | undefined) : SizeDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return createSizeDTO(value, UnitType.PX);
        if (isSizeEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeListDTO (
        value : (
            SizeEntity
            | [
            ]
            | [
                SizeEntity | SizeDTO | number | undefined,
            ]
            | [
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
            ]
            | [
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
            ]
            | [
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
            ]
            | SizeDTO
            | number
            | undefined
            )
    ) : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return createSizeDTO(value, UnitType.PX);
        if (isSizeEntity(value)) return value.getDTO();
        if (isArray(value)) {
            if (value.length === 0) return undefined;
            if (value.length === 1) {
                return StyleEntity.prepareSizeDTO(value[0]);
            }
            if (value.length === 2) {
                const top_and_bottom : SizeDTO = StyleEntity.prepareSizeDTO(value[0]);
                const right_and_left: SizeDTO = StyleEntity.prepareSizeDTO(value[1]);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }
            if (value.length === 3) {
                const top : SizeDTO = StyleEntity.prepareSizeDTO(value[0]);
                const right: SizeDTO = StyleEntity.prepareSizeDTO(value[1]);
                const bottom: SizeDTO = StyleEntity.prepareSizeDTO(value[2]);
                return [
                    top,
                    right,
                    bottom,
                    undefined, // left
                ];
            }
            const top : SizeDTO = StyleEntity.prepareSizeDTO(value[0]);
            const right: SizeDTO = StyleEntity.prepareSizeDTO(value[1]);
            const bottom: SizeDTO = StyleEntity.prepareSizeDTO(value[2]);
            const left: SizeDTO = StyleEntity.prepareSizeDTO(value[3]);
            return [
                top,
                right,
                bottom,
                left,
            ];
        }
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
            this._margin,
            this._padding,
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
    public setTextColor (value: ColorEntity | string | undefined) : this {
        this._textColor = StyleEntity.prepareColorDTO(value);
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
    public setBackgroundColor (value: ColorEntity | string | undefined) : this {
        this._backgroundColor = StyleEntity.prepareColorDTO(value);
        return this;
    }

    public getCssStyles () : ReadonlyJsonObject {
        return {
            ...(this._textColor ? { color: ColorEntity.createFromDTO(this._textColor).getCssStyles() } : {}),
            ...(this._backgroundColor ? { backgroundColor: ColorEntity.createFromDTO(this._backgroundColor).getCssStyles() } : {}),
            ...(this._width ? { width: SizeEntity.createFromDTO(this._width).getCssStyles() } : {}),
            ...(this._height ? { height: SizeEntity.createFromDTO(this._height).getCssStyles() } : {}),
            ...(this._margin ? StyleEntity.prepareSizeListCssStyles("margin", this._margin) : {}),
            ...(this._padding ? StyleEntity.prepareSizeListCssStyles("padding", this._padding) : {}),
        };
    }

    public static prepareSizeListCssStyles (
        key : string,
        value : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined
    ) : ReadonlyJsonObject {

        if (isSizeDTO(value)) {
            return {
                [key]: SizeEntity.createFromDTO(value).getCssStyles()
            };
        }

        if (isArray(value)) {
            return {
                [key]: map(
                    value,
                    (item: SizeDTO) : string => SizeEntity.createFromDTO(item).getCssStyles()
                ).join(' ')
            };
        }

        return {};

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
