import React, { useEffect, useState } from "react";
import { productService } from "../services/productService";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToBasket } from "../store/slices/basketSlice";

// Styled components
const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const ProductMedia = styled(CardMedia)({
  paddingTop: "56.25%", // 16:9 aspect ratio
  backgroundSize: "contain",
  backgroundColor: "#f5f5f5",
});

const ProductContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "16px",
});

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  marginTop: theme.spacing(1),
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard>
              <ProductMedia
                image={product.imageUrl || "https://via.placeholder.com/300"}
                title={product.name}
              />
              <ProductContent>
                <Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                </Box>
                <Box>
                  <PriceTypography variant="h6">
                    ${product.price?.toFixed(2)}
                  </PriceTypography>
                  <AddToCartButton
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToBasket(product)}
                  >
                    Add to Cart
                  </AddToCartButton>
                </Box>
              </ProductContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
