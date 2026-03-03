"use client";
import { useState } from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

const Blog = () => {
  const [blogs] = useState<BlogData[]>([
    {
      recommended: true,
      title:
        "5 kroków do udanej sprzedaży samochodu online: Poradnik dla początkujących",
      time: "6 minut",
      date: "10.01.2024r",
      description:
        "Sprzedajesz samochód po raz pierwszy i nie wiesz, od czego zacząć? Z naszego poradnika dowiesz się, jak skutecznie przygotować ofertę, odpowiednio wycenić pojazd oraz jakie kroki podjąć, aby szybko znaleźć kupca. Sprawdź, jak uniknąć najczęstszych błędów i sprzedaj auto bez zbędnych komplikacji",
      image: "/images/blog/blog_1.webp",
    },
    {
      recommended: false,
      title:
        "Nowoczesne technologie w samochodach: Co warto wiedzieć przed zakupem?",
      time: "6 minut",
      date: "10.01.2024r",
      description:
        "Elektryczne, hybrydowe, autonomiczne – rynek motoryzacyjny rozwija się dynamicznie, oferując coraz więcej technologicznych innowacji. Jakie nowości warto rozważyć przy zakupie nowego auta, a które mogą okazać się zbędne? Przedstawiamy przegląd najnowszych technologii, które mogą znacząco poprawić komfort i bezpieczeństwo na drodze.",
      image: "/images/blog/blog_2.webp",
    },
    {
      recommended: false,
      title:
        "Czy warto kupić samochód używany? Plusy i minusy, które musisz znać",
      time: "6 minut",
      date: "10.01.2024r",
      description:
        "Zakup używanego samochodu to dla wielu kierowców atrakcyjna opcja, jednak niesie ze sobą pewne ryzyka. Czy niższa cena rzeczywiście oznacza oszczędność? Jakie są najważniejsze czynniki, które warto sprawdzić przed podjęciem decyzji? Poznaj zalety i wady zakupu pojazdu z drugiej ręki, aby dokonać świadomego wyboru.",
      image: "/images/blog/blog_3.webp",
    },
    {
      recommended: false,
      title:
        "Jak negocjować cenę samochodu? 7 sprawdzonych strategii, które działają",
      time: "6 minut",
      date: "10.01.2024r",
      description:
        "Negocjowanie ceny to kluczowy element zakupu samochodu, który może przynieść znaczące oszczędności. Jak podejść do rozmowy, by uzyskać najlepszą ofertę, nie rezygnując z jakości? Poznaj 7 skutecznych strategii negocjacyjnych, które pomogą Ci obniżyć cenę pojazdu i wyjść z transakcji zadowolonym.",
      image: "/images/blog/blog_4.webp",
    },
  ]);
  return (
    <section className="w-full flex flex-col items-center py-20 px-5 2xl:px-0">
      <p className="mobile-small lg:desktop-small text-GOLD-400 text-center">
        Nasze artykuły
      </p>
      <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 text-center mt-6">
        Chcesz wiedzieć więcej o YourVehicle?
      </h2>
      <p className="mobile-normal lg:desktop-normal text-BLACK-300 text-center mt-3">
        Masz więcej pytań? Sprawdź, prawdopodobnie już napisaliśmy o czymś co
        Cię interesuje
      </p>
      <div className="grid max-w-[1400px] w-full grid-cols-1 md:grid-cols-4 gap-6 mt-14">
        {blogs.map((item, index) => (
          <BlogCard key={index} blog={item} />
        ))}
      </div>
      <Link className="aqua-btn !px-8 !py-4 mt-10" href={"/blog"}>
        Sprawdź więcej artykułów
      </Link>
    </section>
  );
};

export default Blog;
