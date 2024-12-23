import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.basket);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleConfirmOrder = async () => {
    try {
      // Here you would typically make an API call to process the order
      console.log("Order processed:", {
        items,
        total,
        shipping: shippingData,
        payment: paymentData,
      });

      // Navigate to confirmation page
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={shippingData.firstName}
            onChange={(e) =>
              setShippingData({ ...shippingData, firstName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={shippingData.lastName}
            onChange={(e) =>
              setShippingData({ ...shippingData, lastName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            value={shippingData.address}
            onChange={(e) =>
              setShippingData({ ...shippingData, address: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            value={shippingData.city}
            onChange={(e) =>
              setShippingData({ ...shippingData, city: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="State"
            value={shippingData.state}
            onChange={(e) =>
              setShippingData({ ...shippingData, state: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            value={shippingData.zipCode}
            onChange={(e) =>
              setShippingData({ ...shippingData, zipCode: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={shippingData.phone}
            onChange={(e) =>
              setShippingData({ ...shippingData, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth size="large">
            Continue to Payment
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            value={paymentData.cardNumber}
            onChange={(e) =>
              setPaymentData({ ...paymentData, cardNumber: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Name on Card"
            value={paymentData.cardName}
            onChange={(e) =>
              setPaymentData({ ...paymentData, cardName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            value={paymentData.expiryDate}
            onChange={(e) =>
              setPaymentData({ ...paymentData, expiryDate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="CVV"
            value={paymentData.cvv}
            onChange={(e) =>
              setPaymentData({ ...paymentData, cvv: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth size="large">
            Review Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const renderOrderReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {items.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography>
              {item.name} x {item.quantity} - $
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Details
        </Typography>
        <Typography>
          {shippingData.firstName} {shippingData.lastName}
        </Typography>
        <Typography>{shippingData.address}</Typography>
        <Typography>
          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
        </Typography>
        <Typography>{shippingData.phone}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormPaper>
        {activeStep === 0 && renderShippingForm()}
        {activeStep === 1 && renderPaymentForm()}
        {activeStep === 2 && renderOrderReview()}
      </FormPaper>
    </Container>
  );
};

export default Checkout;
