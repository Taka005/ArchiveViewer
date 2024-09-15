import { HeaderProps } from "../@types";

const Header = (props: HeaderProps)=>{
  return (
    <div className="w-100 h-20 flex items-center justify-center">
      {props.children}
    </div>
  )
}

export default Header;