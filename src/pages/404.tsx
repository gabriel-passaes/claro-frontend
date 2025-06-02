import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Página não encontrada | Claro Dashboard</title>
        <meta name="description" content="A página que você tentou acessar não existe ou foi movida." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 — Página não encontrada</h1>
      </div>
    </>
  );
}
