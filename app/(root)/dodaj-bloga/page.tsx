import React from "react";
import AddBlogPost from "./components/AddBlogPost";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="w-full flex justify-center items-center flex-col mt-8 px-5 lg:px-0">
      <header>
        <h2 className="mobile-h2 lg:desktop-h2">Blog formularz</h2>
      </header>
      <AddBlogPost />
    </section>
  );
};

export default page;
