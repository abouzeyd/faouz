/* eslint-disable prettier/prettier */
import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/AuthLogin';
import LockOutlined from '@ant-design/icons/LockOutlined';

// ================================|| JWT - LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <div
            style={{
              backgroundColor: '#34a1eb',
              padding: '2rem',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '1rem'
              }}
            >
              <LockOutlined style={{ fontSize: 30, color: '#34a1eb' }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Scoring Bancaire</h1>
            <p className="text-white">Connexion à votre espace</p>
          </div>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            {/* <Typography component={Link} to={'/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography> */}
          </Stack>
        </Grid>
        <Grid size={10} sx={{ p: 2, width: 500 }}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
