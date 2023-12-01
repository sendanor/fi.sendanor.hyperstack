// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../types/ComponentEntity";
import { ARTICLE_COMPONENT_NAME } from "./ArticleComponent";

export class Article extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( ARTICLE_COMPONENT_NAME );
    }

    public addText (value: string) : this {
        return this.add(value);
    }

    public static create (name : string) : Article {
        return new this(name);
    }

    public static createText (
        name : string,
        text : string,
    ) : Article {
        return this.create(name).addText(text);
    }

}
