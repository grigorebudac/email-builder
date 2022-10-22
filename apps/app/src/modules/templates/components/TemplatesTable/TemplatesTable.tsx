import React, { useMemo } from 'react';
import { Column } from 'react-table';
import { Button, ButtonGroup, Text } from '@lego/klik-ui';

import SimpleTable from '@/components/Tables/SimpleTable';
import { unixToReadableFormat } from '@/utils/date.utils';
import { Template } from '@/types/template.types';

interface TemplatesTableProps {
  data: Template.Template[];
  onEdit: (templateId: string) => void;
  onDelete: (templateId: string) => void;
}

const TemplatesTable = (props: TemplatesTableProps) => {
  const columns: Column<Template.Template>[] = useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: (originalRow) => {
          return <Text variant="h3">{originalRow.title}</Text>;
        },
      },
      {
        Header: 'Description',
        accessor: (originalRow) => {
          return <Text variant="h3">{originalRow.subtitle}</Text>;
        },
      },
      {
        Header: 'Created At',
        accessor: (originalRow) => {
          const date = unixToReadableFormat(originalRow.createdAt);
          return <Text variant="h3">{date}</Text>;
        },
      },
      {
        Header: 'Updated At',
        accessor: (originalRow) => {
          const date = unixToReadableFormat(originalRow.updatedAt);
          return <Text variant="h3">{date}</Text>;
        },
      },
      {
        Header: 'Actions',
        accessor: (originalRow) => {
          const templateId = originalRow.id;

          return (
            <ButtonGroup size="xs">
              <Button onClick={() => props.onEdit(templateId)}>Edit</Button>
              <Button onClick={() => props.onDelete(templateId)}>Delete</Button>
            </ButtonGroup>
          );
        },
      },
    ];
  }, []);

  return <SimpleTable<Template.Template> columns={columns} data={props.data} />;
};

export default TemplatesTable;
