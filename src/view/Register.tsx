import React from 'react';
import * as yup from 'yup';
import styled, { css } from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ContainerWrapper = styled.body`
  margin-top: 16px;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 1px 2px 5px rgba(100, 100, 100, 0.896);
  height: 580px;
  margin: 5rem auto 5.1rem auto;
  width: 480px;
  display: flex;
  justify-content: center;
`;
const ContainerText = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
`;
const ComponentInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 250px;
  top: 20px;
`;
const StyledInput = styled.input`
  margin-top: 10px;
  font-size: 15px;
  padding: 8px;
  border-radius: 3px;
  border-color: #c1b8b8;
  top: 20px;
  margin-bottom: 1px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 55px;
`;
const Labels = styled.label`
  font-size:15px;
  margin-top: 15px;
`;
const ButtonList = styled.div`
  display: flex;
  grid-gap: small;
`;
const Buttons = styled.button`
  background: #303f9f;
  width: 250px;
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

function Register() {
const navigate = useNavigate();
const schema = yup
    .object({
     email:yup.string().required(),
     password:yup.string().required(),
     confirmPassword: yup.string()
      .required()
      .oneOf([yup.ref('password'), null as any],'Passwords do not match')
      .nullable(),
    })
    .required();
const {
    register,
    handleSubmit,
    formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    });

function onError(error: any) {
      console.log('error : ', error);
    }
async function onSubmit(item: any) {
      try {
        const response = await fetch('http://localhost:7000/register', {
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
            text: 'สมัครสมาชิกสำเร็จ',
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด !',
            text: data.error,
          });
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
    <ContainerWrapper>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
          <ContainerText>Sing Up</ContainerText>
          <ComponentInput>
             <Labels>Email</Labels>
             <StyledInput
                id='email'
                type='email'
                placeholder='Email'
                required
                {...register('email')}
               />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                <Labels>Password</Labels>
             <StyledInput
                id='password'
                type='password'
                placeholder='Password'
                {...register('password')}
               />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                <Labels>ConfirmPassword</Labels>
             <StyledInput
                id='confirmPassword'
                type='password'
                placeholder='Confirmpassword'
                {...register('confirmPassword')}
               /> 
              {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>)}
              </ComponentInput>
              <ButtonGroup>
          <ButtonList>
            <Buttons type="submit">{"Sing Up"}</Buttons>
          </ButtonList>
        </ButtonGroup>
      </form>
      
    </ContainerWrapper>
  );
}

export default Register;
