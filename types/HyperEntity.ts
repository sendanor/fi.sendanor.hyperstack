// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createHyperDTO, HyperDTO } from "../dto/HyperDTO";

export class HyperEntity {

    protected _name : string;
    protected _extend : string | undefined;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
    }

    public getName () : string {
        return this._name;
    }

    public getDTO () : HyperDTO {
        return createHyperDTO(
            this._name,
            this._extend,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }

    public extend (name : string) : this {
        this._extend = name;
        return this;
    }

    public static create (name : string) : HyperEntity {
        return new HyperEntity(name);
    }

}

export function isHyperEntity (value: unknown): value is HyperEntity {
    return value instanceof HyperEntity;
}

