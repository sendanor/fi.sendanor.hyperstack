// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../hg/core/Json";
import { createHyperStyleDTO } from "../dto/HyperStyleDTO";
import { HyperStyleDTO } from "../dto/HyperStyleDTO";
import { Style } from "./Style";

/**
 * Style entity.
 */
export class StyleEntity
    implements Style
{

    /**
     * The name of the component.
     *
     * @protected
     */
    protected _name : string;

    /**
     * The name of the component where to extend.
     *
     * @protected
     */
    protected _extend : string | undefined;

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
        style ?: HyperStyleDTO | undefined,
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
    public getName (): string | undefined {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public getExtend (): string | undefined {
        return this._extend;
    }

    /**
     * @inheritDoc
     */
    public extend (name: string): this {
        this._extend = name;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getDTO () : HyperStyleDTO {
        return createHyperStyleDTO(
            this._name,
            this._extend,
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
