"use strict";

class Constants {
  static success() {
    return { success: true };
  }

  static failure() {
    return { success: false };
  }
  static status200() {
    return { status: 200 };
  }
  static status400() {
    return { status: 400 };
  }

  static status401() {
    return { status: 401 };
  }

  static status404() {
    return { status: 404 };
  }

  static status409() {
    return { status: 409 };
  }
  static status500() {
    return { status: 500 };
  }
  static info(data = "") {
    if (data === "") {
      return {
        error: "",
        message: "",
      };
    }

    if (data.length === 0) {
      return {
        error: "",
        message: "No records found",
      };
    } else {
      return {
        error: "An error has occurred",
        message: data,
      };
    }
  }
  static message(message = "") {
    if (typeof message === "string" || message instanceof String) {
      return {
        error: "",
        message,
      };
    } else {
      return {
        error: "",
        message: "",
      };
    }
  }
  static data(data) {
    return { data };
  }
  static emailexist(){
    return {
      status: "failed",
      message: "Email already exist.",
    };
  }
  static AllFields(){
    return {
      status: "failed",
      message: "All fields are required.",
    };
  }
}

module.exports = Constants;
