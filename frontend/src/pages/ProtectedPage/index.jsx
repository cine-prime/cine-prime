import React from "react";

import { Outlet } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProtectedRoute = ({ type }) => {

    function telaDeAcessoProibido() {
        return (
            <>
                <h1>Você não tem acesso à essa página</h1>
                <p>Clique no botão abaixo para voltar para a página inicial</p>
                <Link to={'/'}>Voltar para página inicial</Link>
            </>
        )
    }

    const auth = useAuth()
    const location = useLocation();

    if (!auth.user || auth.user === null) {
        console.log('Usuário não logado tentando entrar em rota protegida')
        return telaDeAcessoProibido();
    }

    const { user } = auth

    if (type === 'admin') {
        if (!user.isAdmin) {
            console.log('Usuário não admin entrando em rota de admin')
            return telaDeAcessoProibido()
        }
    }

    if (type === 'employee') {
        if (user.profile === 'client') {
            console.log('Cliente tentando entrar em rota de funcionário')
            return telaDeAcessoProibido()
        }
    }


    return <Outlet />;
}