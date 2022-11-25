import React, { ReactElement } from 'react';
import { withProtectedRoute } from 'src/hocs/withProtectedRoute';
import { Box, Button, Flex, Grid, useDisclosure } from '@lego/klik-ui';
import { useRouter } from 'next/router';

import {
  useCreateTemplateMutation,
  useDeleteTemplateByIdMutation,
  useGetTemplatesQuery,
} from '@/redux/endpoints/template.endpoints';
import { NextPageWithLayout } from '@/types/next.types';
import ApplicationLayout from '@/components/Layouts/ApplicationLayout';
import { Template } from '@/types/template.types';
import CreateTemplateModal from '../../components/CreateTemplateModal';
import Card from '../../components/Card';
import EmptyCard from '../../components/EmptyCard';

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
        <Box paddingRight={100} paddingLeft={100}>
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(3, 1fr)',
              'repeat(5, 1fr)',
            ]}
            gap={10}
          >
            <EmptyCard onCreate={onOpen} />
            {templates.map((template) => {
              return (
                <Card
                  key={template.id}
                  previewImage={template.previewImage}
                  onEdit={() => handleEdit(template.id)}
                  onDelete={() => handleDelete(template.id)}
                />
              );
            })}
          </Grid>
        </Box>
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
