import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Typography,
	useTheme,
} from "@mui/material";

import Header from "../../components/Header";
import Table from "../../components/common/Table";
import Axios from "../../services/api/Config";

import {
	getRulesURL,
	transactionListURL,
} from "../../services/api/routes/common";
import { tokens } from "../../theme";
import moment from "moment";

const RulesDetails = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	let { ruleId } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [ruleDetails, setRuleDetails] = useState(null);

	const fetch = useCallback(() => {
		setIsLoading(true);
		Axios({ ...getRulesURL(ruleId) })
			.then((response) => {
				const res = response.data;
				setRuleDetails(res);
			})
			.catch(() => {
				navigate("/rules");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate, ruleId]);

	useEffect(() => {
		if (ruleId) {
			fetch();
		} else {
			navigate("/rules");
		}
	}, [fetch, navigate, ruleId]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			minWidth: 220,
			flex: 1,
		},
		{
			field: "amount",
			headerName: "Amount",
			minWidth: 120,
			flex: 1,
			align: "right",
			headerAlign: "right",
		},
		{
			field: "type",
			headerName: "Type",
			minWidth: 120,
			flex: 1,
			renderCell: ({ row: { type } }) => (
				<div className='capitalize'>{type}</div>
			),
		},
		{
			field: "sender_entity",
			headerName: "Sender",
			minWidth: 120,
			flex: 1,
			renderCell: ({ row: { sender_entity } }) => (
				<div>{sender_entity?.name}</div>
			),
		},
		{
			field: "receiver_entity",
			headerName: "Receiver",
			minWidth: 120,
			flex: 1,
			renderCell: ({ row: { receiver_entity } }) => (
				<div>{receiver_entity?.name}</div>
			),
		},
		{
			field: "created",
			headerName: "Created At",
			minWidth: 120,
			flex: 1,
			renderCell: ({ row: { created } }) => (
				<>{moment(created).format("MMM DD YYYY, h:mm A Z")}</>
			),
		},
	];

	const getStatusBadgeColor = (status) => {
		if (status === "draft") return "secondary";
		if (status === "deactivated") return "warning";
		return "success";
	};

	return (
		<Box m='20px'>
			{isLoading ? (
				<div className='w-full my-4 text-center'>
					<CircularProgress color='secondary' />
				</div>
			) : (
				<>
					<div className='flex justify-between'>
						<div className='flex items-center gap-3 mb-3'>
							<Header title={ruleDetails?.title} />
							<Chip
              size="medium"
								label={`${ruleDetails?.status}`}
								color={`${getStatusBadgeColor(ruleDetails?.status)}`}
								className='text-2xl font-bold capitalize'
							/>
						</div>
						<div>
							<Button
								variant='contained'
								color='secondary'
								size='large'
								sx={{
									textTransform: "none",
									backgroundColor: colors.blueAccent[700],
									color: colors.grey[100],
								}}
								// onClick={() => handleAddEditModelOpen(false)}
							>
								View Logic
							</Button>
						</div>
					</div>

					<Box
						gridColumn='span 3'
						backgroundColor={colors.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='space-around'>
						<div className='flex flex-col items-center m-4'>
							<span
								className='text-lg font-bold'
								style={{ color: colors.greenAccent[500] }}>
								Transactions
							</span>
							<span
								className='text-2xl font-bold'
								style={{ color: colors.grey[100] }}>
								500.4K
							</span>
						</div>
						<div className='flex flex-col items-center m-4'>
							<span
								className='text-lg font-bold'
								style={{ color: colors.greenAccent[500] }}>
								Users
							</span>
							<span
								className='text-2xl font-bold'
								style={{ color: colors.grey[100] }}>
								20.4K
							</span>
						</div>
						<div className='flex flex-col items-center m-4'>
							<span
								className='text-lg font-bold'
								style={{ color: colors.greenAccent[500] }}>
								Value
							</span>
							<span
								className='text-2xl font-bold'
								style={{ color: colors.grey[100] }}>
								$ 3.45M
							</span>
						</div>
					</Box>

					<Typography
						variant='h4'
						gutterBottom
						color={colors.greenAccent[400]}
						className='!mt-3 capitalize'>
						{ruleDetails?.description}
					</Typography>

					<Typography
						variant='h3'
						gutterBottom
						color={colors.grey[100]}
						className='!mt-8 capitalize'>
						Transactions
					</Typography>

					<Table columns={columns} dataURL={transactionListURL} rowID={"id"} />
				</>
			)}
		</Box>
	);
};

export default RulesDetails;
