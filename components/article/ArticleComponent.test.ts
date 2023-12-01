import {ARTICLE_COMPONENT_NAME, ArticleComponent, createArticleComponent} from "./ArticleComponent";
import {HyperComponent} from "../../../../../sendanor/hyperstack/dto/types/HyperComponent";

describe('createArticleComponent', () => {
    it('should create ArticleComponent with default values', () => {
        const expectedArticleComponent: ArticleComponent = {
            name: ARTICLE_COMPONENT_NAME,
            extend: HyperComponent.Article,
            content: [],
            meta: undefined,
        };

        const articleComponent: ArticleComponent = createArticleComponent();

        expect(articleComponent).toEqual(expectedArticleComponent);
    });
});