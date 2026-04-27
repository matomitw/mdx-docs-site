import { useState } from 'react';
import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import type { PageInfo } from '../lib/getPages';
import Layout from '../components/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
import { PagesContext } from '../lib/PagesContext';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  pages: PageInfo[];
}

function MyApp({ Component, pageProps, pages: serverPages }: MyAppProps) {
  // Persist pages from the initial server render across client-side navigations
  const [pages] = useState<PageInfo[]>(() => serverPages || []);

  return (
    <PagesContext.Provider value={pages}>
      <Layout pages={pages}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </PagesContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  let pages: PageInfo[] = [];
  if (typeof window === 'undefined') {
    const { getAllPages } = await import('../lib/getPages');
    pages = getAllPages();
  }
  return { ...appProps, pages };
};

export default MyApp;
