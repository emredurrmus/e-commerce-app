import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../store/slices/basketSlice";
import { orderService } from "../services/orderService";
import { useDispatch } from "react-redux";
import { clearBasket } from "../store/slices/basketSlice";

const steps = ["Shipping Information", "Review Order"];

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    customerName: "",
    shippingAddress: "",
    phone: "",
  });

  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        customerName: shippingInfo.customerName,
        shippingAddress: shippingInfo.shippingAddress,
        phone: shippingInfo.phone,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await orderService.createOrder(orderData);
      dispatch(clearBasket());
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const renderShippingForm = () => (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="customerName"
            value={shippingInfo.customerName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Shipping Address"
            name="shippingAddress"
            value={shippingInfo.shippingAddress}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderOrderReview = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography>
            {item.name} x {item.quantity}
          </Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          pt: 2,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Typography>{shippingInfo.customerName}</Typography>
        <Typography>{shippingInfo.shippingAddress}</Typography>
        <Typography>{shippingInfo.phone}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? renderShippingForm() : renderOrderReview()}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Place Order" : "Review"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Checkout;
