import React, { Suspense } from "react";
import PageHeader from "./components/PageHeader";
import TokenCounter from "./components/TokenCounter";
import PackagesSection from "./components/PackagesSection";
import { getAuth } from "@/app/actions/getAuth";

const PaymentPage = async () => {
  const user = await getAuth();
  return (
    <main className="flex justify-center">
      <section className="w-full bg-[#F3F3F3]">
        <div className="max-w-[1440px] w-full mx-auto py-12">
          <div className="flex flex-col items-center">
            <PageHeader />
            <TokenCounter user={user} />
          </div>
        </div>
        <div className="bg-white lg:max-w-[1440px] rounded-[24px] lg:mx-auto pb-6 mb-12 mx-4">
          <PackagesSection />
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;
