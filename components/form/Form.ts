// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { HyperComponentContent } from "../../dto/HyperComponentDTO";
import { ComponentEntity } from "../../types/ComponentEntity";
import { FORM_COMPONENT_NAME } from "./FormComponent";

export class Form extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( FORM_COMPONENT_NAME );
    }

    public static create (name : string) : Form {
        return new this(name);
    }

    public static createForm (
        name: string,
        content: HyperComponentContent,
    ) : Form {
        return this.create(name).add(content).setMeta({});
    }

}
