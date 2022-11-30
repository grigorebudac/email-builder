import React, { ReactElement } from 'react';
import { withProtectedRoute } from 'src/hocs/withProtectedRoute';
import { Box, Grid, useDisclosure } from '@lego/klik-ui';
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
import EmptyCard from '../../components/EmptyCard';
import NavBar from '../../components/NavBar/NavBar';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import TemplateCard from '../../components/TemplateCard';

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

  async function logOut() {
    await AmplifyAuth.signOut();
    router.push('/login');
  }

  return (
    <div>
      <NavBar onLogOut={logOut} />

      {!isLoading && (
        <Box paddingRight={100} paddingLeft={100} marginTop={50}>
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
            {templates?.map((template) => {
              const templateId = template.id;
              return (
                <TemplateCard
                  key={templateId}
                  templateId={templateId}
                  previewImage={template.previewImage}
                  onEdit={() => handleEdit(templateId)}
                  onDelete={() => handleDelete(templateId)}
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
