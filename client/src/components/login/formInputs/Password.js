import React from "react";
import TextField from "@material-ui/core/TextField";

const Password = ({ form, context }) => {
  return (
    <div>
      <TextField
        type="password"
        label={"Mot de passe"}
        InputLabelProps={{
          className: "input-label-account",
        }}
        InputProps={{
          className: "input-account",
        }}
        placeholder={"Mot de passe"}
        value={context.state.password}
        name="password"
        onChange={(e) => context.onPasswordChanged(e.target.value)}
        helperText=""
        fullWidth
        margin="normal"
        variant="outlined"
        inputRef={form.register({
          required: true,
          pattern: /^.{6,}/,
          maxLength: 20,
        })}
      />
      {form.errors.password && (
        <div style={{textAlign:'left', color:'#DC0710'}}>
          <span className="form-error-text">Mot de passe incorrect</span>
        </div>
      )}
    </div>
  );
};

export default Password;
