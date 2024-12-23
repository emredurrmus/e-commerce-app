import { Container, Typography, Grid } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Our E-Commerce Store
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
