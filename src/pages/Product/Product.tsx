import { useLoaderData, useParams } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";

export function Product() {
  const { id } = useParams();
  const data = useLoaderData() as Product;

  return (
    <>
      Product: {id} {data.name}
    </>
  );
}
