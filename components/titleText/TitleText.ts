// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../types/ComponentEntity";
import { TITLE_TEXT_COMPONENT_NAME } from "./TitleTextComponent";

export class TitleText extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(TITLE_TEXT_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : TitleText {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : TitleText {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
