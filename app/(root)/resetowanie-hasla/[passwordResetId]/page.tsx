import React from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "../../../css/body.css";

type Props = {};

const ResetPasswordPage = async ({
  params,
}: {
  params: Promise<{ passwordResetId: string }>;
}) => {
  const passwordResetId = (await params).passwordResetId;
  return (
    <section className="flex flex-col items-center mb-24 sm:px-0 px-3">
      <ResetPasswordForm passwordResetId={passwordResetId} />
    </section>
  );
};

export default ResetPasswordPage;
