// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { HyperComponentContent } from "../../dto/HyperComponentDTO";
import { ComponentEntity } from "../../types/ComponentEntity";
import { TABLE_COMPONENT_NAME } from "./TableComponent";
import { TableRow } from "./row/TableRow";

export class Table extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_COMPONENT_NAME);
    }

    public addRow (row : TableRow) : this {
        return this.add(row);
    }

    public static create (name: string) : Table {
        return new this(name);
    }

    public static createTable (
        name: string,
        data: HyperComponentContent,
    ) : Table {
        return this.create(name).add(data);
    }

}
