import React from "react";
import TextField from "@material-ui/core/TextField";

const UserName = ({ form, context }) => {
  return (
    <div>
      <TextField
        id="Email"
        label={"Nom utilisateur"}
        InputLabelProps={{
          className: "input-label-account",
        }}
        InputProps={{
          className: "input-account",
        }}
        placeholder={"E-mail"}
        value={context.state.email}
        name={"email"}
        onChange={(e) => context.onEmailChanged(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        // inputRef={form.register({ required: true, pattern: /^\S+@\S+$/i })}
        inputRef={form.register({
          required: true
        })}
      />
      {form.errors.email && (
        <div style={{ textAlign: "left", color: "#DC0710" }}>
          <span className="form-error-text">Nom utilisateur incorrect</span>
        </div>
      )}
    </div>
  );
};

export default UserName;
