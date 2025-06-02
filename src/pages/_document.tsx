import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Claro Frontend — Aplicação moderna com Next.js, Tailwind e PrimeReact." />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Gabriel Passaes" />
          <meta name="theme-color" content="#14b4d7" />

          <meta property="og:title" content="Claro Frontend" />
          <meta property="og:description" content="Painel de controle com autenticação, sidebar e dashboard." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://claro-frontend.vercel.app/" />
          <meta property="og:image" content="https://claro-frontend.vercel.app/og-image.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Claro Frontend" />
          <meta name="twitter:description" content="Sistema de gerenciamento moderno e responsivo." />
          <meta name="twitter:image" content="https://claro-frontend.vercel.app/og-image.png" />
          <meta name="twitter:site" content="@gabrielpassaes" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          <link rel="canonical" href="https://claro-frontend.vercel.app/" />
        </Head>
        <body className="bg-background-light-100 dark:bg-background-dark-100 text-text-light-100 dark:text-text-dark-100 transition-colors duration-300 antialiased"
          style={{
            fontFamily: '"Trebuchet MS", sans-serif',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
