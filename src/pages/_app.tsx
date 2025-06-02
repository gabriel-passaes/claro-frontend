import '@/styles/globals.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

import ReduxProviderWrapper from '@/providers/ReduxProviderWrapper';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Claro Frontend</title>
        <meta name="description" content="Frontend do projeto Claro com Next.js 13, PrimeReact e Tailwind" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Claro Frontend" />
        <meta property="og:description" content="Painel de controle com autenticação, sidebar e dashboard." />
        <meta property="og:image" content="/logo-claro.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

        <ReduxProviderWrapper>
          <Component {...pageProps} />
        </ReduxProviderWrapper>
    </>
  );
}
