// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity, ComponentEntityContent } from "../../../types/ComponentEntity";
import { TABLE_COLUMN_COMPONENT_NAME } from "./TableColumnComponent";

export class TableColumn extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_COLUMN_COMPONENT_NAME);
    }

    public static create (name : string) : TableColumn {
        return new this(name);
    }

    public static createColumn (
        name: string,
        data: ComponentEntityContent,
    ) : TableColumn {
        return this.create(name).add(data);
    }

}
