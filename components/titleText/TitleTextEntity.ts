// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { TITLE_TEXT_COMPONENT_NAME } from "./TitleTextComponent";

export class TitleTextEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(TITLE_TEXT_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : TitleTextEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : TitleTextEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
