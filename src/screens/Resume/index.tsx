import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

import { Container, Header, Title, HistoryCards } from './styles'

export function Resume() {
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <HistoryCards>
                <HistoryCard title="Casa" amount="R$1.200" color="purple" />
                <HistoryCard title="Carro" amount="R$700" color="orange" />
                <HistoryCard title="Alimentação" amount="R$700" color="green" />
                <HistoryCard title="Alimentação" amount="R$700" color="red" />
            </HistoryCards>

        </Container>
    )
}