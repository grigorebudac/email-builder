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
import {
  FACEBOOK_ICON_URL,
  GLASSDOOR_ICON_URL,
  INSTAGRAM_ICON_URL,
  LINKEDIN_ICON_URL,
  TWITTER_ICON_URL,
  WWW_ICON_URL,
} from '@/constants/defaultImageSources';

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
    iconLabels?: 'none' | 'visible';
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
              href: 'https://www.linkedin.com/company/lego-group',
              target: '_blank',
              src: LINKEDIN_ICON_URL,
              content: 'LinkedIn',
            },
            {
              href: 'https://www.facebook.com/LEGO',
              target: '_blank',
              src: FACEBOOK_ICON_URL,
              content: 'Facebook',
            },
            {
              href: 'https://instagram.com/lego',
              target: '_blank',
              src: INSTAGRAM_ICON_URL,
              content: 'Instagram',
            },
            {
              href: 'https://twitter.com/LEGO_Group',
              target: '_blank',
              src: TWITTER_ICON_URL,
              content: 'Twitter',
            },
            {
              href: 'https://www.glassdoor.com/Reviews/The-LEGO-Group-Denmark-Reviews-EI_IE3944.0,14_IL.15,22_IN63.htm?filter.iso3Language=eng',
              target: '_blank',
              src: GLASSDOOR_ICON_URL,
              content: 'Glassdoor',
            },
            {
              href: 'https://www.lego.com/',
              target: '_blank',
              src: WWW_ICON_URL,
              content: 'LEGO.com',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        color: '#333333',
        mode: 'horizontal',
        iconLabels: 'none',
        'font-size': '13px',
        'font-weight': 'normal',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '4px 4px 4px 4px',
        'line-height': '22px',
        'text-padding': '4px 4px 4px 0px',
        'icon-padding': '0px',
        'icon-size': '20px',
        'font-family': 'Cera Pro',
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
    const attributes = data.attributes;
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
          <mj-social-element ${elementAttributeStr}>${
          attributes.iconLabels === 'visible' ? element.content : ''
        }</mj-social-element>
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
