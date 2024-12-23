import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { ShoppingCart, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const basketItems = useSelector((state) => state.basket.items);
  const itemCount = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
        >
          E-Commerce
        </Typography>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/add-product"
          startIcon={<Add />}
        >
          Add Product
        </Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
