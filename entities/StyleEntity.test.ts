// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { StyleEntity } from "./StyleEntity";

describe('StyleEntity', () => {
    describe('merge', () => {
        it('can merge multiple styles', () => {

            const styles = StyleEntity.merge(
                StyleEntity.create().setWidth(100),
                StyleEntity.create().setHeight(200),
            );

            expect(styles.getWidth()).toBe(100);
            expect(styles.getHeight()).toBe(200);

        });
    });
});
