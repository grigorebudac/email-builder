import { ARROW_DOWN_URL, ARROW_UP_URL } from '@/constants/defaultImageSources';
import { BasicType, BlockManager } from 'easy-email-core';

const payload = {
  data: {
    value: {},
  },
  attributes: {
    'icon-height': '32px',
    'icon-width': '32px',
    'icon-align': 'middle',
    'icon-position': 'right',
    'icon-unwrapped-url': ARROW_UP_URL,
    'icon-wrapped-url': ARROW_DOWN_URL,
    padding: '10px 25px 10px 25px',
    border: 'none',
  },
  children: [
    BlockManager.getBlockByType(BasicType.ACCORDION_ELEMENT).create({
      children: [
        BlockManager.getBlockByType(BasicType.ACCORDION_TITLE).create({
          data: {
            value: {
              content: 'Why use an accordion?',
            },
          },
          attributes: {
            'font-size': '16px',
          },
        }),
        BlockManager.getBlockByType(BasicType.ACCORDION_TEXT).create({
          data: {
            value: {
              content:
                'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.',
            },
          },
          attributes: {
            padding: '0px 16px 0px 16px',
            'font-weight': '300',
          },
        }),
      ],
    }),
    BlockManager.getBlockByType(BasicType.ACCORDION_ELEMENT).create({
      children: [
        BlockManager.getBlockByType(BasicType.ACCORDION_TITLE).create({
          data: {
            value: {
              content: 'Are you kidding me?',
            },
          },
          attributes: {
            'font-size': '16px',
          },
        }),
        BlockManager.getBlockByType(BasicType.ACCORDION_TEXT).create({
          data: {
            value: {
              content:
                'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.',
            },
          },
          attributes: {
            padding: '0px 16px 0px 16px',
            'font-weight': '300',
          },
        }),
      ],
    }),
  ],
};

export default payload;
