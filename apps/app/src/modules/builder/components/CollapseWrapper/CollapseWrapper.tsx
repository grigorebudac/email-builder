import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Collapse, Space } from '@arco-design/web-react';

interface CollapseWrapperProps {
  defaultActiveKey: string[];
}

const CollapseWrapper = ({
  defaultActiveKey,
  children,
}: PropsWithChildren<CollapseWrapperProps>) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKey);

  const onChange = useCallback((key: string, keys: string[]) => {
    setActiveKeys(keys);
  }, []);

  return (
    <Space size="large" direction="vertical" style={{ marginBottom: 100 }}>
      <Collapse onChange={onChange} activeKey={activeKeys}>
        {children}
      </Collapse>
    </Space>
  );
};

export default CollapseWrapper;
