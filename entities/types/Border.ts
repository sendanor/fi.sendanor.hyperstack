// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { isFunction } from "../../../../hg/core/types/Function";
import { isObject } from "../../../../hg/core/types/Object";
import { BorderDTO } from "../../dto/BorderDTO";
import { ColorDTO } from "../../dto/ColorDTO";
import { SizeDTO } from "../../dto/SizeDTO";
import { BorderStyle } from "../../dto/types/BorderStyle";
import { ColorEntity } from "../ColorEntity";
import { Color } from "./Color";
import { JsonSerializable } from "./JsonSerializable";
import { Size } from "./Size";

/**
 * Presents a border value
 */
export interface Border extends JsonSerializable {

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    getDTO () : BorderDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

    setStyle (value : BorderStyle) : this;
    getStyle () : BorderStyle | undefined;

    setWidth (value : Size | SizeDTO | number | undefined) : this;
    getWidth () : Size | undefined;
    getWidthDTO () : SizeDTO | undefined;

    setRadius (value : Size | SizeDTO | number | undefined) : this;
    getRadius () : Size | undefined;
    getRadiusDTO () : SizeDTO | undefined;

    setColor (value : Color | ColorDTO | ColorEntity | string) : this;
    getColor () : Color | undefined;
    getColorDTO () : ColorDTO | undefined;

}

export function isBorder (
    value: unknown
): value is Border {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.setStyle)
        && isFunction(value?.getStyle)
        && isFunction(value?.setWidth)
        && isFunction(value?.getWidth)
        && isFunction(value?.setColor)
        && isFunction(value?.getColor)
    );
}
