import { useLoaderData, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";

export function Product() {
  const { id } = useParams();
  const data = useLoaderData() as IProduct;

  //throw new Error("some error"); /* Эта ошибка обрабатывается в файле main.tsx - router - errorElement */

  return (
    <>
      Product: {id} {data.name}
    </>
  );
}
