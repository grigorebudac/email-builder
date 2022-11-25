import { FACEBOOK_ICON_URL } from '@/constants/defaultImageSources';
import {
  getAdapterAttributesString,
  getChildIdx,
  IBlock,
} from 'easy-email-core';
import omit from 'lodash/omit';
import React, { PropsWithChildren } from 'react';
import { getPlaceholder } from '../../utils/getPlaceHolder';
import { BlockRenderer } from './BlockRenderer';

interface BasicBlockProps {
  params: Parameters<IBlock['render']>[0];
  tag: string;
}

export function BasicBlock(props: PropsWithChildren<BasicBlockProps>) {
  const {
    params,
    params: { data, idx, children: children2, mode },
    tag,
    children,
  } = props;

  const placeholder = data.children.length === 0 && getPlaceholder(params);

  let content = children || children2;
  if (
    (!content || (Array.isArray(content) && content.length === 0)) &&
    data.children.length === 0
  ) {
    content = placeholder;
  }

  if (mode === 'testing' && tag === 'mj-image') {
    const url = data.attributes.src;

    if (
      url === '' ||
      /{{([\s\S]+?)}}/g.test(url) ||
      /\*\|([^|*]+)\|\*/g.test(url)
    ) {
      const adapterData = omit(params, 'data.attributes.src');

      return (
        <>
          {`<${tag} ${getAdapterAttributesString(
            adapterData
          )} src=${FACEBOOK_ICON_URL}>`}

          {`</${tag}>`}
        </>
      );
    }
  }

  return (
    <>
      {`<${tag} ${getAdapterAttributesString(params)}>`}
      {content ||
        data.children.map((child, index) => (
          <BlockRenderer
            key={index}
            {...params}
            idx={idx ? getChildIdx(idx, index) : null}
            data={child}
          />
        ))}
      {`</${tag}>`}
    </>
  );
}
