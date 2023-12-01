// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { Article } from "../article/Article";

export class ArticleText extends Article {

    public static create (name : string) : ArticleText {
        return new this(name);
    }

    public static createText (
        name : string,
        text : string,
    ) : ArticleText {
        return this.create(name).addText(text);
    }

}
