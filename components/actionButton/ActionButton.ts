// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonAny } from "../../../../hg/core/Json";
import { isString } from "../../../../hg/core/types/String";
import { ComponentEntity } from "../../types/ComponentEntity";
import { createHyperAction, HyperAction } from "../../types/HyperAction";
import { ACTION_BUTTON_COMPONENT_NAME } from "./ActionButtonComponent";

export class ActionButton extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(ACTION_BUTTON_COMPONENT_NAME);
    }

    public static create (name : string) : ActionButton {
        return new ActionButton(name);
    }

    public static createButton (
        name: string,
        dto: HyperAction | string,
    ) : ActionButton {

        if (isString(dto)) {
            return this.createButton(
                name,
                createHyperAction(
                    '',
                    dto,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                )
            );
        }

        const text = dto.label;
        const href = dto.target;
        const method = dto.method ?? 'POST';
        const body = dto.body;
        const successRedirect = dto.successRedirect;
        const failureRedirect = dto.errorRedirect;

        return this.create(name).addText(text).setMeta(
            {
                href,
                successRedirect: successRedirect as unknown as ReadonlyJsonAny,
                failureRedirect: failureRedirect as unknown as ReadonlyJsonAny,
                method: method.toUpperCase(),
                body,
            }
        );

    }

}
