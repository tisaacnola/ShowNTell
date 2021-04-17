import styled from 'styled-components';

const RecResultStyle = styled.div`
  text-align: center;
  flex: 0 0 auto;
  margin-right: 5px;
  width: 85%;
  height: auto;
  box-shadow: 0px 0px 15px -5px;
  #rec-item-container{
    border: 2px solid ghostwhite;
    margin-left: 2%;
    margin-bottom: 5%;
    display: inline-block;
  };
  h1{
    color: #408ac8;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 2%;
    margin-top: 3%;
  };
  img{
    width: 100%;
    height: auto;
  };
  /* div.show-overview{
    color: ghostwhite;
    font-size: 0.6vw;
    margin: 2%;
  }; */
  p.overview{
    color: ghostwhite;
    font-size: 0.6vw;
    margin: 2%;
  };
`;
export default RecResultStyle;
