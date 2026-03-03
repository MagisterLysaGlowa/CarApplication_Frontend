import React from "react";
import "../../css/body.css";
import BasicInfoForm from "./components/BasicInfoForm";
import AddressForm from "./components/AddressForm";
import { getAuth } from "@/app/actions/getAuth";
import ProfileHeader from "./components/ProfileHeader";
import { ToastContainer } from "react-toastify";
type Props = {};

const ProfilePage = async (props: Props) => {
  const user = await getAuth();

  return (
    <main className="w-ful flex justify-center mb-24 px-3 sm:px-0">
      <ToastContainer />
      <section className="w-full max-w-[1400px] bg-WHITE-100 rounded-[24px] px-5 sm:px-10 py-14 mt-6 sm:mt-12 shadow-lg">
        <h6 className="mobile-h6 lg:desktop-h6" style={{ fontFamily: "Inter" }}>
          Mój profil
        </h6>
        <ProfileHeader user={user} />
        <BasicInfoForm user={user} />
        <AddressForm user={user} />
      </section>
    </main>
  );
};

export default ProfilePage;
