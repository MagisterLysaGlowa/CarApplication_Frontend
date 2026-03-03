import React from "react";
import "../../css/body.css";
import Link from "next/link";
import Image from "next/image";

const RegulaminPage = () => {
  return (
    <main className="flex justify-center">
      <section className="w-full max-w-[1000px] mt-12 mb-24 flex flex-col desktop-normal px-5">
        <h2 className="text-center mobile-h2 lg:desktop-h2 max-w-[600px] self-center mb-10">
          Regulamin świadczenia usług drogą elektroniczną.
        </h2>
        <h5 className="text-center mb-5 mobile-normal lg:desktop-normal">
          Regulamin korzystania z serwisu: yourvehicle.pl. Przedmiotem regulacji
          zawartej w niniejszym Regulaminie jest określenie warunków korzystania
          z serwisu: www.yourvehicle.pl Regulamin określa rodzaje, zakres oraz
          warunki świadczenia usług drogą elektroniczną poprzez za pośrednictwem
          witryny www dostępnej w Internecie pod adresem: www.yourvehicle.pl
          Warunki zawierania i rozwiązywania umów o świadczenie takich usług, a
          także tryb postępowania reklamacyjnego.
        </h5>

        <p>
          <strong>Regulamin składa się z następujących części:</strong>
        </p>
        <ol className="list-decimal ml-5">
          <li>Dane Firmy</li>
          <li>Postanowienia ogólne</li>
          <li>Definicje</li>
          <li>Rodzaje usług świadczonych drogą elektroniczną</li>
          <li>Warunki techniczne świadczenia usługi</li>
          <li>Ochrona danych osobowych</li>
          <li>Zasady odpowiedzialności</li>
          <li>Prawo własności intelektualnej</li>
          <li>Informacje o trybie reklamacyjnym</li>
          <li>Postanowienia końcowe</li>
        </ol>

        <h2>§1. Dane Firmy</h2>
        <p>
          1.1. <strong>www.yourvehicle.pl</strong> jest informacyjnym portalem
          internetowym, którego operatorem jest Firma{" "}
          <strong>YV Marcin Wawrzyniak</strong> z siedzibą w Ostrowie
          Wielkopolskim, NIP 6222858790.
        </p>

        <h2>§2. Postanowienia Ogólne</h2>
        <p>
          2.1. Na podstawie art. 8 ust. 1 pkt 1 ustawy z dnia 18 lipca 2002 r. o
          świadczeniu usług drogą elektroniczną, YV Marcin Wawrzyniak ustala
          niniejszym Regulamin świadczenia usług drogą elektroniczną, zwany
          dalej Regulaminem.
        </p>
        <p>
          2.2. Regulamin określa zasady świadczenia przez portal YV Marcin
          Wawrzyniak usług drogą elektroniczną za pośrednictwem witryny www
          dostępnej w Internecie pod adresem{" "}
          <strong>https://www.yourvehicle.pl</strong>, a także warunki
          zawierania i rozwiązywania umów o świadczenie usług drogą
          elektroniczną oraz warunki postępowania reklamacyjnego.
        </p>
        <p>
          2.3. Korzystanie z usług objętych Regulaminem jest równoznaczne z
          akceptacją niniejszego Regulaminu, który stanowi integralną część
          zawieranych przez YV Marcin Wawrzyniak z Użytkownikiem umów o
          świadczenie usług drogą elektroniczną oraz z zawarciem umowy o
          świadczenie tych usług bez konieczności sporządzenia odrębnej umowy.
        </p>
        <p>
          2.4. W sprawach, nieregulowanych niniejszym Regulaminem, stosuje się
          przepisy Kodeksu Cywilnego (Dz. U. z 1964 r., Nr 16, poz. 93 z
          późniejszymi zmianami), Ustawy z dnia 18 lipca 2002 r. o świadczeniu
          usług drogą elektroniczną (Dz. U. z 2002 r., Nr 144, poz. 1204 z
          późniejszymi zmianami), Ustawy z dnia 10 maja 2018 r. o ochronie
          danych osobowych (Dz.U. z 2018 r. poz. 1000 z późniejszymi zmianami),
          Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27
          kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
          przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
          takich danych oraz uchylenia dyrektywy 95/46/WE (Ogólne Rozporządzenie
          o Ochronie Danych) z dnia 27 kwietnia 2016 r. (Dz.Urz.UE.L Nr 119,
          str. 1), Ustawy z dnia 11 września 2015 r. o działalności
          ubezpieczeniowej i reasekuracyjnej (Dz. U. 2015 poz. 1844 ze
          zmianami)) oraz innych aktów prawnych.
        </p>
        <p>
          2.5. Zakazane jest dostarczanie przez Użytkownika do YV Marcin
          Wawrzyniak informacji i treści o charakterze bezprawnym, treści
          obraźliwych, informacji błędnych oraz mogących wprowadzić w błąd, a
          także treści zawierających wirusy lub mogących wywołać zakłócenia, lub
          uszkodzenia systemów komputerowych.
        </p>
        <p>
          2.6. W przypadku wysłania treści określonych w punkcie 2.5. YV Marcin
          Wawrzyniak może wystąpić z roszczeniem odszkodowawczym bezpośrednio do
          Użytkownika, na zasadach określonych w Kodeksie cywilnym.
        </p>
        <p>
          2.7. Regulamin jest udostępniony na stronie internetowej{" "}
          <strong>https://www.yourvehicle.pl</strong> nieodpłatnie w formie
          umożliwiającej jego pobranie, utrwalenie i wydrukowanie.
        </p>
        <p>
          2.8. Językiem stosowanym w relacjach pomiędzy YV Marcin Wawrzyniak a
          Użytkownikiem jest język polski.
        </p>
        <p>
          2.9. Każdy Użytkownik powinien zapoznać się z treścią niniejszego
          Regulaminu przed rozpoczęciem korzystania z Serwisu, w szczególności z
          Usług.
        </p>
        <p>
          2.10. Umowa o świadczenie usług drogą elektroniczną rozwiązuje się
          automatycznie bez konieczności składania dodatkowych oświadczeń wraz z
          opuszczeniem przez Użytkownika stron www Serwisu.
        </p>

        <h2>§3. Definicje</h2>
        <p>
          <strong>Cookies</strong> – niewielkie informacje tekstowe wysyłane
          przez Serwis i zapisywane po stronie Użytkownika na twardym dysku
          komputera Użytkownika, które Serwis może odczytać przy każdorazowym
          połączeniu się z konkretnego komputera.
        </p>
        <p>
          <strong>Polityka Prywatności</strong> – integralna część Regulaminu
          określająca zasady gromadzenia i przetwarzania danych osobowych
          Użytkowników, przechowywania i ochrony informacji, funkcję i cel
          oprogramowania wprowadzanego do systemu teleinformatycznego, którym
          posługuje się Użytkownik oraz zagrożenia związane z korzystaniem z
          Usług.
        </p>
        <p>
          <strong>Regulamin</strong> – niniejszy Regulamin korzystania z
          serwisu: <strong>https://www.yourvehicle.pl</strong>, (regulamin
          świadczenia usług drogą elektroniczną, polityka prywatności, polityka
          cookies).
        </p>
        <p>
          <strong>Serwis</strong> – zespół współpracujących ze sobą urządzeń
          informatycznych i oprogramowania, zapewniający przetwarzanie i
          przechowywanie, a także wysyłanie i odbieranie danych poprzez sieci
          telekomunikacyjne za pomocą właściwego dla danego rodzaju sieci
          urządzenia końcowego w rozumieniu ustawy z dnia 21 lipca 2000 r. -
          Prawo telekomunikacyjne (Dz. U. Nr 73, poz. 852, z późn. zm.).
          Oznaczone nazwą systemy stron www prowadzonych przez YV Marcin
          Wawrzyniak, stanowiące zbiór dokumentów HTML statycznych i
          dynamicznych, zawierających pliki graficzne, skrypty oraz inne
          elementy zbioru połączone wzajemnymi relacjami, postawione na serwerze
          internetowym pod wyznaczonymi adresami oraz posiadające bezpośredni
          dostęp do ogólnokrajowej sieci przesyłu danych, podłączonej do
          światowych zasobów Internetu, umożliwiająca Użytkownikom korzystanie z
          mechanizmów informatycznych oraz informacji opracowanych przez YV
          Marcin Wawrzyniak lub jego Partnerów.
        </p>
        <p>
          <strong>Usługi</strong> – usługi świadczone przez YV Marcin
          Wawrzyniak, drogą elektroniczną, o których mowa w § 4 Regulaminu.
        </p>
        <p>
          <strong>Ustawa o ochronie danych osobowych</strong> – ustawa z dnia 29
          sierpnia 1997 r. o ochronie danych osobowych (Dz.U. z 2002 r. nr 101,
          poz. 926 z późniejszymi zmianami).
        </p>
        <p>
          <strong>Ustawa o świadczeniu usług drogą elektroniczną</strong> –
          ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną
          (Dz.U. z 2002 r. nr 144, poz. 1204 z późn. zmianami).
        </p>
        <p>
          <strong>Użytkownik</strong> – osoba fizyczna, osoba prawna lub
          jednostka organizacyjna nieposiadająca osobowości prawnej, która w
          jakikolwiek sposób korzysta z Serwisu, w tym osoby korzystające z
          serwisu za pośrednictwem osób współpracujących z YV Marcin Wawrzyniak
        </p>

        <h2>§4. Rodzaje usług świadczonych drogą elektroniczną</h2>
        <p>
          4.1. YV Marcin Wawrzyniak na podstawie niniejszego regulaminu, w
          ramach serwisu internetowego, świadczy usługi pośrednictwa sprzedaży
          umożliwiającego Użytkownikowi zawarcie umowy sprzedaży leada drogą
          elektroniczną.
        </p>
        <p>
          4.2. Dostęp do Platformy umożliwiającej znalezienia kupca samochodu
          osobowego na podstawie danych podanych przez Użytkownika dla
          następujących rodzajów odbiorców:
        </p>
        <ul className="list-disc ml-5">
          <li>gospodarstwa domowe,</li>
          <li>firmy,</li>
        </ul>
        <p>
          <strong>Zasady korzystania z porównywarki:</strong>
        </p>
        <p>
          4.2.1. Użytkownik tworzy zlecenie, określając swoje wymagania
          dotyczące samochodu. Sprzedawcy mają możliwość przeglądania zleceń i
          składania spersonalizowanych ofert, idealnie dopasowanych do potrzeb
          kupującego.
        </p>
        <p>
          4.2.2. YV Marcin Wawrzyniak nie ponosi odpowiedzialności z tytułu
          wniosków wyciągniętych oraz podjętych decyzji na podstawie
          przedstawionego porównania produktów.
        </p>

        <h2>§5. Warunki techniczne świadczenia usług</h2>
        <p>
          5.1. Do korzystania z usług świadczonych za pośrednictwem Serwisu
          wymagana jest poprawnie skonfigurowana przeglądarka internetowa typu
          Microsoft Internet Explorer w wersji nie niższej niż 5.5., Firefox,
          Chrome, Safari włączona obsługa plików Cookies oraz obsługa języka
          Javascript. Za problemy wynikające ze stosowania przeglądarek
          niespełniających tego wymogu YV Marcin Wawrzyniak nie ponosi
          odpowiedzialności.
        </p>

        <h2>§6. Ochrona danych osobowych</h2>
        <p>
          6.1. YV Marcin Wawrzyniak zobowiązuje się do ochrony danych osobowych
          Użytkowników. Podane przez Użytkownika dane mogą być przetwarzane dla
          celów wykonania umowy o świadczenie usług drogą elektroniczną lub
          Umowy zawarcia sprzedaży oraz dla celów marketingowych i
          statystycznych jedynie przez YV Marcin Wawrzyniak i podmioty przez
          niego upoważnione na podstawie przepisów ustawy z dnia 10 maja 2018 r.
          o ochronie danych osobowych, oraz Rozporządzenia Parlamentu
          Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
          sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych oraz
          uchylenia dyrektywy 95/46/WE (Ogólne Rozporządzenie o Ochronie Danych)
          z dnia 27 kwietnia 2016 r. (Dz.Urz.UE.L Nr 119, str. 1)
        </p>
        <p>
          6.2. Użytkownik ma prawo wglądu w swoje dane oraz prawo ich
          poprawiania. Powierzenie jakichkolwiek danych osobowych przez
          Użytkownika ma charakter dobrowolny.
        </p>
        <p>
          6.3. W przypadku, gdy świadczenie Usługi wymaga wyrażenia przez
          Użytkownika zgody na przetwarzanie danych osobowych, niewyrażenie
          przez Użytkownika zgody powoduje, iż zostaje on pozbawiony dostępu do
          danej Usługi.
        </p>
        <p>
          6.4. YV Marcin Wawrzyniak będzie przetwarzało dane osobowe powierzone
          przez Użytkownika wyłącznie w celu, w jakim zostały udostępnione i
          zobowiązuje się do zachowania ich w poufności i nieujawniania ich
          innym podmiotom, chyba że ujawnienie to następuje na podstawie
          wyraźnego upoważnienia przez Użytkownika lub na podstawie powszechnie
          obowiązujących przepisów prawa.
        </p>
        <p>
          6.5. Dane osobowe, o których mowa w ust. 5.1. obejmują w
          szczególności:
        </p>
        <ul className="list-disc ml-5">
          <li>nazwisko i imiona Użytkownika,</li>
          <li>numer ewidencyjny PESEL,</li>
          <li>numer NIP,</li>
          <li>adres zameldowania na pobyt stały,</li>
          <li>adres do korespondencji,</li>
          <li>numer telefonu (ów),</li>
          <li>adresy e-mail Użytkownika.</li>
        </ul>
        <p>
          6.6. YV Marcin Wawrzyniak może bez zgody Użytkownika przetwarzać inne
          dane niż wskazane w ust. 6.5., jeżeli są one niezbędne ze względu na
          właściwość Usługi, sposób jej rozliczenia lub wykonywanie czynności
          związanych z obsługą Usługi.
        </p>
        <p>
          6.7. YV Marcin Wawrzyniak może przetwarzać dane eksploatacyjne
          Użytkownika, to jest dane charakteryzujące sposób korzystania przez
          Użytkownika z Usługi, w tym:
        </p>
        <p>
          6.7.1 oznaczenia identyfikujące Użytkownika nadawane na podstawie
          wyżej wskazanych danych,
        </p>
        <p>
          6.7.2 oznaczenia identyfikujące zakończenie sieci telekomunikacyjnej
          lub system teleinformatyczny, z którego korzysta Użytkownik,
        </p>
        <p>
          6.7.3 informacje o rozpoczęciu, zakończeniu oraz zakresie
          każdorazowego korzystania z Usługi,
        </p>
        <p>6.7.4 informacje o skorzystaniu przez Użytkownika z Usługi.</p>
        <p>
          6.8. Szczegóły dotyczące ochrony danych osobowych określone są w
          Polityce prywatności
        </p>

        <h2>§7. Zasady odpowiedzialności</h2>
        <p>
          7.1. W przypadku korzystania z usług niezgodnie z Regulaminem, lub
          obowiązującymi przepisami prawa, YV Marcin Wawrzyniak ma prawo do
          przetwarzania danych osobowych Użytkownika w zakresie niezbędnym do
          ustalenia jego odpowiedzialności. YV Marcin Wawrzyniak powiadomi
          Użytkownika o niedozwolonych działaniach z żądaniem ich niezwłocznego
          zaprzestania oraz o przetwarzaniu danych osobowych w powyżej
          określonym celu.
        </p>
        <p>
          7.2. Niedopuszczalne jest dostarczanie przez Użytkownika treści
          sprzecznych z prawem, wzywających do nienawiści rasowej, wyznaniowej,
          etnicznej, czy też propagujących przemoc, jak również treści uznanych
          powszechnie za niemoralne, obraźliwe oraz treści nieprawdziwych lub
          mogących wprowadzić w błąd, treści zawierających wirusy lub treści,
          które mogą wywołać zakłócenia lub uszkodzenia systemów komputerowych.
          W przypadku otrzymania przez YV Marcin Wawrzyniak wiarygodnej
          wiadomości o bezprawnym charakterze danych, dostarczonych przez
          Użytkownika, YV Marcin Wawrzyniak może uniemożliwić dostęp do tych
          danych. YV Marcin Wawrzyniak nie będzie ponosić odpowiedzialności
          względem Użytkownika za szkodę powstałą w wyniku uniemożliwienia
          dostępu do danych o treści bezprawnej. W przypadku dostarczenia przez
          Użytkownika treści i danych, o których mowa powyżej, YV Marcin
          Wawrzyniak ma prawo do wystąpienia z roszczeniem odszkodowawczym
          bezpośrednio do Użytkownika.
        </p>
        <p>
          7.3. W wypadku, w którym Usługa wymaga podania przez Użytkownika
          określonych danych, Użytkownik zobowiązuje się do podania danych
          prawdziwych, dokładnych, kompletnych i niewprowadzających w błąd. Za
          wszelkie skutki wynikłe z niewłaściwego wypełnienia formularzy Serwisu
          przez Użytkownika w szczególności polegającego na podaniu przez
          Użytkownika błędnych lub nieprawdziwych danych, całkowitą
          odpowiedzialność ponosi Użytkownik.
        </p>
        <p>
          7.4. YV Marcin Wawrzyniak nie ponosi odpowiedzialności za
          nieprawidłowe wypełnienie formularzy aplikacji przez Użytkownika, a w
          szczególności nie ponosi odpowiedzialności względem osób trzecich,
          których dane zostały zamieszczone w formularzu aplikacji bez ich
          wiedzy i zgody.
        </p>
        <p>
          7.5. Ze względów bezpieczeństwa oraz jakichkolwiek innych przyczyn
          niezależnych od YV Marcin Wawrzyniak. YV Marcin Wawrzyniak ma prawo
          czasowo zawiesić dostęp do Serwisu na okres konieczny do usunięcia
          zaistniałych zagrożeń lub nieprawidłowości.
        </p>
        <p>
          7.6. YV Marcin Wawrzyniak nie ponosi odpowiedzialności za korzystanie
          przez Użytkownika z Serwisu w sposób sprzeczny z postanowieniami
          Regulaminu.
        </p>
        <p>
          7.7. Prawo do reklamacji: Użytkownik ma prawo do złożenia reklamacji w
          przypadku niewykonania lub nienależytego wykonania usługi. Reklamacje
          należy składać na adres e-mail: reklamacje@yourvehicle.pl. Sklep
          zobowiązuje się do rozpatrzenia reklamacji w terminie 14 dni od dnia
          jej otrzymania.
        </p>
        <p>
          7.2. Prawo do odstąpienia od umowy: Zgodnie z ustawą o prawach
          konsumenta, Konsument ma prawo odstąpić od umowy w terminie 14 dni od
          dnia zakupu usługi, pod warunkiem, że usługa nie została jeszcze
          zrealizowana. Konsument powinien złożyć oświadczenie o odstąpieniu od
          umowy drogą elektroniczną na adres e-mail: kontakt@yourvehicle.pl.
        </p>
        <h2>§8. Prawa własności intelektualnej</h2>
        <p>
          8.1. YV Marcin Wawrzyniak informuje, że ma prawa autorskie do
          informacji i materiałów znajdujących się w serwisie{" "}
          <strong>www.yourvehicle.pl</strong>, i tym samym prawo do korzystania
          z tych materiałów, informacji.
        </p>
        <p>
          8.2. Opublikowane w Serwisie materiały lub informacje, o ile wyraźnie
          nie jest stwierdzone inaczej, nie stanowią oferty w rozumieniu
          przepisów Kodeksu cywilnego.
        </p>
        <p>
          8.3. Użytkownik zobowiązany jest do przestrzegania przepisów prawa
          własności intelektualnej.
        </p>
        <p>
          8.4. Użytkownik zobowiązuje się do wykorzystywania wszelkich
          prezentowanych w Serwisie treści wyłącznie w zakresie własnego
          osobistego użytku. W celu uniknięcia wszelkich wątpliwości postanawia
          się, że korzystanie i rozporządzanie tymi treściami, wykraczające poza
          ramy dozwolonego użytku osobistego wymaga uprzedniej pisemnej zgody YV
          Marcin Wawrzyniak.
        </p>

        <h2>§9. Postępowanie reklamacyjne</h2>
        <p>
          9.1. Użytkownik ma prawo składać reklamacje w sprawach dotyczących
          Usług. Wszelkie reklamacje dotyczące korzystania z Serwisu należy
          zgłaszać drogą elektroniczną.
        </p>
        <p>9.2. Reklamacja zawierać powinna co najmniej następujące dane:</p>
        <p>
          9.2.1 oznaczenie Użytkownika (w tym imię, nazwisko, adres
          korespondencyjny, a w przypadku osób prawnych i jednostek
          organizacyjnych nieposiadających osobowości prawnej nazwę, adres
          korespondencyjny oraz dane osoby upoważnionej do prowadzenia spraw
          związanych ze złożoną reklamacją),
        </p>
        <p>9.2.2 opis problemu będącego podstawą złożenia reklamacji.</p>
        <p>
          9.3. YV Marcin Wawrzyniak rozpatruje reklamację w terminie 30 dni od
          jej otrzymania. Jeśli reklamacja nie może być w tym terminie
          rozpoznana, YV Marcin Wawrzyniak powiadamia składającego reklamację o
          przyczynach opóźnienia i przewidywanym terminie rozpatrzenia
          reklamacji. Reklamacje niezawierające danych, wymienionych w ust. 6.2.
          nie podlegają rozpatrzeniu.
        </p>
        <p>
          9.4. Odpowiedź w sprawię reklamacji jest wysyłana na adres e-mail
          Użytkownika lub publikowana w zasobach Serwisu.
        </p>

        <h2>§10. Regulacja metod płatności</h2>
        <p>10. Warunki korzystania z płatności i proces płatności</p>
        <p>
          10.1. Serwis udostępnia Sprzedającym możliwość opłacenia dostępu do
          danych kontaktowych Kupującego za pomocą metod płatności obsługiwanych
          przez Operatorów płatności.
        </p>
        <p>10.1.2. Obsługiwane metody płatności to:</p>
        <ul className="list-disc ml-5">
          <li>BLIK,</li>
          <li>karty płatnicze (Visa, Mastercard),</li>
          <li>szybkie przelewy internetowe (Przelewy24),</li>
          <li>portfele elektroniczne (Google Pay, Apple Pay).</li>
        </ul>
        <p>10.1.3. Wybór metody płatności zależy od Sprzedającego.</p>
        <p>10.2. Proces płatności</p>
        <p>
          10.2.1. Aby uzyskać dostęp do danych kontaktowych Kupującego,
          Sprzedający jest zobowiązany do uiszczenia opłaty w wysokości
          określonej w Serwisie.
        </p>
        <p>
          10.2.2. Po wyborze ogłoszenia Sprzedający zostaje przekierowany na
          stronę płatności obsługiwaną przez Operatora płatności.
        </p>
        <p>
          10.2.3. Po dokonaniu płatności Sprzedający otrzymuje dostęp do danych
          kontaktowych Kupującego w ciągu maksymalnie [X] minut.
        </p>
        <p>
          10.2.4. Potwierdzenie płatności oraz faktura (jeśli dotyczy) zostaną
          wysłane na adres e-mail podany podczas rejestracji.
        </p>
        <p>10.3. Bezpieczeństwo płatności</p>
        <p>
          10.3.1. Serwis współpracuje wyłącznie z zaufanymi Operatorami
          płatności, którzy posiadają wymagane certyfikaty bezpieczeństwa (np.
          PCI DSS).
        </p>
        <p>
          10.3.2. Dane kart płatniczych oraz inne informacje finansowe
          Użytkowników nie są przechowywane przez Serwis.
        </p>
        <p>
          10.3.3. Wszystkie transakcje są szyfrowane i zabezpieczone protokołem
          SSL.
        </p>
        <p>10.4. Odpowiedzialność</p>
        <p>
          10.4.1. Serwis nie ponosi odpowiedzialności za błędy wynikające z
          podania nieprawidłowych danych przez Sprzedającego podczas dokonywania
          płatności.
        </p>
        <p>
          10.4.2. Serwis nie odpowiada za problemy techniczne po stronie
          Operatora płatności, które mogą wpłynąć na realizację transakcji.
        </p>

        <h2>§11. Postanowienia końcowe</h2>
        <p>
          11.1. Pierwotny tekst niniejszego Regulaminu został przyjęty przez YV
          Marcin Wawrzyniak w dniu 21 lutego 2025 r.
        </p>
        <p>
          11.2. W przypadku zmiany Regulaminu, jego doręczenie Użytkownikowi
          odbywać się będzie poprzez umieszczenie na stronach Serwisu.
        </p>
        <p>
          11.3. Zmiany wchodzą w życie z chwilą udostępnienia zmienionego tekstu
          Regulaminu na stronach Serwisu. Korzystanie przez Użytkownika z
          Serwisu po wprowadzeniu tych zmian równoznaczne jest z wyrażeniem dla
          nich akceptacji i zrozumienia.
        </p>
        <p>
          11.4. W sprawach nieuregulowanych w niniejszym Regulaminie, a w
          szczególności do składania oświadczeń woli w postaci elektronicznej,
          stosuje się przepisy Kodeksu cywilnego (Dz. U z 1964 r., nr 16, poz.
          93 z późn. zmianami), Ustawy z dnia 18 lipca 2002 r. o świadczeniu
          usług drogą elektroniczną (Dz.U. z 2002 r., nr 144, poz. 1204 z późn.
          zmianami), Ustawy z dnia 10 maja 2018 r. (Dz.U. z 2018 r. poz. 1000) z
          późniejszymi zmianami o ochronie danych osobowych), Ustawy z dnia 30
          maja 2014 r. o prawach konsumenta (Dz. U. 2014 poz. 827 ze zmianami)
          oraz innych stosownych aktów prawnych, Rozporządzenie Parlamentu
          Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
          sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych oraz
          uchylenia dyrektywy 95/46/WE (Ogólne Rozporządzenie o Ochronie Danych)
          z dnia 27 kwietnia 2016 r. (Dz.Urz.UE.L Nr 119, str. 1).
        </p>

        <div className="bg-WHITE-100 p-10 rounded-[32px] my-5">
          <Image
            src={"/payments/przelewy24.webp"}
            alt="banner"
            width={650}
            height={120}
          />
        </div>
        <p>
          „Sprzedawca dokonuje zwrotu płatności przy użyciu takiego samego
          sposobu płatności, jakiego użył konsument, chyba że konsument wyraźnie
          zgodził się na inny sposób zwrotu, który nie wiąże się dla niego z
          żadnymi kosztami").{" "}
        </p>
      </section>
    </main>
  );
};

export default RegulaminPage;
