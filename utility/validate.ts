export default class Validate {
  constructor(parameters) {}

  static lecture = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
    sciTitle: {
      presence: must,
      type: "string",
    },
  });
  static login = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static admin = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static department = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
  });

  static proejcts = (must = true) => ({
    title: {
      presence: must,
      type: "string",
    }
  });
}
