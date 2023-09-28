import { Link } from "react-router-dom";

import MainContainer from "@src/components/ContentContainer";
import Button from "@components/Button";

export default function Home(props) {
  const authToken = localStorage.getItem("auth_token");
  const userEmail = localStorage.getItem("user_email");

  const handleSubmit = async () => {
    alert(`    Bruno Lima Ferreira - 556444\n
    Francisco Robson Queiroz Mendes - 538409\n
    Hyarlei Silva Freitas - 542646\n
    Jorder Paulo dos Santos Gomes - 399669\n
    Juan David Bizerra Pimentel - 557340\n
    Robertson da Silva Nascimento - 391242`);
  };

  return (
    <>
      <h1>Bem vindo ao Cine Prime</h1>
      <p>A melhor plataforma de gerenciamento de cinemas da região!</p>

      <Button
        variant="success"
        text="Sobre a equipe Cine Prime"
        onClick={() => handleSubmit()}
      />

      {authToken ? (
        <Button text={`Olá ${userEmail}`} />
      ) : (
        <>
          <Link to="/cadastro">
            <Button text="Cadastrar-se" />
          </Link>
          <Link to="/login">
            <Button text="Entrar" />
          </Link>
        </>
      )}
    </>
  );
}
