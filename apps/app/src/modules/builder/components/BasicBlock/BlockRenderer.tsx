import { BlockManager, IBlock } from 'easy-email-core';
// @ts-ignore
import { useEmailRenderContext } from 'easy-email-core';
import React from 'react';

type BlockDataItem = Omit<
  Parameters<IBlock['render']>[0],
  'mode' | 'context' | 'dataSource'
>;

export const BlockRenderer = (props: BlockDataItem) => {
  const { data } = props;
  const { mode, context, dataSource } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(data.type);
  if (!block) return null;
  return <>{block.render({ ...props, mode, context, dataSource })}</>;
};
