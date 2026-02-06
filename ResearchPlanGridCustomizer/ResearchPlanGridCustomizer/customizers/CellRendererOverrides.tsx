/* eslint-disable react/prop-types */
import * as React from "react";
import { Text, Stack, Icon } from "@fluentui/react";
import { CellRendererOverrides } from "../types";

const formatDateTime = (dateValue: Date): string => {
	const day = String(dateValue.getDate()).padStart(2, "0");
	const month = String(dateValue.getMonth() + 1).padStart(2, "0");
	const year = dateValue.getFullYear();
	const hours = String(dateValue.getHours()).padStart(2, "0");
	const minutes = String(dateValue.getMinutes()).padStart(2, "0");
	const seconds = String(dateValue.getSeconds()).padStart(2, "0");
	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const planTypeConfig: Record<string, { background: string; text: string; icon: string }> = {
	"Manual": {
		background: "#e0e7ff",
		text: "#4338ca",
		icon: "HandsFree",
	},
	"Scheduled": {
		background: "#fef3c7",
		text: "#b45309",
		icon: "ScheduleEventAction",
	},
};

const researchPlanStatusConfig: Record<string, { background: string; text: string; icon: string }> = {
	"Active": {
		background: "#dcfce7",
		text: "#166534",
		icon: "SkypeCircleCheck",
	},
	"Paused": {
		background: "#fef3c7",
		text: "#b45309",
		icon: "Pause",
	},
	"Archived": {
		background: "#f3f4f6",
		text: "#6b7280",
		icon: "Archive",
	},
};

const executionFrequencyConfig: Record<string, { background: string; text: string; icon: string }> = {
	"Daily": {
		background: "#dbeafe",
		text: "#1d4ed8",
		icon: "Sunny",
	},
	"Weekly": {
		background: "#ccfbf1",
		text: "#0f766e",
		icon: "CalendarWeek",
	},
	"Monthly": {
		background: "#ede9fe",
		text: "#7c3aed",
		icon: "Calendar",
	},
	"Quarterly": {
		background: "#ffedd5",
		text: "#c2410c",
		icon: "CalendarReply",
	},
	"Annually": {
		background: "#dcfce7",
		text: "#166534",
		icon: "CalendarYear",
	},
	"Custom": {
		background: "#f3f4f6",
		text: "#4b5563",
		icon: "Settings",
	},
};

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props, col) => {
		return null;
	},
	["Decimal"]: (props, col) => {
		return null;
	},
	["OptionSet"]: (props, col) => {
		const columnName = col.colDefs[col.columnIndex].name;
		const optionText = props.formattedValue ?? "";

		if (columnName === "cra_plantype" || columnName === "cra_researchplanstatus" || columnName === "cra_executionfrequency") {
			const configMap = columnName === "cra_plantype" 
				? planTypeConfig 
				: columnName === "cra_researchplanstatus" 
					? researchPlanStatusConfig 
					: executionFrequencyConfig;
			const config = configMap[optionText] ?? {
				background: "#f3f4f6",
				text: "#4b5563",
				icon: "StatusCircleQuestionMark",
			};
			return (
				<Stack verticalAlign="center" horizontalAlign="start" styles={{ root: { height: "100%", paddingLeft: 8 } }}>
					<Stack
						horizontal
						verticalAlign="center"
						tokens={{ childrenGap: 6 }}
						styles={{
							root: {
								backgroundColor: config.background,
								padding: "4px 10px",
								borderRadius: 4,
							},
						}}
					>
						<Icon
							iconName={config.icon}
							styles={{
								root: {
									fontSize: 14,
									color: config.text,
								},
							}}
						/>
						<Text
							styles={{
								root: {
									color: config.text,
									fontWeight: 500,
									fontSize: 13,
								},
							}}
						>
							{optionText}
						</Text>
					</Stack>
				</Stack>
			);
		}

		return null;
	},
	["DateAndTime"]: (props, col) => {
		const dateValue = props.value ? new Date(props.value as string) : null;
		const formattedDate = dateValue ? formatDateTime(dateValue) : "--/--/---- --:--:--";
		return (
			<Stack
				horizontal
				verticalAlign="center"
				tokens={{ childrenGap: 8 }}
				styles={{ root: { height: "100%", paddingLeft: 8, paddingRight: 8 } }}
			>
				<Icon iconName="Calendar" styles={{ root: { fontSize: 16, color: "#0078d4" } }} />
				<Text>{formattedDate}</Text>
			</Stack>
		);

	},
};