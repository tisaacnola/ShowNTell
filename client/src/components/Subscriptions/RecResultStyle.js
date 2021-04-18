import styled from 'styled-components';

const RecResultStyle = styled.div`
  text-align: center;
  /* flex: 0 0 auto; */
  /* margin-right: 5px; */
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 37px -2px;
  margin-bottom: 22%;
  #rec-item-container{
    margin-left: 2%;
    margin-bottom: 5%;
    /* display: inline-block; */
  };
  h1{
    color: #408ac8;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 2%;
    margin-top: 1.5%;
  };
  img{
    width: 100%;
    height: auto;
    border-bottom: 1.5px solid ghostwhite;
  };
  div.show-overview{
    color: ghostwhite;
    font-size: 1vw;
    margin: 2%;
  };
  p.overview{
    color: ghostwhite;
    font-size: 0.6vw;
    margin: 2%;
  };
`;
export default RecResultStyle;
