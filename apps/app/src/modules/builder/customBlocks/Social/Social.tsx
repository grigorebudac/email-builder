import React from 'react';
import {
  IBlockData,
  BasicType,
  createCustomBlock,
  AdvancedType,
  components,
} from 'easy-email-core';
// import { getImg } from '@core/utils/getImg';
import { merge } from 'lodash';
import { BasicBlock } from '../../components/BasicBlock/BasicBlock';

const { Section, Wrapper } = components;

export type ISocial = IBlockData<
  {
    align?: string;
    color?: string;
    'container-background-color'?: string;
    'border-radius'?: string;
    'icon-height'?: string;
    'icon-size'?: string;
    mode?: 'vertical' | 'horizontal';
    'icon-padding': string;
    'text-padding': string;
    'text-decoration'?: string;
    padding?: string;
    'inner-padding'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'line-height'?: string;
  },
  {
    elements: Array<{
      content: string;
      src: string;
      align?: string;
      alt?: string;
      'background-color'?: string;
      'border-radius'?: string;
      color?: string;
      'font-family'?: string;
      'font-size'?: string;
      'font-style'?: string;
      'font-weight'?: string;
      href?: string;
      'icon-height'?: string;
      'icon-size'?: string;
      'line-height'?: string;
      name?: string;
      padding?: string;
      'icon-padding'?: string;
      'text-padding'?: string;
      target?: string;
      title?: string;
      'text-decoration'?: string;
      'vertical-align'?: string;
    }>;
  }
>;

export const Social = createCustomBlock<ISocial>({
  name: 'Social',
  type: BasicType.SOCIAL,
  create: (payload) => {
    const defaultData: ISocial = {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              target: '_blank',
              src: '/facebook.png',
              content: 'Facebook',
            },
            {
              href: '#',
              target: '_blank',
              src: '/facebook.png',
              content: 'Google',
            },
            {
              href: '',
              target: '_blank',
              src: '/facebook.png',
              content: 'Twitter',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        color: '#333333',
        mode: 'horizontal',
        'font-size': '13px',
        'font-weight': 'normal',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '4px 4px 4px 4px',
        'line-height': '22px',
        'text-padding': '4px 4px 4px 0px',
        'icon-padding': '0px',
        'icon-size': '20px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.COLUMN,
    BasicType.PAGE,
    AdvancedType.WRAPPER,
    BasicType.WRAPPER,
  ],
  render(params) {
    const { data } = params;
    const elements = data.data.value.elements
      .map((element) => {
        const elementAttributeStr = Object.keys(element)
          .filter(
            (key) =>
              key !== 'content' && element[key as keyof typeof element] !== ''
          )
          .map((key) => `${key}="${element[key as keyof typeof element]}"`)
          .join(' ');
        return `
          <mj-social-element ${elementAttributeStr}>${element.content}</mj-social-element>
          `;
      })
      .join('\n');

    return (
      <BasicBlock params={params} tag="mj-social">
        {elements}
      </BasicBlock>
    );
  },
});
