import { AppPropsWithLayout } from '@/types/next.types';
import AppContainer from '../containers/AppContainer';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return <AppContainer>{getLayout(<Component {...pageProps} />)}</AppContainer>;
}

export default App;
