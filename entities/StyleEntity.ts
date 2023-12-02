// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { isNumber } from "../../../hg/core/types/Number";
import { isString } from "../../../hg/core/types/String";
import {
    BorderDTO,
    createBorderDTO,
} from "../dto/BorderDTO";
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
import {
    BorderEntity,
    isBorderEntity,
} from "./BorderEntity";
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
     * Border element(s).
     *
     * @protected
     */
    protected _border : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined;

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
            StyleEntity.prepareBorderListDTO(style?.border),
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
        border : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined,
    ) {
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
        this._width = width;
        this._height = height;
        this._margin = margin;
        this._padding = padding;
        this._border = border;
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

    public static prepareBorderDTO (
        value : BorderEntity | BorderDTO | number | undefined
    ) : BorderDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return createBorderDTO(
                createSizeDTO(value),
                undefined,
                undefined,
            );
        }
        if (isBorderEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeListDTO (
        value : (
            SizeEntity
            | [
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

            if (value.length === 2) {
                const top_and_bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[0]);
                if (!top_and_bottom) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[1]);
                if (!right_and_left) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined] array provided`);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }

            if (value.length === 4) {
                const top : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[0] );
                if (!top) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *, *, *] array provided`);
                const right : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[1] );
                if (!right) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined, *, *] array provided`);
                const bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[2] );
                if (!bottom) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, SizeDTO, undefined, *] array provided`);
                const left : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[3] );
                if (!left) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, SizeDTO, SizeDTO, undefined] array provided`);
                return [
                    top,
                    right,
                    bottom,
                    left,
                ];
            }

            // Runtime assert, should not happen.
            // @ts-ignore
            throw new TypeError(`prepareSizeListDTO: Incorrect array length: ${value.length}`);

        }
        return value;
    }

    public static prepareBorderListDTO (
        value : (
            BorderEntity
            | [
                BorderEntity | BorderDTO | number | undefined,
                BorderEntity | BorderDTO | number | undefined,
            ]
            | [
                BorderEntity | BorderDTO | number | undefined,
                BorderEntity | BorderDTO | number | undefined,
                BorderEntity | BorderDTO | number | undefined,
                BorderEntity | BorderDTO | number | undefined,
            ]
            | BorderDTO
            | number
            | undefined
            )
    ) : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return createBorderDTO(
                createSizeDTO( value ),
                undefined,
                undefined,
            );
        }
        if (isBorderEntity(value)) return value.getDTO();
        if (isArray(value)) {

            if (value.length === 2) {
                const top_and_bottom : BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[0]);
                if (!top_and_bottom) throw new TypeError(`prepareBorderListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[1]);
                if (!right_and_left) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, undefined] array provided`);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }

            if (value.length === 4) {
                const top : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[0] );
                if (!top) throw new TypeError(`prepareBorderListDTO: Invalid [undefined, *, *, *] array provided`);
                const right : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[1] );
                if (!right) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, undefined, *, *] array provided`);
                const bottom : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[2] );
                if (!bottom) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, BorderDTO, undefined, *] array provided`);
                const left : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[3] );
                if (!left) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, BorderDTO, BorderDTO, undefined] array provided`);
                return [
                    top,
                    right,
                    bottom,
                    left,
                ];
            }

            // Runtime assert, should not happen.
            // @ts-ignore
            throw new TypeError(`prepareBorderListDTO: Incorrect array length: ${value.length}`);

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
            this._border,
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
