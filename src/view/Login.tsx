import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import styled, { css } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

interface LabelInterface {
  isBold?:boolean;
}

const CardWrapper = styled.div`
  margin-top: 16px;
  background: #ffffff;
  background:rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 1px 2px 8px rgba(100, 100, 100, 0.65);
  height: 70vh;
  margin: 6rem auto 8.1rem auto;
  width: 400px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-column-start: 1;
`;

const CardForm = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column-start: 2;
  margin-top: 10px;
`;
interface StyledInputProps {
  type: string;
};

const StyledInput = styled.input<StyledInputProps>`
  padding: 8px;
  border-radius: 3px;
  width: 250px;
  margin-bottom: -1px;
`;

const Label = styled.label<LabelInterface>`
  color :#000 ;
  display: block;
  text-align: start;  
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 10px;
  ${props => props.isBold && css`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 10px;
  `}
`;

const Links = styled.div`
  display: flex;
  grid-column-start: 2;
  justify-content: center;
`;

const LinkBot = styled(Link)`
  margin: 20px;
  text-align: center;
  color: #bfbfbf;
  text-decoration: none;
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: center;
`;

const Buttons = styled.button`
  margin-top: 3rem;
  background: #303f9f;
  text-align: center;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: none;
  color: #ffff;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

function Login() {
  const navigate = useNavigate();

  const schema = yup.object({
    Username: yup.string().required(),
    Password: yup.string()
      .required()
      .matches(/^\d{6,}$/, 'รหัสผ่านต้องเป็นตัวเลขอย่างน้อย 6 ตัว'),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onError(error: any) {
    console.log('error : ', error);
  }
  async function onSubmit(item: any) {
    try {
      const response = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'เข้าสู่ระบบสำเร็จ!',
        }).then(() => {
          navigate("/Showdata");
        });
      } else {
        if (response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
          }).then(() => {
            navigate("/");
          });
        } else if (response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่พบบัญชีผู้ใช้',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: data.error || response.statusText || 'Unknown error',
          });
        }
      }
    } catch (error) {
      console.error('Error during API request:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: 'มีปัญหาในการติดต่อกับเซิร์ฟเวอร์',
      });
    }
  }
   
  return (
    <CardWrapper>
      <TextWrapper>
        <Label isBold>Login</Label>
      </TextWrapper>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardForm>
          <Label htmlFor="Username">
            Username (Email)
          </Label>
          <StyledInput
            id='Username'
            type='email'
            placeholder={('Username (Email)')}
            required
            {...register('Username')}
          />
          {errors.Username && <ErrorMessage>{errors.Username.message}</ErrorMessage>}
          <Label htmlFor="Password">
            Password
          </Label>
          <StyledInput
            id='Password'
            type='password'
            placeholder={('Password')}
            required
            {...register('Password')}
          />
          {errors.Password && <ErrorMessage>{errors.Password.message}</ErrorMessage>}
        </CardForm>
        <ButtonList>
          <Buttons type="submit">{"Login"}</Buttons>
        </ButtonList>
        <Links>
          <LinkBot to = '/Register'>Create Account ?</LinkBot>
        </Links>
      </form>
    </CardWrapper>
  );
}

export default Login;