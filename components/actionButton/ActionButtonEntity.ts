// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonAny } from "../../../../hg/core/Json";
import { isString } from "../../../../hg/core/types/String";
import { ComponentEntity } from "../../types/ComponentEntity";
import { createActionDTO, ActionDTO } from "../../dto/ActionDTO";
import { ACTION_BUTTON_COMPONENT_NAME } from "./ActionButtonComponent";

export class ActionButtonEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(ACTION_BUTTON_COMPONENT_NAME);
    }

    public static create (name : string) : ActionButtonEntity {
        return new ActionButtonEntity(name);
    }

    public static createButton (
        name: string,
        dto: ActionDTO | string,
    ) : ActionButtonEntity {

        if (isString(dto)) {
            return this.createButton(
                name,
                createActionDTO(
                    '',
                    dto,
                    'link',
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
