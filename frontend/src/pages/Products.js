import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { productService } from "../services/productService";
import { addToBasket } from "../store/slices/basketSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
  position: "relative",
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
  marginTop: theme.spacing(2),
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
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard>
              <ProductMedia
                image={product.imageUrl || "https://via.placeholder.com/300"}
                title={product.name}
              />
              <ProductContent>
                <Box>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ minHeight: "60px" }}
                  >
                    {product.description}
                  </Typography>
                </Box>
                <Box>
                  <PriceTypography variant="h6">
                    ${product.price}
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
    </Container>
  );
};

export default Products;
