import React, { ReactElement } from 'react';

import { NextPageWithLayout } from '@/types/next.types';
import ApplicationLayout from '@/components/Layouts/ApplicationLayout';
import TemplatesTable from '../../components/TemplatesTable';

const Templates: NextPageWithLayout = () => {
  return <TemplatesTable />;
};

Templates.getLayout = function getLayout(page: ReactElement) {
  return <ApplicationLayout title="Templates">{page}</ApplicationLayout>;
};

export default Templates;
