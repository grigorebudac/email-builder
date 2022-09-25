import AppContainer from '../containers/AppContainer';

function App({ Component, pageProps }) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default App;
