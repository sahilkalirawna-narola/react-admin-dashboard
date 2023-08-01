import moment from "moment/moment";

import {
	Box,
	Button,
	Chip,
	IconButton,
	Tooltip,
	useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import Header from "../../components/Header";
import Table from "../../components/common/Table";

import { rulesListURL } from "../../services/api/routes/common";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const Rules = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const getStatusBadgeColor = (status) => {
		if (status === "draft") return "secondary";
		if (status === "deactivated") return "warning";
		return "success";
	};

	const columns = [
		{
			field: "id",
			headerName: "ID",
			minWidth: 120,
			renderCell: ({ row }) => (
				<>
					<Link to={`/rules/${row.id}`} className="underline">{row?.id}</Link>
				</>
			),
		},
		{
			field: "title",
			headerName: "Title",
			minWidth: 120,
			flex: 1,
		},
		{
			field: "status",
			headerName: "Status",
			minWidth: 120,
			flex: 1,
			renderCell: ({ row }) => (
				<>
					<Chip
						size='small'
						label={`${row?.status}`}
						color={`${getStatusBadgeColor(row?.status)}`}
						className='capitalize'
					/>
				</>
			),
		},
		{
			field: "created_by",
			headerName: "Author",
			minWidth: 120,
			flex: 1,
		},
		{
			field: "created",
			headerName: "Time Created",
			minWidth: 120,
			flex: 0.8,
			renderCell: ({ row: { created } }) => (
				<>{moment(created).format("MMM DD YYYY, h:mm A Z")}</>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			align: "right",
			headerAlign: "right",
			minWidth: 120,
			renderCell: ({ row }) => {
				return (
					<>
						<Tooltip title='View Details' placement='top' arrow>
							<Link to={`/rules/${row.id}`}>
								<IconButton>
									<VisibilityIcon />
								</IconButton>
							</Link>
						</Tooltip>
					</>
				);
			},
		},
	];

	return (
		<Box m='20px'>
			<div className='flex justify-between'>
				<Header title='Rules' />
				<div className=''>
					<Button
						variant='contained'
						color='secondary'
						sx={{
							textTransform: "none",
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
						}}
						startIcon={<AddIcon />}
						// onClick={() => handleAddEditModelOpen(false)}
					>
						Add Rule
					</Button>
				</div>
			</div>
			<Table
				columns={columns}
				dataURL={rulesListURL}
				rowID={"id"}
				rowSelection
				handleSelection={(id) => {
					console.log("ska id", id);
				}}
			/>
		</Box>
	);
};

export default Rules;
