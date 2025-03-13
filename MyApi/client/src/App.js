import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
  color: #333;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const UserItem = styled.li`
  background-color: #fff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const UserDetails = styled.span`
  font-size: 1.2rem;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5268/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        setError("Error fetching users: " + error.message);
      });
  }, []);

  return (
    <AppContainer>
      <Heading>Users</Heading>
      {error && <ErrorText>{error}</ErrorText>}
      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserDetails>{user.name} - {user.email}</UserDetails>
          </UserItem>
        ))}
      </UserList>
    </AppContainer>
  );
}

export default App;
