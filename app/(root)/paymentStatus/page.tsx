import React, { Suspense } from "react";
import PaymentStatus from "../paymentTest/components/PaymentStatus";
import "../../css/body.css";
import { getAuth } from "@/app/actions/getAuth";
type Props = {};

const page = async (props: Props) => {
  const user = await getAuth();

  return (
    <div className="flex justify-center ">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentStatus user={user.data} />
      </Suspense>
    </div>
  );
};

export default page;
