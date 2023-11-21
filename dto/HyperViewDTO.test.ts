// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.
import {createHyperViewDTO, isHyperViewDTO} from "./HyperViewDTO";

describe('createHyperViewDTO', () => {
    it('Should create some viewable data object', () => {
        const HyperView = createHyperViewDTO(
            "Testi",
            "Testi",
            "Testi",
            "Testi",
            undefined,
            "Testi",
            undefined
        )

        expect(HyperView.name).toBe("Testi");
        expect(HyperView.extend).toBe("Testi");
        expect(HyperView.publicUrl).toBe("Testi");
        expect(HyperView.language).toBe("Testi");
        expect(HyperView.seo).toBeUndefined();
        expect(HyperView.content).toBe("Testi");
        expect(HyperView.style).toBeUndefined();
    });
});


