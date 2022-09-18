import React from 'react';
import { Provider } from 'react-redux';
import { KlikProvider } from '@lego/klik-ui';

import store from '@/redux/store';

const AppContainer = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <KlikProvider includeFont={true}>{props.children}</KlikProvider>
    </Provider>
  );
};

export default AppContainer;
