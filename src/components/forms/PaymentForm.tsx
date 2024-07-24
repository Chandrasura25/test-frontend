import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentValidation } from "@/lib/validations/payment";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/api/axios';
import PaystackPop from '@paystack/inline-js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      email: '',
      amount: '',
      domain: ''
    },
  });

  const onSuccess = (transaction) => {
    console.log(transaction);
    navigate(`/callback-url?reference=${transaction.reference}`);
  };

  const onLoad = (response) => {
    console.log("onLoad: ", response);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onError = (error) => {
    console.log("Error: ", error.message);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/initialize-payment', values);
      const access_code = response.data.data?.access_code;
      const popup = new PaystackPop();
      popup.resumeTransaction(access_code,
        {callback: (response) => {
        console.log(response)}
      });
      navigate('/transactions')
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col justify-start gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-dark-2">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="no-focus focus:outline-none focus:ring-0 focus:border-[#41AA5E] border border-dark-4 bg-dark-3 text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-[#41AA5E]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-dark-2">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="no-focus focus:outline-none focus:ring-0 focus:border-[#41AA5E] border border-dark-4 bg-dark-3 text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-[#41AA5E]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-dark-2">
                  Domain
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="no-focus focus:outline-none focus:ring-0 focus:border-[#41AA5E] border border-dark-4 bg-dark-3 text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-[#41AA5E]" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="py-2.5 bg-[#41AA5E] text-white hover:bg-transparent hover:border hover:border-[#41AA5E]"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </Form>
    </div>
  );
}
