// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { BorderDTO } from "../../dto/BorderDTO";
import { FontDTO } from "../../dto/FontDTO";
import { SizeDTO } from "../../dto/SizeDTO";
import { StyleDTO } from "../../dto/StyleDTO";
import { BorderEntity } from "../BorderEntity";
import { ColorEntity } from "../ColorEntity";
import { FontEntity } from "../FontEntity";
import { SizeEntity } from "../SizeEntity";
import { Border } from "./Border";
import { Color } from "./Color";
import { Extendable } from "./Extendable";
import { Font } from "./Font";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Interface for Style entities.
 */
export interface Style
    extends
        JsonSerializable
{

    /**
     * Returns the DTO object.
     */
    getDTO () : StyleDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get text color.
     */
    getTextColor () : ColorEntity | undefined;

    /**
     * Set text color.
     *
     * @param value
     */
    setTextColor (value: ColorEntity | undefined) : this;

    /**
     * Get background color
     */
    getBackgroundColor () : ColorEntity | undefined;

    /**
     * Set background color.
     *
     * @param value
     */
    setBackgroundColor (value: ColorEntity | undefined) : this;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

    getMargin () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;
    getTopMargin () : SizeDTO | undefined;
    getBottomMargin () : SizeDTO | undefined;
    getRightMargin () : SizeDTO | undefined;
    getLeftMargin () : SizeDTO | undefined;

    setMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setTopMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setBottomMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setRightMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setLeftMargin (value: SizeEntity | SizeDTO | number | undefined) : this;


    getPadding () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;
    setPadding (value: SizeEntity | SizeDTO | number | undefined) : this;

    getTopPadding () : SizeDTO | undefined;
    getBottomPadding () : SizeDTO | undefined;
    getRightPadding () : SizeDTO | undefined;
    getLeftPadding () : SizeDTO | undefined;

    setTopPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setBottomPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setRightPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setLeftPadding (value: SizeEntity | SizeDTO | number | undefined) : this;


    getBorder () : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined;
    setBorder (value : BorderEntity | BorderDTO | undefined) : this;

    getTopBorder () : BorderDTO | undefined;
    getBottomBorder () : BorderDTO | undefined;
    getRightBorder () : BorderDTO | undefined;
    getLeftBorder () : BorderDTO | undefined;

    setTopBorder (value: Border | BorderDTO | number | undefined) : this;
    setBottomBorder (value: Border | BorderDTO | number | undefined) : this;
    setRightBorder (value: Border | BorderDTO | number | undefined) : this;
    setLeftBorder (value: Border | BorderDTO | number | undefined) : this;

    getFontDTO () : FontDTO | undefined;
    getFont () : Font | undefined;
    setFont (value: FontEntity | Font | string | number | undefined) : this;

}

export function isStyle (value : unknown) : value is Style {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getTextColor)
        && isFunction(value?.setTextColor)
        && isFunction(value?.getBackgroundColor)
        && isFunction(value?.setBackgroundColor)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getMargin)
        && isFunction(value?.getTopMargin)
        && isFunction(value?.getBottomMargin)
        && isFunction(value?.getRightMargin)
        && isFunction(value?.getLeftMargin)
        && isFunction(value?.setMargin)
        && isFunction(value?.setTopMargin)
        && isFunction(value?.setBottomMargin)
        && isFunction(value?.setRightMargin)
        && isFunction(value?.setLeftMargin)
        && isFunction(value?.getPadding)
        && isFunction(value?.setPadding)
        && isFunction(value?.getTopPadding)
        && isFunction(value?.getBottomPadding)
        && isFunction(value?.getRightPadding)
        && isFunction(value?.getLeftPadding)
        && isFunction(value?.setTopPadding)
        && isFunction(value?.setBottomPadding)
        && isFunction(value?.setRightPadding)
        && isFunction(value?.setLeftPadding)
        && isFunction(value?.getBorder)
        && isFunction(value?.setBorder)
        && isFunction(value?.getTopBorder)
        && isFunction(value?.getBottomBorder)
        && isFunction(value?.getRightBorder)
        && isFunction(value?.getLeftBorder)
        && isFunction(value?.setTopBorder)
        && isFunction(value?.setBottomBorder)
        && isFunction(value?.setRightBorder)
        && isFunction(value?.setLeftBorder)
        && isFunction(value?.getFont)
        && isFunction(value?.getFontDTO)
        && isFunction(value?.setFont)
    );
}
