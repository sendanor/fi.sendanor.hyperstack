// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../hg/core/Json";
import { ColorDTO } from "../../dto/ColorDTO";
import { SizeDTO } from "../../dto/SizeDTO";
import { BorderStyle } from "../../dto/types/BorderStyle";
import { JsonSerializable } from "./JsonSerializable";

/**
 * Presents a border value
 */
export interface Border extends JsonSerializable {

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

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

    setWidth (value : SizeDTO) : this;
    getWidth () : SizeDTO | undefined;

    setColor (value : ColorDTO) : this;
    getColor () : ColorDTO | undefined;

}
