import { useLoaderData, useParams } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";

export function Product() {
  const { id } = useParams();
  const data = useLoaderData() as Product;

  //throw new Error("some error"); /* Эта ошибка обрабатывается в файле main.tsx - router - errorElement */

  return (
    <>
      Product: {id} {data.name}
    </>
  );
}
