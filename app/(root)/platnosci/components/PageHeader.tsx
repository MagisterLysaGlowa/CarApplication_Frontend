const PageHeader: React.FC = () => {
  return (
    <div>
      <p className={`mobile-small lg:desktop-small text-center text-GOLD-400`}>
        Tutaj zakupisz tokeny
      </p>
      <h1 className="text-center text-[40px] font-bold">Twoje płatności</h1>
      <p className="md:w-2/3 text-center mx-auto py-6">
        Jeśli jesteś sprzedawcą, konieczne będzie wykupienie kluczyków, które
        umożliwią Ci nawiązanie kontaktu z potencjalnymi nabywcami Twojego
        pojazdu.
      </p>
    </div>
  );
};

export default PageHeader;
