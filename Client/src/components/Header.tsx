import { HeaderProps } from "../@types";

const Header = (props: HeaderProps)=>{
  return (
    <div className="flex justify-center">
      {props.children}
    </div>
  )
}

export default Header;