import styled from 'styled-components';

export default function App() {


  return (
    <>
      <Header>
        <div className='logo'>
          <div className='design'>
            <div></div>
            <div></div>
          </div>
          <span>Thullo</span>
        </div>
      </Header>
    </>
  )
}

const Header = styled.header`
  .logo{
    display: flex;
    gap: 10px;
    align-items: center;

    .design{
      display: flex;
      gap: 5px;
      height: 30px;

      div{
        width: 14px;
        background-color: var(--mainColor);
        border-radius: 3px;

        &:nth-child(2){
          height: 17px;
        }
      }
    }
      
    span{
      font-size: 18px;
      font-weight: 600;
      line-height: 27px;
    }
  }
`
