import React, { useMemo } from 'react';
import { Column } from 'react-table';
import { Button, ButtonGroup, Text } from '@lego/klik-ui';

import SimpleTable from '@/components/Tables/SimpleTable';
import { unixToReadableFormat } from '@/utils/date.utils';

interface TemplatesTableProps {
  data: object[];
}

const TemplatesTable = (props: TemplatesTableProps) => {
  const columns: Column[] = useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: (originalRow) => {
          return <Text variant="h3">{originalRow.name}</Text>;
        },
      },
      {
        Header: 'Description',
        accessor: (originalRow) => {
          return <Text variant="h3">{originalRow.description}</Text>;
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
          return (
            <ButtonGroup size="xs">
              <Button>Send</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </ButtonGroup>
          );
        },
      },
    ];
  }, []);

  return <SimpleTable columns={columns} data={props.data} />;
};

export default TemplatesTable;
