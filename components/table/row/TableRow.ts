// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity, ComponentEntityContent } from "../../../types/ComponentEntity";
import { TableColumn } from "../column/TableColumn";
import { TABLE_ROW_COMPONENT_NAME } from "./TableRowComponent";

export class TableRow extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_ROW_COMPONENT_NAME);
    }

    public addColumn (item : TableColumn) : this {
        return this.add(item);
    }

    public static create (name : string) : TableRow {
        return new this(name);
    }

    public static createRow (
        name: string,
        data: ComponentEntityContent,
    ) : TableRow {
        return this.create(name).add(data);
    }

}
