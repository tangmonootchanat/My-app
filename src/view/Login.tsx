import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import styled, { css } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LabelInterface {
  isBold?:boolean;
}

const CardWrapper = styled.div`
  margin-top: 16px;
  background: #ffffff;
  background:rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 1px 2px 8px rgba(100, 100, 100, 0.65);
  height: 410px;
  margin: 6rem auto 8.1rem auto;
  width: 400px;

`;

const TextWrapper = styled.div`
  display: grid;
  grid-column-start: 1;

`;

const CardForm = styled.div`
  display: grid;
  grid-column-start: 2;
  justify-content: center;
  margin-top: 10px;

`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;

`;

const ButtonList = styled.div`
  display: flex;
  grid-gap: small;

`;
interface StyledInputProps {
  type: string;
}

const StyledInput = styled.input<StyledInputProps>`
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

const LinkBot = styled(Link)`
  display: grid;
  margin-top: 20px;
  text-align: center;
  color: #666666;
  text-decoration: none;
`;

  function Login() {
    // const navigate = useNavigate();
  
    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required()
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
  
    function onSubmit(item: any) {
      console.log('item : ', item);
      if (item) {
        const data: any = {
          ...item
        };
  
        console.log('data : ', data);
      }
    }
  
    // useEffect(() => {
    //   navigate('/');
    // }, []);
  
    return (
        <CardWrapper>
          <TextWrapper>
            <Label isBold>Login</Label>
          </TextWrapper>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <CardForm>
              <Label htmlFor="username">
                Username
              </Label>
              <StyledInput
                id='username'
                type='text'
                placeholder={('Username')}
                required
                {...register('username')}
              />
              <Label htmlFor="password">
                Password
              </Label>
              <StyledInput
                id='password'
                type='password'
                placeholder={('Password')}
                required
                {...register('password')}
              />
            </CardForm>
            <ButtonGroup>
              <ButtonList>
                <button color='success' type='submit'>{('login')}</button>
              </ButtonList>
            </ButtonGroup>
            <LinkBot to = ''>forget password ?</LinkBot>
          </form>
        </CardWrapper>
    );
  }
  

export default Login