// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../hg/core/functions/map";
import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { isArray } from "../../../hg/core/types/Array";
import { isNumber } from "../../../hg/core/types/Number";
import { isString } from "../../../hg/core/types/String";
import { BorderDTO, createBorderDTO } from "../dto/BorderDTO";
import { ColorDTO, createColorDTO } from "../dto/ColorDTO";
import { createSizeDTO, isSizeDTO, SizeDTO } from "../dto/SizeDTO";
import { createStyleDTO, StyleDTO } from "../dto/StyleDTO";
import { BorderEntity, isBorderEntity } from "./BorderEntity";
import { ColorEntity, isColorEntity } from "./ColorEntity";
import { isSizeEntity, SizeEntity } from "./SizeEntity";
import { Border, isBorder } from "./types/Border";
import { Style } from "./types/Style";
import { UnitType } from "./types/UnitType";

const TOP_AND_BOTTOM_MARGIN_INDEX = 0;
const LEFT_AND_RIGHT_MARGIN_INDEX = 1;
const TOP_MARGIN_INDEX = 0;
const RIGHT_MARGIN_INDEX = 1;
const BOTTOM_MARGIN_INDEX = 2;
const LEFT_MARGIN_INDEX = 3;

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
     * @param border
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

    public static prepareColorDTO (
        value : ColorEntity | ColorDTO | string | undefined
    ) : ColorDTO | undefined {
        if (value === undefined) return undefined;
        if (isString(value)) return createColorDTO(value);
        if (isColorEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeDTO (
        value : SizeEntity | SizeDTO | number | undefined
    ) : SizeDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return createSizeDTO(value, UnitType.PX);
        if (isSizeEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareBorderDTO (
        value : Border | BorderDTO | number | undefined
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
        if (isBorder(value)) return value.getDTO();
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
                const top_and_bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[TOP_AND_BOTTOM_MARGIN_INDEX]);
                if (!top_and_bottom) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[LEFT_AND_RIGHT_MARGIN_INDEX]);
                if (!right_and_left) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined] array provided`);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }

            if (value.length === 4) {
                const top : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[TOP_MARGIN_INDEX] );
                if (!top) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *, *, *] array provided`);
                const right : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[RIGHT_MARGIN_INDEX] );
                if (!right) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined, *, *] array provided`);
                const bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[BOTTOM_MARGIN_INDEX] );
                if (!bottom) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, SizeDTO, undefined, *] array provided`);
                const left : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[LEFT_MARGIN_INDEX] );
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
            Border
            | [
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
            ]
            | [
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
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
        if (isBorder(value)) return value.getDTO();
        if (isArray(value)) {

            if (value.length === 2) {
                const top_and_bottom : BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[TOP_AND_BOTTOM_MARGIN_INDEX]);
                if (!top_and_bottom) throw new TypeError(`prepareBorderListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[LEFT_AND_RIGHT_MARGIN_INDEX]);
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


    /**
     * @inheritDoc
     */
    public getMargin () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        return this._margin;
    }

    public getTopMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[0];
        }
        return this._margin;
    }

    public getBottomMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[2];
        }
        return this._margin;
    }

    public getRightMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[1];
        }
        return this._margin;
    }

    public getLeftMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[3];
        }
        return this._margin;
    }

    /**
     * @inheritDoc
     */
    public setMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        this._margin = StyleEntity.prepareSizeDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                StyleEntity.prepareSizeDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[TOP_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // top
                this._margin, // right
                this._margin, // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                empty, // right
                StyleEntity.prepareSizeDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                this._margin, // right
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[RIGHT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                this._margin, // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                empty, // right
                empty, // bottom
                StyleEntity.prepareSizeDTO(value) ?? empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[LEFT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                this._margin, // right
                this._margin, // bottom
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // left
            ];
        }
        return this;
    }



    /**
     * @inheritDoc
     */
    public getPadding () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        return this._padding;
    }

    public getTopPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[0];
        }
        return this._padding;
    }

    public getBottomPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[2];
        }
        return this._padding;
    }

    public getRightPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[1];
        }
        return this._padding;
    }

    public getLeftPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[3];
        }
        return this._padding;
    }

    /**
     * @inheritDoc
     */
    public setPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        this._padding = StyleEntity.prepareSizeDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                StyleEntity.prepareSizeDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[TOP_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // top
                this._padding, // right
                this._padding, // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                empty, // right
                StyleEntity.prepareSizeDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                this._padding, // right
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                StyleEntity.prepareSizeDTO(value) ?? empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[RIGHT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                this._padding, // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                empty, // right
                empty, // bottom
                StyleEntity.prepareSizeDTO(value) ?? empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[LEFT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                this._padding, // right
                this._padding, // bottom
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // left
            ];
        }
        return this;
    }






    /**
     * @inheritDoc
     */
    public getBorder () : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined {
        return this._border;
    }

    public getTopBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[0];
        }
        return this._border;
    }

    public getBottomBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[2];
        }
        return this._border;
    }

    public getRightBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[1];
        }
        return this._border;
    }

    public getLeftBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[3];
        }
        return this._border;
    }

    /**
     * @inheritDoc
     */
    public setBorder (value: Border | BorderDTO | number | undefined) : this {
        this._border = StyleEntity.prepareBorderDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                StyleEntity.prepareBorderDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[TOP_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // top
                this._border, // right
                this._border, // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                empty, // right
                StyleEntity.prepareBorderDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                this._border, // right
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                StyleEntity.prepareBorderDTO(value) ?? empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[RIGHT_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // right
                this._border, // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftBorder (value: Border | BorderDTO | number | undefined) : this {
        const v = StyleEntity.prepareBorderDTO(value);
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                empty, // right
                empty, // bottom
                v ?? empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[LEFT_MARGIN_INDEX] = v ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                this._border, // right
                this._border, // bottom
                v ?? BorderEntity.createEmptyBorder().getDTO(), // left
            ];
        }
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
