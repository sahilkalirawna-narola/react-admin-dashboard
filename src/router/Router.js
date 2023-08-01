import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Rules from "../pages/rules";
import RulesDetails from "../pages/rules/RulesDetails";
import Contacts from "../pages/contacts";

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/rules' element={<Rules />} />
			<Route path='/rules/:ruleId' element={<RulesDetails />} />
			<Route path='/contacts' element={<Contacts />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default Router;
