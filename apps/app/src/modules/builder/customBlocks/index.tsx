import React from 'react';
import { AdvancedType } from 'easy-email-core';

import {
  // @ts-ignore
  TextBlockItem,
  // @ts-ignore
  ImageBlockItem,
  // @ts-ignore
  ButtonBlockItem,
  // @ts-ignore
  HeroBlockItem,
  // @ts-ignore
  NavbarBlockItem,
  // @ts-ignore
  SpacerBlockItem,
  // @ts-ignore
  DividerBlockItem,
  // @ts-ignore
  AccordionBlockItem,
  // @ts-ignore
  CarouselBlockItem,
  // @ts-ignore
  SocialBlockItem,
  // @ts-ignore
  WrapperBlockItem,
  // @ts-ignore
  SectionBlockItem,
  // @ts-ignore
  GroupBlockItem,
  // @ts-ignore
  ColumnBlockItem,
  Stack,
  TextStyle,
  BlockAvatarWrapper,
} from 'easy-email-editor';
import { theme } from '@lego/klik-ui';
import { CustomBlocksType } from '../types/block.types';
import { BlockMarketCategory } from 'easy-email-extensions';
import accordionPayload from './Accordion';
import heroPayload from './Hero';
import { color } from '@lego/design-tokens-core';

export const defaultCategories: BlockMarketCategory[] = [
  {
    title: 'Content',
    name: 'CONTENT',
    blocks: [
      {
        type: AdvancedType.TEXT,
        title: 'Text',
        description: 'This block allows you to display text in your email.',
        component: TextBlockItem,
        // @ts-ignore
        payload: {
          attributes: {
            'font-family': 'Cera Pro',
          },
        },
      },
      {
        type: AdvancedType.IMAGE,
        title: 'Image',
        description: (
          <Stack vertical spacing="none">
            {/* @ts-ignore */}
            <TextStyle>
              Displays a responsive image in your email. It is similar to the
              HTML tag. Note that if no width is provided, the image will use
              the parent column width.
            </TextStyle>
          </Stack>
        ),
        component: ImageBlockItem,
      },
      {
        type: AdvancedType.BUTTON,
        title: 'Button',
        description: 'Displays a customizable button.',
        component: ButtonBlockItem,
        // @ts-ignore
        payload: {
          data: {
            value: {
              content: 'Plain (Default)',
              variant: 'default',
            },
          },
          attributes: {
            'font-family': 'Cera Pro',
            'background-color': color.brand.brightBlue,
            'font-weight': '500',
            'letter-spacing': '0.25px',
            'inner-padding': '12px 16px 12px 16px',
            'font-size': '1rem',
          },
        },
      },
      {
        type: AdvancedType.BUTTON,
        title: 'Link',
        description: `This block displays a link, which is in fact a button of type 'ghost'.`,
        component: ButtonBlockItem,
        // @ts-ignore
        payload: {
          data: {
            value: {
              content: 'Link',
              variant: 'ghost',
            },
          },
          attributes: {
            'font-family': 'Cera Pro',
            'background-color': color.brand.brightBlue,
            'font-weight': '500',
            'letter-spacing': '0.25px',
            'inner-padding': '4px 0px 4px 0px',
            'font-size': '1rem',
            padding: '0px',
          },
        },
      },
      {
        type: AdvancedType.HERO,
        title: 'Hero',
        description: `This block displays a hero image. It behaves like an
          'section' with a single 'column'.`,
        component: HeroBlockItem,
        payload: heroPayload,
      },
      {
        type: AdvancedType.NAVBAR,
        title: 'Navbar',
        description: `Displays a menu for navigation with an optional hamburger
          mode for mobile devices.`,
        component: NavbarBlockItem,
      },
      {
        type: AdvancedType.SPACER,
        title: 'Spacer',
        description: 'Displays a blank space.',
        component: SpacerBlockItem,
      },
      {
        type: AdvancedType.DIVIDER,
        title: 'Divider',
        description: `Displays a horizontal divider that can be customized like a
          HTML border.`,
        component: DividerBlockItem,
      },
      {
        type: AdvancedType.ACCORDION,
        title: 'Accordion',
        description: `Accordion is an interactive component to stack content in
          tabs, so the information is collapsed and only the titles
          are visible. Readers can interact by clicking on the tabs
          to reveal the content, providing a great experience on
          mobile devices where space is scarce.`,
        component: AccordionBlockItem,
        // @ts-ignore
        payload: accordionPayload,
      },
      {
        type: AdvancedType.CAROUSEL,
        title: 'Carousel',
        description: `This block displays a gallery of images or "carousel".
          Readers can interact by hovering and clicking on
          thumbnails depending on the email client they use.`,
        component: CarouselBlockItem,
      },
      {
        type: CustomBlocksType.FOOTER,
        title: 'Footer',
        description: `Custom footer component.`,
        component: null,
      },
      {
        type: CustomBlocksType.CARD,
        title: 'Card',
        description: `Custom card component.`,
        component: null,
      },
      {
        type: CustomBlocksType.LOGO,
        title: 'Logo',
        description: `Custom logo component.`,
        component: null,
      },
      {
        type: CustomBlocksType.TABLE,
        title: 'Table',
        description: 'Custom table component',
        component: null,
      },
      {
        type: CustomBlocksType.RATING,
        title: 'Rating',
        description: 'Custom rating component',
        component: null,
      },
      {
        type: CustomBlocksType.SOCIALBANNER,
        title: 'SocialBanner',
        description: 'Social media links',
        component: null,
      },
    ],
  },
  {
    title: 'Layout',
    name: 'LAYOUT',
    blocks: [
      {
        type: AdvancedType.WRAPPER,
        title: 'Wrapper',
        description: `Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
          `,
        component: WrapperBlockItem,
      },
      {
        type: AdvancedType.SECTION,
        title: 'Section',
        description: (
          <Stack vertical spacing="none">
            {/* @ts-ignore */}
            <TextStyle>
              Sections are intended to be used as rows within your email. They
              will be used to structure the layout.
            </TextStyle>

            {/* @ts-ignore */}
            <TextStyle>
              Sections cannot nest in sections. Columns can nest in sections;
              all content must be in a column.
            </TextStyle>
          </Stack>
        ),
        component: SectionBlockItem,
      },
      {
        type: AdvancedType.GROUP,
        title: 'Group',
        description: `Group allows you to prevent columns from stacking on
            mobile. To do so, wrap the columns inside a group
            block, so they'll stay side by side on mobile.`,
        component: GroupBlockItem,
      },
      {
        type: AdvancedType.COLUMN,
        title: 'Column',
        description: (
          <Stack vertical spacing="none">
            {/* @ts-ignore */}
            <TextStyle>
              Columns enable you to horizontally organize the content within
              your sections. They must be located under block in order to be
              considered by the engine. To be responsive, columns are expressed
              in terms of percentage.
            </TextStyle>

            {/* @ts-ignore */}
            <TextStyle>
              Every single column has to contain something because they are
              responsive containers, and will be vertically stacked on a mobile
              view.
            </TextStyle>
          </Stack>
        ),
        component: ColumnBlockItem,
      },
    ],
  },
  // {
  //   label: 'Custom',
  //   active: true,
  //   displayType: 'custom',
  //   blocks: [
  //     // @ts-ignore
  //     <BlockAvatarWrapper type={CustomBlocksType.SOCIALBANNER}>
  //       <div
  //         style={{
  //           position: 'relative',
  //           border: '1px solid #ccc',
  //           marginBottom: 20,
  //           width: '80%',
  //           marginLeft: 'auto',
  //           marginRight: 'auto',
  //         }}
  //       >
  //         <img
  //           src={
  //             'http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665841389/ctbjtig27parugrztdhk.png'
  //           }
  //           style={{
  //             maxWidth: '100%',
  //           }}
  //         />
  //         <div
  //           style={{
  //             position: 'absolute',
  //             top: 0,
  //             left: 0,
  //             width: '100%',
  //             height: '100%',
  //             zIndex: 2,
  //           }}
  //         />
  //       </div>
  //     </BlockAvatarWrapper>,
  //   ],
  // },
];
