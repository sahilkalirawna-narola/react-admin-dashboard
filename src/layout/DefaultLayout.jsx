import React, { useState } from "react";

import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";

import Router from "../router/Router";

const DefaultLayout = () => {
	const [isSidebar, setIsSidebar] = useState(true);

	return (
		<div className='app'>
			<Sidebar isSidebar={isSidebar} />
			<main className='content'>
				<Topbar setIsSidebar={setIsSidebar} />
				<Router />
			</main>
		</div>
	);
};

export default DefaultLayout;
