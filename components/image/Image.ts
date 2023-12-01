// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../types/ComponentEntity";
import { IMAGE_COMPONENT_NAME } from "./ImageComponent";

export class Image extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(IMAGE_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : Image {
        return new this( name );
    }

    public static createImage (
        name   : string,
        source : string,
        alt    : string = '',
    ) : Image {
        return this.create(name).setMeta({
            source,
            alt,
        });
    }

}
