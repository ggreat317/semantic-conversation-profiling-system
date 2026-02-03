import { signOut } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation"
import { MenuButton } from "./leftsidebar";

type Setter = React.Dispatch<React.SetStateAction<string>>

export function SettingBar({setSidebar, open }: { open: boolean, setSidebar: Setter}) {
	const router = useRouter()
	async function logOut(){
		try {
			console.log("See you soon beautiful :<)");
			await signOut(auth);
			router.replace('/login')
		} catch (error) {
			console.error("Nani? Exit failed: ", error);
		}
	}

  return(
    <div className={open ? "leftsidebar open" : "leftsidebar"}>
      <div className="top">
				<span className="text big">Settings</span>
			</div>
			<div className="tabs">
				<MenuButton name={"Customization"} set={()=>setSidebar("options")} className={""}></MenuButton>
			</div>
			<div className="bottom">
				<MenuButton name={"Log Out"} set={() => logOut()} className={"logout"}></MenuButton>
				<MenuButton name={"Exit Settings"} set={() => setSidebar("")} className={""}></MenuButton>
			</div>
    </div>
  );
}


