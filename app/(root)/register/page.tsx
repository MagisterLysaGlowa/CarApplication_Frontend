import RegisterForm from "./components/RegisterForm";
import "../../css/body.css";
import AdvertisementCard from "../../components/AdvertisementCard";

const RegisterPage = () => {
  return (
    <main className="flex justify-center mb-24">
      <section className="w-full max-w-[1400px] mt-24 px-5 lg:px-0">
        <p className="text-GOLD-400 desktop-small text-center">Chcę kupic</p>
        <h2 className="desktop-h2 text-center my-5">Rejestracja</h2>
        <p className="desktop-normal text-center">
          Załóż konto, aby na bieżąco śledzić status swojego zlecenia
        </p>

        <article
          className="flex flex-col lg:grid gap-10 mt-5 lg:mt-16"
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          <div>
            <div className="w-full max-h-[200px]">
              <AdvertisementCard />
            </div>
          </div>

          <div className="bg-white px-5 sm:px-12 py-14 rounded-[25px] shadow-md max-w-[1000px] justify-self-center">
            <RegisterForm />
          </div>
        </article>
      </section>
    </main>
  );
};

export default RegisterPage;
