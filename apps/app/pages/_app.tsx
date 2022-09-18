import { KlikProvider } from '@lego/klik-ui';

function MyApp({ Component, pageProps }) {
  return (
    <KlikProvider includeFont={true}>
      <Component {...pageProps} />
    </KlikProvider>
  );
}

export default MyApp;
