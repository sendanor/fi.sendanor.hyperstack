import {ArticleText, createArticleText} from "./ArticleText";
import {ARTICLE_COMPONENT_NAME} from "../article/ArticleComponent";

describe('createArticleText', () => {
    it('should create ArticleText with provided name and text', () => {
        const name = 'ArticleTextName';
        const text = 'Lorem ipsum dolor sit amet.';

        const expectedArticleText: ArticleText = {
            name: name,
            extend: ARTICLE_COMPONENT_NAME,
            content: [text],
            meta: undefined,
        };

        const articleText: ArticleText = createArticleText(name, text);

        expect(articleText).toEqual(expectedArticleText);
    });
});