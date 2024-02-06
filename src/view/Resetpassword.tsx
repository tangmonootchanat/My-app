import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import styled from "styled-components";

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

const Labels = styled.label`
  font-size: 15px;
  margin-top: 15px;
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

function ResetPassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      newPassword: yup.string().required(),
      confirmNewPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("newPassword"), null as any], "Passwords do not match"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (item: any) => {
    try {
      const response = await fetch(`http://localhost:7000/password/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: item.newPassword,
          confirmNewPassword: item.confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "รีเซ็ตรหัสผ่านสำเร็จ",
        });
        navigate("/Showdata");
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: data.error || "ไม่สามารถรีเซ็ตรหัสผ่านได้",
        });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "There was a problem communicating with the server",
      });
    }
  };

  return (
    <ContainerWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerText>Reset password</ContainerText>
        <ComponentInput>
          <Labels>New Password</Labels>
          <StyledInput
            id="newPassword"
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
            required
          />
          {errors.newPassword && typeof errors.newPassword.message === 'string' && (
            <span style={{ color: 'red' }}>{errors.newPassword.message}</span>
          )}
          <Labels>Confirm Password</Labels>
          <StyledInput
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmNewPassword")}
            required
          />
          {errors.confirmNewPassword && typeof errors.confirmNewPassword.message === 'string' && (
            <span style={{ color: 'red' }}>{errors.confirmNewPassword.message}</span>
          )}
        </ComponentInput>
        <ButtonGroup>
          <ButtonList>
            <Buttons type="submit">{"Reset Password"}</Buttons>
          </ButtonList>
        </ButtonGroup>
      </form>
    </ContainerWrapper>
  );
}

export default ResetPassword;
