'use client'

import { useState } from 'react';
import { getUserInfo } from '../../../utilities/api/selfGet';
import { updateCustom } from '../../../utilities/api/selfUpdates';
type Setter = React.Dispatch<React.SetStateAction<string>>
type themeSetter = React.Dispatch<React.SetStateAction<Theme>>



const SELECTION = [
	"text", "border", "side", "button", "hover",
	"header", "chat", "time", "foot", "input", "send"
] as const;

type ThemeKey = typeof SELECTION[number];
type Theme = Record<ThemeKey, string>;

const DARK_THEME: Theme = {
	text: "#fefeff",
	border: "#222223",
	side: "#232428",
	button: "#232428",
	hover: "#b9bbbe",
	header: "#23272a",
	chat: "#313338",
	time: "#b9bbbe",
	foot: "#383a40",
	input: "#202225",
	send: "#5865f2",
};

const LIGHT_THEME: Theme = {
	text: "#1f2933",
	border: "#e5e7eb",
	side: "#f8fafc",
	header: "#f1f5f9",
	chat: "#ffffff",
	foot: "#f1f5f9",
	button: "#e5e7eb",
	hover: "#6b7280",
	input: "#1f2933",
	send: "#2563eb",
	time: "#6b7280",
};


export function OptionBar({ setSidebar, setCustom, setCustomTheme, open }: { open: boolean, setSidebar: Setter, setCustom: Setter, setCustomTheme: themeSetter }) {
	const [isDark, setIsDark] = useState(true);

	const handleToggleTheme = () => {
		if (isDark) {
			applyTheme(LIGHT_THEME);
		} else {
			applyTheme(DARK_THEME);
		}
		setIsDark(prev => !prev);
	};

	async function handleCustom(custom: string) {
		setCustom(custom);
		try {
			const res = await getUserInfo(`custom${custom}`);
			const theme = res?.[`custom${custom}`] as Theme;
			setCustomTheme(theme);
		} catch {
			setCustomTheme(DARK_THEME);
		}
		setSidebar("sliders");
		return;
	}

	return (
		<div className={open ? "leftsidebar open" : "leftsidebar"}>
			<div className="top">
				<span className="text big">Customization</span>
			</div>

			<div>
				<MenuButton
					label={isDark ? "Light Mode" : "Dark Mode"}
					onClick={handleToggleTheme}
				/>
				<MenuButton label="Custom 1" onClick={() => handleCustom("One")} />
				<MenuButton label="Custom 2" onClick={() => handleCustom("Two")} />
				<MenuButton label="Custom 3" onClick={() => handleCustom("Three")} />
				<MenuButton label="Custom 4" onClick={() => handleCustom("Four")} />
				<MenuButton label="Custom 5" onClick={() => handleCustom("Five")} />
				<MenuButton label="Custom 6" onClick={() => handleCustom("Six")} />
			</div>

			<div className="bottom">
				<MenuButton
					label="Exit Customization"
					onClick={() => setSidebar("")}
				/>
			</div>
		</div>
	);
}

function applyTheme(theme: Theme) {
	Object.entries(theme).forEach(([key, value]) => {
		document.documentElement.style.setProperty(`--${key}`, value);
	});
	updateCustom("Last", theme);
}

function MenuButton({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			className="button menu-button fixed-button"
			onClick={onClick}
		>
			{label}
		</button>
	);
}
