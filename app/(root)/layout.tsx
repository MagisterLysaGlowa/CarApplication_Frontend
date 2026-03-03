import { getAuth } from "../actions/getAuth";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";

export interface LayoutProps {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";
export const revalidate = 0; // Add this to disable caching

const LandingLayout = async (props: LayoutProps) => {
  // Get auth result with proper error handling
  const user = await getAuth();

  return (
    <>
      <CookieConsent />
      <Navbar user={user.data} />
      {props.children}
      <Footer />
    </>
  );
};

export default LandingLayout;
