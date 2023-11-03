import {createLoginView} from './LoginView';

describe('createLoginView', () => {
    it('should create a LoginView with the correct properties', () => {
        const loginView = createLoginView()

        expect(loginView.name).toBe("LoginView");
        expect(loginView.extend).toBe("DefaultView");
        expect(loginView.publicUrl).toBeUndefined();
        expect(loginView.language).toBeUndefined();
        expect(loginView.seo).toBeUndefined();

        expect(Array.isArray(loginView.content)).toBe(true);
        expect(loginView.content).toHaveLength(2);

        expect((loginView.content as any)[0].name).toBe('project');
        expect((loginView.content as any)[0].content[0]).toBe('Example');
        expect((loginView.content as any)[1].name).toBe('appName');
        expect((loginView.content as any)[1].content[0]).toBe('OrderApp');

        expect(loginView.style).toBeUndefined();


    });
});