import styled from "styled-components";
import Avatar from "../components/Avatar";


export default function BoardItem() {
  
  
  return (
    <Div>
      <div className="topbar">
        <div className="left">
          <button className="btn btn-gray">Private</button>
          <div className="avatars">
            {[1, 2, 3].map(i => (
              <Avatar key={i} />
            ))}
            <span>+5 others</span>
          </div>
        </div>
        <button className="btn btn-gray">... Show Menu</button>
      </div>
    </Div>
  )
}


const Div = styled.div`
  background-color: var(--white);
  padding: 24px;
  .topbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      .avatars{
        display: flex;
        gap: 12px;
        align-items: center;
      }
    }
  }
`
