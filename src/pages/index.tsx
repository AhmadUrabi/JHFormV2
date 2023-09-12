import Head from "next/head";
import { useState } from "react";
import Form from "~/components/form";
import Image from "next/image";

import jhlogo from "../../public/JHLogo.svg";

export default function Home({ data }: { data: any }) {
  
  return (
    <>
      <Head>
        <title>JH Form</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-pattern">
      <div className="flex h-[90vh] w-11/12 flex-col overflow-clip rounded-xl bg-white/90 shadow-xl">
        <Image src={jhlogo} alt="JH Logo" width={200} className="mx-auto my-16"/>
        <Form />
      </div>
      </main>
    </>
  );
}