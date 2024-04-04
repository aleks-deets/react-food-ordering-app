import { Await, useLoaderData, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  const { id } = useParams();
  const data = useLoaderData() as { data: IProduct };

  //throw new Error("some error"); /* Эта ошибка обрабатывается в файле main.tsx - router - errorElement */

  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Await
          resolve={data.data}
          //errorElement={<>Error</>} // не нужен, т.к. использую в router в файле main.tsx, т.е. это тоже самое
        >
          {({ data }: { data: IProduct }) => (
            <>
              Product: {id} {data.name}
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
