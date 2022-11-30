import { theme } from '@lego/klik-ui';
import { components } from 'easy-email-core';
import React from 'react';

type Props = {
  color: string;
  gap: string;
  filled: boolean;
};

const { Column } = components;

export const Star = ({ color, gap, filled }: Props) => {
  return (
    <Column padding={`0px ${gap}`}>
      {`
        <mj-text color="${
          filled ? color : theme.colors.slate[200]
        }" padding="0px 0px 0px 0px">
          <div style="text-align: center">
            <div >
              <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-10f6wzr">
                <g fill="currentColor">
                  <path d="M4.075 22.308L6.215 15 .477 10.14a1.31 1.31 0 01.82-2.32h6.996l2.49-6.96c.086-.25.25-.464.466-.619.217-.155.477-.24.743-.24s.526.085.742.24c.217.155.38.368.467.62l2.51 7.01h6.996a1.32 1.32 0 01.81 2.34l-5.898 4.839 2.29 7.19a1.29 1.29 0 01-.379 1.48 1.28 1.28 0 01-.753.28 1.285 1.285 0 01-.778-.21l-5.984-4.07-6.01 4.07a1.3 1.3 0 01-.754.21 1.294 1.294 0 01-.734-.27 1.288 1.288 0 01-.442-1.42z">
                  </path>
                </g>
              </svg>
            </div>
          </div>
        </mj-text>
      `}
    </Column>
  );
};
