import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <div className={inter.className}>
    <Component {...pageProps} />
  </div>);
};

export default MyApp;
