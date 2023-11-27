"use client";
import toast from "react-hot-toast";
import Button from "../Button";
import prisma from "@/app/libs/prismadb";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PaymentButtonProps {
  method: string;
  price: number;
  reservationId: string;
}

export const PaymentButton = ({
  method,
  price,
  reservationId,
}: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onClick = async () => {
    if (method === "now") {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `/api/reservations/${reservationId}/checkout`
        );
        window.location.assign(response.data.url);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        // const status = "Unpaid"
        await axios.patch(`/api/reservations/${reservationId}`);
        toast.success("You have finished your reservation!")
        router.refresh();
      } catch (error){
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } 
  };
  return <Button label="Payment" onClick={onClick} disabled={isLoading} />;
};
