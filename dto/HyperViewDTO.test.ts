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

describe('isHyperViewDTO', () => {
    it('Should return true for a valid HyperViewDTO object', () => {
        const validHyperViewDTO = {
            name: "Testi",
            extend: "Testi",
            publicUrl: "Testi",
            language: "Testi",
            seo: undefined,
            content: "Testi",
            style: undefined,
        };

        const result = isHyperViewDTO(validHyperViewDTO);

        expect(result).toBe(true);
    });

    it('Should return false for an invalid HyperViewDTO object', () => {
        const invalidHyperViewDTO = {
            // Missing some required properties
            name: "Testi",
        };

        const result = isHyperViewDTO(invalidHyperViewDTO);

        expect(result).toBe(false);
    });
});