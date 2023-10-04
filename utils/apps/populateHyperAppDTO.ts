// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperAppDTO, HyperAppDTO } from "../../dto/HyperAppDTO";
import { findHyperAppDTO } from "./findHyperAppDTO";

export function populateHyperAppDTO (
    app: HyperAppDTO,
    apps: readonly HyperAppDTO[]
): HyperAppDTO {

    const extendName: string | undefined = app.extend;
    console.log(`WOOT: populateHyperAppDTO: extendName: `, extendName, app);
    if ( extendName === undefined ) {
        return app;
    }

    const extendApp: HyperAppDTO | undefined = findHyperAppDTO(
        extendName,
        apps,
    );

    console.log(`WOOT: populateHyperAppDTO: extendApp.routes: `, extendApp.routes);
    console.log(`WOOT: populateHyperAppDTO: app.routes: `, app.routes);

    const newRoutes = [
        ...(extendApp.routes),
        ...(app.routes),
    ];
    console.log(`WOOT: populateHyperAppDTO: newRoutes: `, newRoutes);

    const newDto : HyperAppDTO = createHyperAppDTO(
        app.name,
        extendApp.extend,
        newRoutes,
        app.publicUrl ?? extendApp.publicUrl,
        app.language ?? extendApp.language,
    );
    console.log(`WOOT: populateHyperAppDTO: newDto: `, newDto);

    if (newDto.extend === undefined) {
        return newDto;
    }

    return populateHyperAppDTO( newDto, apps );

}