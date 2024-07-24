import { useEffect, useState } from 'react';
import { axiosInstance } from '@/api/axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions');
        console.log(response.data);
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='min-h-screen pt-16'>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <p>Amount: {transaction.amount / 100} NGN</p>
            <p>Domain: {transaction.metadata?.custom_fields?.[0]?.value ?? 'N/A'}</p>
            <p>Time: {new Date(transaction.created_at).toLocaleString()}</p>
            <p>Status: {transaction.status}</p>
            <p>Email: {transaction.customer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
