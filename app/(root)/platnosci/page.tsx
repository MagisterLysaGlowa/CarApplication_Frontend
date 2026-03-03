import React from "react";
import PageHeader from "./components/PageHeader";
import TokenCounter from "./components/TokenCounter";
import PackagesSection from "./components/PackagesSection";
import BillingForm from "./components/BillingForm";
import PaymentsSection from "./components/PaymentsSection";
import { cookies } from "next/headers";
import { getToken } from "@/app/actions/getToken";
import { getAuth } from "@/app/actions/getAuth";
import ChevronIcon from "../../../public/images/icons/chevron_icon.svg";
import Link from "next/link";

const PaymentPage = async () => {
  const token = await getToken();
  const user = await getAuth();
  return (
    <main className="flex justify-center">
      <section className="w-full bg-[#F3F3F3] sm:px-5">
        <div className="max-w-[1440px] w-full mx-auto py-4 sm:py-12">
          {/* <div className="flex flex-col items-center">
            <PageHeader />
            <TokenCounter tokens={5}/>
          </div> */}
        </div>
        <div className="bg-white lg:max-w-[1440px] rounded-[24px] lg:mx-auto pb-6 mb-12 mx-4 pt-5">
          <Link href={"/koszyk"} className="px-4 flex gap-1 items-center">
            <ChevronIcon
              width={20}
              height={20}
              fill="rgb(255,113,36)"
              className="rotate-[90deg]"
            />
            <span className="translate-y-[-2px] text-GOLD-400">
              Wróć do koszyka
            </span>
          </Link>
          {/* <PaymentsSection /> */}
          <BillingForm token={token} user={user.data} />
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;
