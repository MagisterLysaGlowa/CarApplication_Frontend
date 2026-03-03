"use client";

import React, { useState } from "react";
import { PaymentTile, PaymentTileProps } from "./PaymentTile";
import BlikSrc from '@/public/images/blik.png';
import PayUSrc from '@/public/images/payu.png';
import PayPalSrc from '@/public/images/paypal.png';
import GooglePaySrc from '@/public/images/google.png';

const PaymentsSection: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  const payments: PaymentTileProps[] = [
    {
      imageUrl: PayUSrc.src,
      title: "Przelew",
      description: "Wykonaj przelew online",
    },
    {
      imageUrl: BlikSrc.src,
      title: "Blik",
      description: "Wpisz kod płatniczy Blik",
    },
    {
      imageUrl: GooglePaySrc.src,
      title: "Google Pay",
      description: "Zapłać ze swojego konta Google",
    },
    {
      imageUrl: PayPalSrc.src,
      title: "PayPal",
      description: "Przelew za pomocą PayPal",
    },
  ];

  return (
    <div className="text-center py-12">
      <h2 className="text-[36px] font-bold mb-3">Sposób płatności</h2>
      <p className="mb-8">
        Wybierz formę płatności, która najlepiej Ci odpowiada.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {payments.map((payment, index) => (
          <PaymentTile
            key={index}
            imageUrl={payment.imageUrl}
            title={payment.title}
            description={payment.description}
            isSelected={selectedPayment === index}
            onClick={() => setSelectedPayment(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsSection;
