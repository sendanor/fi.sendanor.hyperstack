import { populateHyperViewDTO } from "../../utils/views/populateHyperViewDTO";
import { isArrayOf } from "../../../../hg/core/types/Array";
import { createHyperViewDTO } from '../../dto/HyperViewDTO';

describe('populateHyperViewDTO', () => {

    const viewWithoutExtension = createHyperViewDTO('View1', undefined, 'url1', 'en', undefined, ["Content 1", "Content 2"], undefined);
    const viewWithExtension = createHyperViewDTO('View2', 'View1', undefined, 'fr', undefined, "Content 3", undefined);
    const components = [viewWithoutExtension, viewWithExtension];
  
    it('should return the original view when extend is undefined', () => {
      const result = populateHyperViewDTO(viewWithoutExtension, components);
      expect(result).toEqual(viewWithoutExtension);
    });
  
    it('should populate the view with properties from the extended view', () => {
      const result = populateHyperViewDTO(viewWithExtension, components);
  
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
  
    it('should throw an error when the extended view is not found', () => {
      const viewNotFound = createHyperViewDTO('View3', 'NonexistentView', undefined, 'es', undefined, "Content 4", undefined);
      expect(() => populateHyperViewDTO(viewNotFound, components)).toThrowError(
        new TypeError('Could not find view by name NonexistentView to extend for View3')
      );
    });
});
