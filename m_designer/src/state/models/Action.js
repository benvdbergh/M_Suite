export class Action {
  constructor(actionType, actionDescription, required, blockingType, actionParameters) {
    this.actionType = actionType;
    this.actionDescription = actionDescription;
    this.required = required;
    this.blockingType = blockingType;
    this.actionParameters = actionParameters;
  }

  static fromJSON(json) {
    const actionParameters = json.actionParameters.map(param => ActionParameter.fromJSON(param));
    return new Action(
      json.actionType,
      json.actionDescription,
      json.required,
      json.blockingType,
      actionParameters
    );
  }

  toJSON() {
    return {
      actionType: this.actionType,
      actionDescription: this.actionDescription,
      required: this.required,
      blockingType: this.blockingType,
      actionParameters: this.actionParameters.map(param => param.toJSON())
    };
  }
}

export class ActionParameter {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  static fromJSON(json) {
    return new ActionParameter(json.key, json.value);
  }

  toJSON() {
    return {
      key: this.key,
      value: this.value
    };
  }
}