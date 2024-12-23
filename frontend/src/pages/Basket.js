import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
  removeFromBasket,
  updateQuantity,
} from "../store/slices/basketSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Basket = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/50"}
                    alt={item.name}
                    style={{ width: 50, marginRight: 16 }}
                  />
                  <Typography>{item.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: 80 }}
                  />
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              borderTop: 1,
              pt: 2,
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            href="/checkout"
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Basket;
