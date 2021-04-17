import styled from 'styled-components';

const RecommendStyle = styled.div`
  display: flex;
  flex-flow: column;
  padding-left: 33%;
  button.rec-btn, select{
    background: rgb(35, 35, 35);
    color: ghostwhite;
    font-size: 14px;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    box-shadow: -1px -1px 2px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
    :active{
      box-shadow: -1px -1px 1px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
      background: rgb(25, 25, 25);
    }
    :hover{
      box-shadow: -2px -2px 6px rgba(100,100,100, 1), 3px 3px 4px rgba(0,0,0, 1);
    }
  };
  button.rec-btn{
    margin-bottom: 5%;
    margin-left: 1%;
  }
`;

export default RecommendStyle;
