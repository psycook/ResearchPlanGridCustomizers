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

// Entity type configuration with modern, cohesive colors
const entityTypeConfig: Record<string, { icon: string; backgroundColor: string; textColor: string }> = {
    Company: {
        icon: "CityNext",
        backgroundColor: "#E8F4FD",
        textColor: "#0969DA",
    },
    Industry: {
        icon: "Manufacturing",
        backgroundColor: "#DFF6DD",
        textColor: "#1A7F37",
    },
    Market: {
        icon: "Market",
        backgroundColor: "#FFF8E1",
        textColor: "#9A6700",
    },
    Country: {
        icon: "Globe",
        backgroundColor: "#F3E8FF",
        textColor: "#8250DF",
    },
    Individual: {
        icon: "Contact",
        backgroundColor: "#FFEBE9",
        textColor: "#CF222E",
    },
    Product: {
        icon: "ProductCatalog",
        backgroundColor: "#E6FFFA",
        textColor: "#0D9488",
    },
};

const renderOrderBadge = (value: number | undefined | null): React.ReactElement | null => {
    if (value === undefined || value === null) return null;

    return (
        <Stack
            verticalAlign="center"
            horizontalAlign="center"
            styles={{
                root: {
                    width: 28,
                    height: 28,
                    backgroundColor: "#EEF2FF",
                    borderRadius: "50%",
                    border: "1.5px solid #C7D2FE",
                },
            }}
        >
            <Text
                styles={{
                    root: {
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#4F46E5",
                    },
                }}
            >
                {value}
            </Text>
        </Stack>
    );
};

const renderEntityTypePill = (value: string | undefined | null): React.ReactElement | null => {
    if (!value) return null;

    const config = entityTypeConfig[value] || {
        icon: "Tag",
        backgroundColor: "#F3F4F6",
        textColor: "#4B5563",
    };

    return (
        <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 6 }}
            styles={{
                root: {
                    height: 28,
                    paddingLeft: 10,
                    paddingRight: 12,
                    backgroundColor: config.backgroundColor,
                    borderRadius: 6,
                    display: "inline-flex",
                },
            }}
        >
            <Icon
                iconName={config.icon}
                styles={{
                    root: {
                        fontSize: 14,
                        color: config.textColor,
                    },
                }}
            />
            <Text
                styles={{
                    root: {
                        fontSize: 13,
                        fontWeight: 500,
                        color: config.textColor,
                    },
                }}
            >
                {value}
            </Text>
        </Stack>
    );
};

export const cellRendererOverrides: CellRendererOverrides = {
    ["Text"]: (props, col) => {
        return null;
    },
    ["Decimal"]: (props, col) => {
        return null;
    },
    ["Integer"]: (props, col) => {
        const columnName = col.colDefs[col.columnIndex]?.name;
        
        // Only apply custom renderer for cra_order column
        if (columnName !== "cra_order") {
            return null;
        }

        return (
            <Stack
                horizontal
                verticalAlign="center"
                horizontalAlign="center"
                styles={{ root: { height: "100%", width: "100%" } }}
            >
                {renderOrderBadge(props.value as number)}
            </Stack>
        );
    },
    ["OptionSet"]: (props, col) => {
        const columnName = col.colDefs[col.columnIndex]?.name;
        
        // Only apply custom renderer for cra_entitytype column
        if (columnName !== "cra_entitytype") {
            return null; // Return null to use default renderer
        }

        return (
            <Stack
                horizontal
                verticalAlign="center"
                styles={{ root: { height: "100%", paddingLeft: 8, paddingRight: 8 } }}
            >
                {renderEntityTypePill(props.formattedValue)}
            </Stack>
        );
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