// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { createStyleDTO } from "../dto/StyleDTO";
import { StyleDTO } from "../dto/StyleDTO";
import { Style } from "./types/Style";

/**
 * Style entity.
 */
export class StyleEntity
    implements Style
{

    /**
     * Text color.
     *
     * @protected
     */
    protected _textColor : string | undefined;

    /**
     * Background color.
     *
     * @protected
     */
    protected _backgroundColor : string | undefined;

    /**
     * Construct a style entity.
     *
     * @param style
     */
    public static create (
        style ?: StyleDTO | undefined,
    ) : StyleEntity {
        return new this(
            style?.textColor,
            style?.backgroundColor,
        );
    }

    /**
     * Construct a style entity.
     *
     * @param textColor
     * @param backgroundColor
     * @protected
     */
    protected constructor (
        textColor : string | undefined,
        backgroundColor : string | undefined,
    ) {
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
    }

    /**
     * @inheritDoc
     */
    public getDTO () : StyleDTO {
        return createStyleDTO(
            this._textColor,
            this._backgroundColor,
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
    public getTextColor () : string | undefined {
        return this._textColor;
    }

    /**
     * @inheritDoc
     */
    public setTextColor (value: string | undefined) : this {
        this._textColor = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getBackgroundColor () : string | undefined {
        return this._backgroundColor;
    }

    /**
     * @inheritDoc
     */
    public setBackgroundColor (value: string | undefined) : this {
        this._backgroundColor = value;
        return this;
    }

}

export function isStyleEntity (value: unknown): value is StyleEntity {
    return value instanceof StyleEntity;
}
