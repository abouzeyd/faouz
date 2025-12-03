// material-ui

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

// project imports
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Tableau de bord</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Utilisateurs" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Demandes" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Taux d'approbation" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="CA du mois" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
    </Grid>
  );
}
