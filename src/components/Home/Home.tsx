import React, { FC } from 'react';
import './Home.less';
import { Space, Button } from 'antd';

export const Home: FC<any> = () => {
  return (
    <div className="d-flex" style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
        padding: '0 50px'
      }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: '64px',
          color: '#514fde'
        }}>We Take Your Health Seriously</h1>
        <div style={{
          backgroundColor: "#514fde",
          width: "100px",
          height: "5px",
          marginBottom: "30px"
        }}></div>
        <p style={{
          fontWeight: 500,
          marginBottom: '30px'
        }}>
          During this COVID-19 pandemic, finding the nearest hospital, pharmacy, <br></br> clinic or medical office has been streamlined to a simple tap.
        </p>

        <Space>
          <Button type='primary' size='large' style={{
            width: '240px',
            height: '60px',
            padding: '',
            borderRadius: '5px',
            fontWeight: 700,
          }}>Get Started</Button>

          <Button type='primary' size='large' style={{
            fontWeight: 700,
            width: '240px',
            height: '60px',
            border: 'none',
            borderRadius: '5px',
            color: '#514fde',
            backgroundColor: '#eee'
          }}>Our App</Button>
        </Space>
      </div>
      <div style={{
        display: 'flex',
        width: '50%',
        justifyContent: 'center'
      }}>
        <img src="./images/hero.svg" alt="" width="80%" height="80%"/>
      </div>
    </div>
  )
}