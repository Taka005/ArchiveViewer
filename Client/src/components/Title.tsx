import { TitleProps } from "../@types";

const Title = (props: TitleProps)=>{
  return (
    <div className="pageTitle">
      <h2>{props.children}</h2>
    </div>
  )
}

export default Title;