// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.
import {createHyperViewDTO} from "./HyperViewDTO";

describe('createHyperViewDTO', () => {
    it('Should create some viewable data object', () => {
        const HyperView = createHyperViewDTO("Testi")

        expect(HyperView.name).toBe("Testi");
        expect(HyperView.extend).toBeUndefined();
        expect(HyperView.publicUrl).toBeUndefined();
        expect(HyperView.language).toBeUndefined();
        expect(HyperView.seo).toBeUndefined();
        expect(HyperView.style).toBeUndefined();
    });
});