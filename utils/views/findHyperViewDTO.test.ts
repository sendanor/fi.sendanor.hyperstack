import { findHyperViewDTO } from "../../utils/views/findHyperViewDTO";
import { createHyperViewDTO } from '../../dto/HyperViewDTO';

describe('findHyperViewDTO', () => {
  const hyperView1 = createHyperViewDTO('View1', undefined, undefined, undefined, undefined, undefined, undefined);
  const hyperView2 = createHyperViewDTO('View2', undefined, undefined, undefined, undefined, undefined, undefined);
  const allViews = [hyperView1, hyperView2];

  it('should find a hyper view by name', () => {
    const result = findHyperViewDTO('View1', allViews);
    expect(result).toEqual(hyperView1);
  });

  it('should throw an error when the view is not found', () => {
    expect(() => findHyperViewDTO('NonexistentView', allViews)).toThrowError(
      new TypeError('Could not find app by name: NonexistentView')
    );
  });
});
