import React, { useState, useEffect } from 'react';

import { transitions } from 'polished';
import incomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import totalIcon from '../../assets/total.svg';

import transactionsService, {
  Transaction as TTransaction,
} from '../../services/api/Transactions';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction extends TTransaction {
  formattedValue: string;
  formattedDate: string;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      const formattedTransactions = response.data.transactions.map(
        (transaction: Transaction) => {
          const formattedValue = formatValue(transaction.value);

          return {
            ...transaction,
            formattedValue:
              transaction.type === 'outcome'
                ? `- ${formattedValue}`
                : formattedValue,
            formattedDate: new Date(transaction.created_at).toLocaleDateString(
              'pt-br',
            ),
          };
        },
      );

      // const response = await transactionsService.list();

      // const formattedTransactions = response.data.transactions.map(
      //   transaction => ({
      //     ...transaction,
      //     formattedValue: formatValue(transaction.value),
      //     formattedDate: new Date(transaction.created_at).toLocaleDateString(
      //       'pt-br',
      //     ),
      //   }),
      // );

      const { income, outcome, total } = response.data.balance;
      const formattedBalance = {
        income: formatValue(income),
        outcome: formatValue(outcome),
        total: formatValue(total),
      };

      setTransactions(formattedTransactions);
      setBalance(formattedBalance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={incomeIcon} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcomeIcon} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={totalIcon} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>20/04/2020</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
