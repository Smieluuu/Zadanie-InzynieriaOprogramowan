import React, { useState } from "react";
import Joi from "joi";

const JoiInput = ({ schema, ...inputProps }) => {
  const [error, setError] = useState(null);

  const validate = (value) => {
    const { error } = schema.validate(value, { abortEarly: false });
    setError(error ? error.details[0].message : null);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    validate(value);
    if (inputProps.onChange) {
      inputProps.onChange(event);
    }
  };

  return (
    <>
      <input {...inputProps} onChange={handleChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

const emailSchema = Joi.string().email({ tlds: { allow: false } });
const passwordSchema = Joi.string()
  .min(8)
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    )
  );
const alphanumericSchema = Joi.string().alphanum();

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  return (
    <form>
      <JoiInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        schema={emailSchema}
      />
      <JoiInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        schema={passwordSchema}
      />
      <JoiInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        schema={alphanumericSchema}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
