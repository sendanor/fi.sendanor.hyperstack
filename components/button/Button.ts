// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../types/ComponentEntity";
import { BUTTON_COMPONENT_NAME } from "./ButtonComponent";

export class Button extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( BUTTON_COMPONENT_NAME );
    }

    public static create (name : string) : Button {
        return new this(name);
    }

    public static createButton (
        name : string,
        text : string,
        eventName : string,
    ) : Button {
        return this.create(name).addText(text).setEventName(eventName);
    }

    public setEventName (eventName : string) : this {
        return this.setMeta({eventName});
    }

}
