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

const Button = styled.button`
  background-color: #d1e119;
  color: rebeccapurple;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;
interface Item {
  id: number;
  email: string;
}
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
            <Th>Email</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <Td>{item.email}</Td>
                <Td><Link to ={`/Resetpassword/${item.id}`}>
                <button>Resetpassword</button>
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

export default Showdata
