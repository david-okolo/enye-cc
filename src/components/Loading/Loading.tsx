import { FC } from "react";

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// full screen loading component
export const Loading: FC<any> = () => {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: "48px" }}/>}></Spin>
    </div>
  )
}