import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import { fetchGenderProducts } from "../../featuers/api/apiSlice";
import ProductCard from "../Home-page/ProductCard";

export default function ProductCategoryPage() {
  const { gender } = useParams();
  const dispatch = useDispatch();
  const { genderProducts, loading, error } = useSelector(
    (state) => state.fetchSlice
  );
  console.log(error);
  const products = genderProducts[gender] || [];

  useEffect(() => {
    if (
      gender &&
      (!genderProducts[gender] || genderProducts[gender].length === 0)
    ) {
      dispatch(fetchGenderProducts(gender));
    }
  }, [dispatch, gender, genderProducts]);

  if (loading)
    return (
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  if (error) {
    return (
      <div className="w-fit text-[30px] text-red-800 font-bold m-auto p-3">
        {error}, pleae Try Again ...
      </div>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {gender}'s Products
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard
              title={product.title}
              rating={product.rating}
              imageUrl={product.images[0]}
              price={`$ ${product.price}`}
              description={product.description}
              warranty={
                product.warrantyInformation || "No warranty information"
              }
              productId={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
