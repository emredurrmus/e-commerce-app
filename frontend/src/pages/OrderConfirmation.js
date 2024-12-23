import { Container, Typography, Paper, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Thank you for your purchase. Your order has been received and is being
          processed.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
