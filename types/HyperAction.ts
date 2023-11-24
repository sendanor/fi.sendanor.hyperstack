// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../../hg/core/Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../hg/core/types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../hg/core/types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../hg/core/types/RegularObject";
import { explainString, isString } from "../../../hg/core/types/String";
import { isUndefined } from "../../../hg/core/types/undefined";

export interface HyperAction {

    /**
     * Label of the action
     */
    readonly label: string;

    /**
     * The target for the action, e.g. URL.
     */
    readonly target: string;

    /**
     * The HTTP method to use, e.g. "POST"
     */
    readonly method: string;

    /**
     * The HTTP request body to use for the request.
     *
     * If this value is not provided, and this action was a chained action from
     * a success or an error handler, the response body from the previous action
     * will be used instead.
     */
    readonly body: ReadonlyJsonObject | undefined;

    /**
     * The action when the response was successful.
     *
     * Defaults to redirection to another view or resource if a string is provided.
     *
     * If `HyperAction` is provided, will perform another action. See the body
     * property. The response from the first action will be provided as the body
     * for this action if the success action does not define one.
     */
    readonly successRedirect : string | HyperAction | undefined;

    /**
     * The action when the response was unsuccessful.
     *
     * Defaults to redirection to another view or resource if a string is provided.
     *
     * If `HyperAction` is provided, will perform another action. See the body
     * property. The response from the first action will be provided as the body
     * for this action if the success action does not define one.
     */
    readonly errorRedirect ?: string | HyperAction | undefined;

}

export function createHyperAction (
    label : string,
    target : string,
    method : string,
    body : ReadonlyJsonObject | undefined,
    successRedirect : string | HyperAction | undefined,
    errorRedirect : string | HyperAction | undefined,
) : HyperAction {
    return {
        label,
        target,
        method,
        body,
        successRedirect,
        errorRedirect,
    };
}

export function isHyperAction (value: unknown) : value is HyperAction {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'label',
            'target',
            'method',
            'body',
            'successRedirect',
            'errorRedirect',
        ])
        && isString(value?.label)
        && isString(value?.target)
        && isString(value?.method)
        && isReadonlyJsonObjectOrUndefined(value?.body)
        && isHyperActionOrStringOrUndefined(value?.successRedirect)
        && isHyperActionOrStringOrUndefined(value?.errorRedirect)
    );
}

export function explainHyperAction (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'label',
                'target',
                'method',
                'body',
                'successRedirect',
                'errorRedirect',
            ])
            , explainProperty("label", explainString(value?.label))
            , explainProperty("target", explainString(value?.target))
            , explainProperty("method", explainString(value?.method))
            , explainProperty("body", explainString(value?.body))
            , explainProperty("successRedirect", explainHyperActionOrStringOrUndefined(value?.successRedirect))
            , explainProperty("errorRedirect", explainHyperActionOrStringOrUndefined(value?.errorRedirect))
        ]
    );
}

export function stringifyHyperAction (value : HyperAction) : string {
    return `HyperAction(${value})`;
}

export function parseHyperAction (value: unknown) : HyperAction | undefined {
    if (isHyperAction(value)) return value;
    return undefined;
}

export function isHyperActionOrUndefined (value: unknown): value is HyperAction | undefined {
    return isUndefined(value) || isHyperAction(value);
}

export function explainHyperActionOrUndefined (value: unknown): string {
    return isHyperActionOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperAction', 'undefined']));
}

export function isHyperActionOrStringOrUndefined (value: unknown): value is HyperAction | undefined {
    return isUndefined(value) || isString(value) || isHyperAction(value);
}

export function explainHyperActionOrStringOrUndefined (value: unknown): string {
    return isHyperActionOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperAction', 'undefined', 'string']));
}
