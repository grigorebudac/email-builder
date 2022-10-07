import { Flex, Pagination, Table } from '@lego/klik-ui';
import React from 'react';
import { Column, useTable, usePagination } from 'react-table';

interface SimpleTableProps<T = object> {
  columns: Column<T>[];
  data: T[];
}

const SimpleTable = <T,>(props: SimpleTableProps<T>) => {
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    usePagination
  );

  return (
    <div>
      <Table {...getTableProps()}>
        <Table.Head>
          {headerGroups.map((headerGroup, i) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <Table.ColumnHeader {...column.parentProps} key={j}>
                  {column.render('Header')}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Head>

        <Table.Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Table.Row key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const cellWidth = `${100 / props.columns.length}%`;

                  return (
                    <Table.Cell
                      key={cell.getCellProps().key}
                      width={cellWidth}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {pageCount > 1 && (
        <Flex justifyContent="flex-end" paddingTop="1rem">
          <Pagination
            color="primary"
            totalPages={pageCount}
            page={pageIndex + 1}
            onPageClick={(page) => gotoPage(page - 1)}
          />
        </Flex>
      )}
    </div>
  );
};

export default SimpleTable;
