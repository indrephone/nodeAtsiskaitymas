import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  text-align: center;
  font-family: "Gill Sans Extrabold", sans-serif;
`;

const Title = styled.h1`
  font-size: 3em;
  color: white;
  margin: 0.5em 0;
`;

const Text = styled.p`
  font-size: 1.5em;
  color: white;
  margin: 0.5em 0;
`;

const Home = () => {
    return ( 
        <Container>
            <Title>Welcome to the Library !</Title>
            <Text>Here you can find all the books you need</Text>
        </Container>
     );
}
 
export default Home;