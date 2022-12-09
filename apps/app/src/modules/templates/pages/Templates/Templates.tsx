import React, { ReactElement, useRef } from 'react';
import { withProtectedRoute } from 'src/hocs/withProtectedRoute';
import { Box, Grid, useDisclosure } from '@lego/klik-ui';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

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
import DeleteTemplateModal from '../../components/DeleteTemplateModal';

const Templates: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [createTemplateMutation] = useCreateTemplateMutation();
  const [deleteTemplateMutation] = useDeleteTemplateByIdMutation();
  const { data: templates, isLoading } = useGetTemplatesQuery();
  const router = useRouter();
  const currentTemplateId = useRef<string>('');

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

  function handleDelete(templateId: string) {
    currentTemplateId.current = templateId;
    onDeleteModalOpen();
  }

  async function deleteTemplate(templateId: string) {
    await deleteTemplateMutation(templateId);
    onDeleteModalClose();
  }

  async function handleDuplicate(templateId: string) {
    try {
      const template = templates.find((x) => x.id === templateId);

      if (template == null) {
        return;
      }

      const duplicatedTemplate: Template.CreateTemplate = {
        ...omit(template, ['id', 'title', 'userId', 'createdAt', 'updatedAt']),
        title: `${template.title} (Duplicated)`,
        subtitle: template.subtitle,
      };

      await createTemplateMutation(duplicatedTemplate).unwrap();
    } catch (error) {
      console.log({ error });
    }
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
                  onDuplicate={() => handleDuplicate(templateId)}
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

      <DeleteTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onSubmit={() => deleteTemplate(currentTemplateId.current)}
      />
    </div>
  );
};

Templates.getLayout = function getLayout(page: ReactElement) {
  return <ApplicationLayout title="Templates">{page}</ApplicationLayout>;
};

export default withProtectedRoute(Templates);
