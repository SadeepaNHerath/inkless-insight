import { ReactNode } from "react";
import NavLinks from "./components/nav-links";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavLinks />
			{children}
		</>
	);
}