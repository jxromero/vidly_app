import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateOnSubmit = () => {
    const options = { abortEarly: false };
    // Destructuring result = { error }
    const result = Joi.validate(this.state.data, this.schema, options);
    // console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateOnChange = props => {
    const { name, value } = props;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validateOnSubmit();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  //   Destructuring (e)
  handleChange = e => {
    const { currentTarget: input } = e;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateOnChange(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validateOnSubmit()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, genres) {
    const { data, errors } = this.state;
    return (
      <Select
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        genres={genres}
        label={label}
        error={errors[name]}
      />
    );
  }
}

export default Form;
