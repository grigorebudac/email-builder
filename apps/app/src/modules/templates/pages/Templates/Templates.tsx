import React, { ReactElement } from 'react';
import { withProtectedRoute } from 'src/hocs/withProtectedRoute';
import { Button, Flex, useDisclosure } from '@lego/klik-ui';
import { useRouter } from 'next/router';

import {
  useCreateTemplateMutation,
  useDeleteTemplateByIdMutation,
  useGetTemplatesQuery,
} from '@/redux/endpoints/template.endpoints';
import { NextPageWithLayout } from '@/types/next.types';
import ApplicationLayout from '@/components/Layouts/ApplicationLayout';
import { Template } from '@/types/template.types';
import TemplatesTable from '../../components/TemplatesTable';
import CreateTemplateModal from '../../components/CreateTemplateModal';

const Templates: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createTemplateMutation] = useCreateTemplateMutation();
  const [deleteTemplateMutation] = useDeleteTemplateByIdMutation();
  const { data: templates, isLoading } = useGetTemplatesQuery();
  const router = useRouter();

  async function handleCreateTemplate(data: Template.CreateTemplate) {
    try {
      const result = await createTemplateMutation(data).unwrap();
      handleEdit(result.id);
    } catch (error) {
      console.log({ error });
    }
  }

  function handleEdit(templateId: string) {
    router.push(`/editor/${templateId}`);
  }

  async function handleDelete(templateId: string) {
    await deleteTemplateMutation(templateId);
  }

  return (
    <div>
      <Flex justifyContent="flex-end" marginBottom="2rem">
        <Button data-cy="createTemplate" size="sm" onClick={onOpen}>
          Create Template
        </Button>
      </Flex>

      {!isLoading && (
        <TemplatesTable
          data={templates ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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

export default withProtectedRoute(Templates);
