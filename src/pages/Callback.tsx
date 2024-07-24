import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await axios.post('/api/verify-transaction', { reference });
        if (response.data.status === 'success') {
          toast.success('Payment was successful');
          // Perform any other necessary actions
        } else {
          toast.error('Payment verification failed');
        }
      } catch (err) {
        console.error(err);
        toast.error('Payment verification failed');
      }
    };

    if (reference) {
      verifyTransaction();
    }
  }, [reference]);

  return <div>Verifying Payment...</div>;
};

export default Callback;

