import React, { useCallback, useState } from 'react';
import { Collapse, Space } from '@arco-design/web-react';

interface CollapseWrapperProps {
  defaultActiveKey: string[];
  children?: React.ReactNode;
}

const CollapseWrapper = ({
  defaultActiveKey,
  children,
}: CollapseWrapperProps) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKey);

  const onChange = useCallback((key: string, keys: string[]) => {
    setActiveKeys(keys);
  }, []);

  return (
    <Space
      size="large"
      direction="vertical"
      style={{ width: '100%', marginBottom: 100 }}
    >
      <Collapse onChange={onChange} activeKey={activeKeys}>
        {children}
      </Collapse>
    </Space>
  );
};

export default CollapseWrapper;
