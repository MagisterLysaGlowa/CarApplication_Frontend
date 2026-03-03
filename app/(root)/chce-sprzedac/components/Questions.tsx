import AccordMenu from "./AccordMenu";

const Questions = () => {
  return (
    <section className="w-full flex justify-center bg-[#16151F] py-16 px-10 2x:px-0">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16">
        <div className="self-start">
          <p className="mobile-small lg:desktop-small text-GOLD-400">
            Masz pytania?
          </p>
          <h2 className="mobile-h2 lg:desktop-h2 text-[#FAF9F6] mt-6">
            Najczęściej zadawane pytania
          </h2>
          <p className="mobile-normal lg:desktop-normal text-WHITE-200 mt-4 max-w-[400px] 2xl:max-w-[670px]">
            Jeśli masz pytanie, które się tutaj nie znalazło, zadaj nam je przez
            formularz kontaktowy a my z chęcią na nie odpowiemy, tak szybko jak
            to możliwe.
          </p>
          <a
            className="aqua-btn !py-4 !px-7 mt-8 max-w-[200px]"
            href="#contact"
          >
            Skontaktuj się
          </a>
        </div>

        <div className="w-full mt-5 lg:mt-0">
          <AccordMenu />
        </div>
      </div>
    </section>
  );
};

export default Questions;
