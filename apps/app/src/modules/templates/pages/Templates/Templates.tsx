import React, { ReactElement } from 'react';
import { Button, Flex, useDisclosure } from '@lego/klik-ui';

import { NextPageWithLayout } from '@/types/next.types';
import ApplicationLayout from '@/components/Layouts/ApplicationLayout';
import TemplatesTable from '../../components/TemplatesTable';
import CreateTemplateModal from '../../components/CreateTemplateModal';
import { Template } from '@/types/template.types';
import { sleep } from '@/utils/common.utils';

const MOCK_DATA = [...new Array(50)].map((__, index) => ({
  name: `Hello ${index}`,
  description: 'Dummy description',
  createdAt: Date.now(),
  updatedAt: Date.now(),
}));

const Templates: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleCreateTemplate(data: Template.CreateTemplate) {
    await sleep(2000);
    alert('Created');
    onClose();
  }

  return (
    <div>
      <Flex justifyContent="flex-end" marginBottom="2rem">
        <Button size="sm" onClick={onOpen}>
          Create Template
        </Button>
      </Flex>

      <TemplatesTable data={MOCK_DATA} />

      <CreateTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTemplate}
      />
    </div>
  );
};

Templates.getLayout = function getLayout(page: ReactElement) {
  return <ApplicationLayout title="Templates">{page}</ApplicationLayout>;
};

export default Templates;
