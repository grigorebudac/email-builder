import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';

import ApplicationLayout from '@/components/Layouts/ApplicationLayout';

const Templates: NextPageWithLayout = () => {
  return <h1>Templates</h1>;
};

Templates.getLayout = function getLayout(page: ReactElement) {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};

export default Templates;
