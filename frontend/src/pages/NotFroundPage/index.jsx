import { useRouteError } from "react-router-dom";
import MainContainer from "@src/components/ContentContainer";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Essa página não exite no Cine Prime.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
}
