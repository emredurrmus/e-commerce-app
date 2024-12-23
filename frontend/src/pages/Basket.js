import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  styled,
  IconButton,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../store/slices/basketSlice";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const BasketCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const ProductImage = styled("img")({
  width: "100%",
  maxWidth: "120px",
  height: "auto",
  objectFit: "contain",
});

const TotalSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Basket = () => {
  const { items, total } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddMore = (item) => {
    dispatch(addToBasket(item));
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <ShoppingCartIcon
          sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          Your basket is empty
        </Typography>
        <Button variant="contained" href="/products" sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Shopping Basket
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <BasketCard key={item.id}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <ProductImage
                      src={item.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.name}
                    />
                  </Grid>
                  <Grid item xs={6} sm={7}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price} per item
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Qty: {item.quantity}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleAddMore(item)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </BasketCard>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalSection>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>${total.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </TotalSection>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Basket;
