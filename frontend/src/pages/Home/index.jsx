import Button from "@components/Button";

export default function Home(props) {

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

    </>
  );
}
