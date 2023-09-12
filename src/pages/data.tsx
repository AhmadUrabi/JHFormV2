import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
export default function DataPage({ data }: { data: any }) {
  async function handleDelete(user: any) {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      refreshData();
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter Data

  return (
    <>
    <Head>
        <title>JH Form - Client Data</title>
        <meta name="description" content="JH Form" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="bg-pattern flex min-h-screen flex-col items-center justify-center">
      <div className="flex h-[90vh] w-11/12 flex-col overflow-clip rounded-xl bg-white/90 shadow-xl">
        <div className="flex flex-row justify-between px-12 py-8">
          <div className="flex flex-col items-start justify-start gap-4">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="inline align-middle">Back to Form</span>
            </Link>
            <div className="flex items-center justify-center">
              <h1 className="inline align-middle text-4xl  font-bold text-black">
                Client Data
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={refreshData}
              className="w-64 rounded-md bg-[#ac2342] px-12 py-3 text-white"
            >
              Refresh
            </button>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-64 rounded-md  border border-gray-400 p-2"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex min-h-full min-w-full flex-col overflow-scroll bg-gray-300 pt-4">
          {data["result"]
            .filter((e: any) => {
              if (searchTerm === "") {
                return e;
              } else if (
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.phone.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return e;
              }
            })
            .map((user: any) => (
              <div className="m-4 mt-0 flex flex-row items-center justify-between rounded-xl bg-white/90 p-4 shadow-xl">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-black">
                    {user.name} - {user.company}
                  </h1>
                  <p className="text-xl text-black">{user.email}</p>
                  <p className="text-xl text-black">{user.phone}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    className="rounded-md bg-[#ac2342] px-12 py-4 text-white"
                    href={"tel:" + user.phone}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-4 inline h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="inline align-middle">Call</span>
                  </a>
                  <a
                    className="rounded-md bg-[#ac2342] px-12 py-4 text-white"
                    href={"mailto:" + user.email}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-4 inline h-6 w-6"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <span className="inline align-middle">Email</span>
                  </a>
                  <button
                    onClick={() => {
                      handleDelete(user);
                    }}
                    className="rounded-md bg-[#ac2342] px-12 py-4 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-4 inline h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="inline align-middle">Delete</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/api/fetch");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
