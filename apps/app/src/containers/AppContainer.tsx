import React from 'react';
import { Provider } from 'react-redux';
import { KlikProvider } from '@lego/klik-ui';
import { Auth } from '@aws-amplify/auth';
import { amplifyConfig } from '@/config/amplify.config';
import store from '@/redux/store';

Auth.configure(amplifyConfig.Auth);

const AppContainer = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <KlikProvider includeFont={true}>{props.children}</KlikProvider>
    </Provider>
  );
};

export default AppContainer;
