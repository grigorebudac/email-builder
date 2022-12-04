import { color } from '@lego/design-tokens-core';
import { AdvancedType, BlockManager } from 'easy-email-core';

const payload = {
  type: 'advanced_hero',
  data: {
    value: {},
  },
  attributes: {
    'background-color': '#ffffff',
    'background-position': 'center center',
    mode: 'fluid-height',
    padding: '40px 0px 30px 0px',
    'vertical-align': 'top',
    'background-url':
      'https://bachelor-templates-bucket.s3.us-east-1.amazonaws.com/LEGO-hedgehog.png',
  },
  children: [
    {
      type: 'text',
      data: {
        value: {
          content: 'Equity or equality? </br> Or, just fair.',
        },
      },
      attributes: {
        padding: '0px 25px 10px 25px',
        align: 'center',
        color: '#ffffff',
        'font-size': '45px',
        'line-height': '45px',
        'font-weight': 'bold',
      },
      children: [],
    },
    {
      type: 'spacer',
      data: {
        value: {},
      },
      attributes: {
        height: '250px',
      },
      children: [],
    },
    {
      type: 'text',
      data: {
        value: {
          content: `At the LEGO Group, we’re playing our part in building a sustainable future and creating a better world for our children to inherit. Find out how we’re joining forces with others to have a lasting impact and inspire the children of today to become the builders of tomorrow.`,
        },
      },
      attributes: {
        align: 'center',
        'background-color': '#414141',
        color: '#ffffff',
        'font-weight': '500',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '10px 25px 10px 25px',
        'line-height': '1.5',
        target: '_blank',
        'vertical-align': 'middle',
        border: 'none',
        'text-align': 'center',
        href: '#',
        'font-size': '14px',
      },
      children: [],
    },
    BlockManager.getBlockByType(AdvancedType.BUTTON).create({
      data: {
        value: {
          content: 'Play more!',
          variant: 'default',
        },
      },
      attributes: {
        'background-color': color.brand.mediumLilac,
        'font-size': '1rem',
        'font-weight': '500',
      },
    }),
  ],
};

export default payload;
