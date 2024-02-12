import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonList = styled.div`
  display: flex;
  grid-gap: small;
`;

const Buttons = styled.button`
  background: #303f9f;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: none;
  color: #ffff;
`;


interface Item {
  Id: number;
  Username: string;
};

function Showdata() {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData () {
    try {
      const response = await fetch('http://localhost:7000/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        console.error('Invalid data format:', result);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  return (
    <TableContainer>
      <h2>User Storge</h2>
      <StyledTable>
        <thead>
          <tr>
            <Th>Username (Email)</Th>
            <Th>Action (Reset Password)</Th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.Id}>
                <Td>{item.Username}</Td>
                <Td><Link to ={`/Resetpassword/${item.Id}`}>
                <ButtonGroup>
                  <ButtonList>
                    <Buttons>{"Reset"}</Buttons>
                  </ButtonList>
                </ButtonGroup>
                </Link></Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan={2}>No User available</Td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

export default Showdata;