import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import ModalProfilPrivilege from '../../components/ModalMultipleProfil';
import useAuth from './useAuth';
// import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  function SimpleAlert() {
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
      </Alert>
    );
  }

  const {
    handleClickShowPassword,
    handleSubmit,
    handleCancel,
    handleMouseDownPassword,
    handleOk,
    isModalOpen,
    setReceiveProfilId,
    setPassword,
    setUsername,
    authentication,
    getNewRoute,
    setUsernameValue,
    setPasswordValue,
    showPassword,
    alertMessage,
    alertSeverity
  } = useAuth(SimpleAlert);

  return (
    <>
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
            .max(50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères")
            .required("Le nom d'utilisateur est requis")
            .matches(/^[a-zA-Z0-9_]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"),
          password: Yup.string()
            .required('Le mot de passe est requis')
            .test(
              'no-leading-trailing-whitespace',
              'Le mot de passe ne peut pas commencer ou finir par des espaces',
              (value) => value === value.trim()
            )
            .min(4, 'Le mot de passe doit contenir au moins 4 caractères')
            .max(20, 'Le mot de passe ne peut pas dépasser 20 caractères')
        })}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => {
          return (
            <form noValidate>
              {/* Affichage des erreurs */}
              {authentication.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {authentication.error}
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="username-login">Nom d'utilisateur</InputLabel>
                    <OutlinedInput
                      id="username-login"
                      type="text"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setUsername(e.target.value);
                      }}
                      placeholder="Entrez votre nom d'utilisateur, matricule ou email"
                      fullWidth
                      error={Boolean(touched.username && errors.username)}
                      disabled={authentication.loading}
                    />
                  </Stack>
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-username-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="password-login">Mot de passe</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setPassword(e.target.value);
                      }}
                      disabled={authentication.loading}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Entrez votre mot de passe"
                    />
                  </Stack>
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid sx={{ mt: -1 }} size={12}>
                  <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                      Mot de passe oublié ?
                    </Link>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <AnimateButton>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit()}
                      disabled={authentication.loading}
                      startIcon={authentication.loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {authentication.loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>

      <ModalProfilPrivilege open={isModalOpen} onOk={handleOk} onCancel={handleCancel} setReceiveProfilId={setReceiveProfilId} />
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
