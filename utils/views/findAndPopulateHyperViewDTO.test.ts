import { findAndPopulateHyperViewDTO } from "../../utils/views/findAndPopulateHyperViewDTO";
import { isArrayOf } from "../../../../hg/core/types/Array";
import { createHyperViewDTO } from '../../dto/HyperViewDTO';

describe('findAndPopulateHyperViewDTO', () => {

    const viewWithoutExtension = createHyperViewDTO('View1', undefined, 'url1', 'en', undefined, ["Content 1", "Content 2"], undefined);
    const viewWithExtension = createHyperViewDTO('View2', 'View1', undefined, 'fr', undefined, "Content 3", undefined);
    const viewNotFound = createHyperViewDTO('View3', 'NonexistentView', undefined, 'es', undefined, "Content 4", undefined);
    const views = [viewWithoutExtension, viewWithExtension, viewNotFound];
  
    it('should find and return the original view when extend is undefined', () => {
        const result = findAndPopulateHyperViewDTO("View1", views);
        expect(result).toEqual(viewWithoutExtension);
    });
  
    it('should find the view and populate it with properties from the extended view', () => {
        const result = findAndPopulateHyperViewDTO("View2", views);
    
        // Verify that properties from the extended view are merged correctly
        expect(result.name).toEqual('View1'); // Name from the extended view
        expect(result.publicUrl).toEqual('url1'); // Public URL from the extended view
        expect(result.language).toEqual('en'); // Language from the extended view
        expect(isArrayOf<string>(result?.content, undefined, 3, 3)).toEqual(true); // Merged content from both views
    
        // Make sure the original view is not modified
        expect(viewWithExtension.name).toEqual('View2');
        expect(viewWithExtension.language).toEqual('fr'); // Original view language should not be modified
        expect(viewWithExtension.content).toEqual("Content 3"); // Original content
    });

    it('should throw an error when the view is not found', () => {
        expect(() => findAndPopulateHyperViewDTO('NonexistentView', views)).toThrowError(
            new TypeError('Could not find app by name: NonexistentView')
        );
    });
  
    it('should throw an error when the extended view is not found', () => {
        expect(() => findAndPopulateHyperViewDTO("View3", views)).toThrowError(
            new TypeError('Could not find view by name NonexistentView to extend for View3')
        );
    });
});

