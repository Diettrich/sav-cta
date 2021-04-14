import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { AccountContext } from "../../contexts";
import { useForm } from "react-hook-form";
import UserName from "./formInputs/UserName";
import Password from "./formInputs/Password";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import { ActivityIndicator } from "../../components";
import { isLogin } from "../../helpers/Utils";

export default function LoginForm() {
  const classes = useStyles();
  const form = useForm();
  const account = useContext(AccountContext);
  const onSubmit = (data) => account.loginUser(data);

  const loadingRender = () => {
    if (account.state.isLoading) {
      return <ActivityIndicator />;
    } else {
      return (
        <>
          <UserName form={form} context={account} />
          <Password form={form} context={account} />
          <Button type="submit" className={classes.submit}>
            Se connecter
          </Button>
        </>
      );
    }
  };

  return (
    <>
      {isLogin() && account.state.loggingIn ? (
        <Redirect to="/dashboard/requests" />
      ) : (
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={4} className={classes.box}>
            <div className={classes.subBox}>
              <img src="/logo-electroplanet.svg" alt="logo" style={{width:"220px", height:"60px", marginBottom:"3pc"}}/>
              <Typography
                variant="h6"
                className={classes.ourTitles}
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "28px",
                  lineHeight: "34px",
                }}
              >
                Bienvenue chez Electroplanet
              </Typography>
              <Typography
                variant="h6"
                className={classes.ourTitles}
                style={{ textAlign: "center", fontSize: "18px" }}
              >
                Connectez-vous pour accéder de manière sécurisée à votre profil,
                aux informations produit et plus
              </Typography>
            </div>
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                fontSize: "14px",
                display: "inline-block",
                alignSelf: "flex-end",
                marginBottom: "20px",
                color: "#ffffff",
                fontStyle: "italic",
              }}
            >
              Electroplanet
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <div className={classes.paper}>
              <div className={classes.form}>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    marginBottom: "20px",
                    fontSize: "28px",
                  }}
                >
                  Méga Choix, Méga Services!
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "16px",
                  }}
                >
                  AUTHENTIFICATION
                </Typography>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {loadingRender()}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
