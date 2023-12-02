// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { BorderDTO } from "../../dto/BorderDTO";
import { SizeDTO } from "../../dto/SizeDTO";
import { StyleDTO } from "../../dto/StyleDTO";
import { BorderEntity } from "../BorderEntity";
import { ColorEntity } from "../ColorEntity";
import { SizeEntity } from "../SizeEntity";
import { Border } from "./Border";
import { Extendable } from "./Extendable";
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
    getTopMargin () : SizeDTO;
    getBottomMargin () : SizeDTO;
    getRightMargin () : SizeDTO;
    getLeftMargin () : SizeDTO;

    setMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setTopMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setBottomMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setRightMargin (value: SizeEntity | SizeDTO | number | undefined) : this;
    setLeftMargin (value: SizeEntity | SizeDTO | number | undefined) : this;


    getPadding () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;
    setPadding (value: SizeEntity | SizeDTO | number | undefined) : this;

    getTopPadding () : SizeDTO;
    getBottomPadding () : SizeDTO;
    getRightPadding () : SizeDTO;
    getLeftPadding () : SizeDTO;

    setTopPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setBottomPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setRightPadding (value: SizeEntity | SizeDTO | number | undefined) : this;
    setLeftPadding (value: SizeEntity | SizeDTO | number | undefined) : this;


    getBorder () : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined;
    setBorder (value : BorderEntity | BorderDTO | undefined) : this;

    getTopBorder () : BorderDTO;
    getBottomBorder () : BorderDTO;
    getRightBorder () : BorderDTO;
    getLeftBorder () : BorderDTO;

    setTopBorder (value: Border | BorderDTO | number | undefined) : this;
    setBottomBorder (value: Border | BorderDTO | number | undefined) : this;
    setRightBorder (value: Border | BorderDTO | number | undefined) : this;
    setLeftBorder (value: Border | BorderDTO | number | undefined) : this;

}
