import type { AppProps } from 'next/app';
import type { PageInfo } from '../lib/getPages';
import Layout from '../components/Layout';
import { PagesContext } from '../lib/PagesContext';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  pages: PageInfo[];
}

export default function App({ Component, pageProps }: MyAppProps) {
  const pages: PageInfo[] = pageProps.pages || [];

  return (
    <PagesContext.Provider value={pages}>
      <Layout pages={pages}>
        <Component {...pageProps} />
      </Layout>
    </PagesContext.Provider>
  );
}
