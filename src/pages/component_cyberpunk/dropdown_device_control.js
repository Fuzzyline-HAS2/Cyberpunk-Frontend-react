import React, { useState } from "react";
import axios from "axios";
/**
 * @brief 각각의 장치를 제어하는 드롭다운 컴포넌트
 */
const MYDropdownDeviceControl = (props) => {
	const [device_name, setDevice_name] = useState();
	const [command, setCommand] = useState();
	const select_device = {
		itembox: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BI1", name: "BI1" },
			{ value: "BI2", name: "BI2" },
			{ value: "HI1", name: "HI1" },
			{ value: "HI2", name: "HI2" },
			{ value: "GI1", name: "GI1" },
			{ value: "GI2", name: "GI2" },
			{ value: "OI1", name: "OI1" },
			{ value: "OI2", name: "OI2" },
			{ value: "FI1", name: "FI1" },
			{ value: "FI2", name: "FI2" },
		],
		revivalmachine: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BR1", name: "BR1" },
			{ value: "BR2", name: "BR2" },
			{ value: "HR1", name: "HR1" },
			{ value: "HR2", name: "HR2" },
			{ value: "GR1", name: "GR1" },
			{ value: "GR2", name: "GR2" },
			{ value: "OR1", name: "OR1" },
			{ value: "OR2", name: "OR2" },
			{ value: "FR1", name: "FR1" },
			{ value: "FR2", name: "FR2" },
		],
		tagmachine: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BD", name: "BD" },
			{ value: "HD1", name: "HD1" },
			{ value: "HD2", name: "HD2" },
			{ value: "GD", name: "GD" },
			{ value: "OD", name: "OD" },
			{ value: "FD1", name: "FD1" },
		],
		duct: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BV1", name: "BV1" },
			{ value: "BV2", name: "BV2" },
			{ value: "HV1", name: "HV1" },
			{ value: "HV2", name: "HV2" },
			{ value: "GV1", name: "GV1" },
			{ value: "GV2", name: "GV2" },
			{ value: "FV", name: "FV" },
		],
		generator: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BG", name: "BG" },
			{ value: "HG", name: "HG" },
			{ value: "GG", name: "GG" },
			{ value: "OG", name: "OG" },
			{ value: "FG", name: "FG" },
		],
		escapemachine: [
			{ value: "장치명", name: "장치명" },
			{ value: "ALL", name: "ALL" },
			{ value: "BE", name: "BE" },
			{ value: "OE", name: "OE" },
			{ value: "FE", name: "FE" },
		],
		temple: [
			{ value: "장치명", name: "장치명" },
			{ value: "BT", name: "BT" },
		],
	};

	const select_command = {
		itembox: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_open", name: "상자열기(open)" },
			{ value: "device_state_used", name: "상자 사용 완료(used)" },
			{ value: "manage_state_mo", name: "강제상자열기(mo)" },
			{ value: "manage_state_mu", name: "강제사용완료(mu)" },
		],
		revivalmachine: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_self_revive", name: "자가부활(self_revive)" },
			{ value: "device_state_used", name: "사용완료(used)" },
			{ value: "manage_state_mu", name: "강제사용완료(mu)" },
		],
		tagmachine: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_open", name: "도어오픈(open)" },
			{ value: "device_state_lock", name: "도어잠금(lock)" },
			{ value: "manage_state_mo", name: "강제도어오픈(mo)" },
			{ value: "manage_state_ml", name: "강제도어잠금(ml)" },
		],
		duct: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_open", name: "덕트오픈(open)" },
			{ value: "device_state_lock", name: "덕트잠금(lock)" },
			{ value: "manage_state_mo", name: "강제덕트오픈(mo)" },
			{ value: "manage_state_ml", name: "강제덕트잠금(ml)" },
		],
		generator: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{
				value: "device_state_battery_max",
				name: "배터리공급완료(battery_max)",
			},
			{
				value: "device_state_starter_finish",
				name: "스타터완료(starter_finish)",
			},
			{ value: "device_state_repaired", name: "수리완료(repaired)" },
			{
				value: "device_state_repaired_all",
				name: "전체수리완료(repaired_all)",
			},
			{ value: "manage_state_mbm", name: "강제배터리공급(mbm)" },
			{ value: "manage_state_msf", name: "강제스타터완료(msf)" },
			{ value: "manage_state_mr", name: "강제수리완료(mr)" },
			{ value: "manage_state_mra", name: "강제전체수리(mra)" },
		],
		escapemachine: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_escape", name: "탈출완료(escape)" },
			{ value: "manage_state_me", name: "강제탈출완료(me)" },
		],
		temple: [
			{ value: "명령어", name: "명령어" },
			{ value: "game_state_S", name: "세팅(S)" },
			{ value: "game_state_R", name: "준비(R)" },
			{ value: "game_state_A", name: "활성화(A)" },
			{ value: "device_state_check", name: "장치 확인(check)" },
			{ value: "device_state_takenchip+1", name: "생명칩+1" },
			{ value: "device_state_takenchip-1", name: "생명칩-1" },
			{ value: "device_state_takenchip_max", name: "술래승리(takenchip_max)" },
			{ value: "manage_state_mtm", name: "강제술래승리(mtm)" },
		],
	};

	const device_change = (e) => {
		setDevice_name(e.target.value);
		console.log(e.target.value);
	};
	const command_change = (e) => {
		setCommand(e.target.value);
		console.log(e.target.value);
	};

	async function send_device_command(device) {
		await axios
			.post("/api/update/dropdown", {
				theme: "cyberpunk",
				device_type: device,
				device_name: device_name,
				command: command,
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function dropdown_make(device, command, device_list, command_list) {
		if ((device_list[device] && command_list[device]) !== undefined) {
			let my_device_list = device_list[device];
			let my_command_list = command_list[device];
			switch (command) {
				case "select":
					return (
						<div>
							<select style={{ fontSize: "10px" }} onChange={device_change}>
								{my_device_list.map((option) => (
									<option key={option.value} value={option.value}>
										{option.name}
									</option>
								))}
							</select>
							<br />
							<select style={{ fontSize: "10px" }} onChange={command_change}>
								{my_command_list.map((option) => (
									<option key={option.value} value={option.value}>
										{option.name}
									</option>
								))}
							</select>
							<button
								style={{ border: "none" }}
								onClick={() => {
									send_device_command(device);
								}}
							>
								제출
							</button>
						</div>
					);
				default:
					break;
			}
		}
	}
	return (
		<div>
			{dropdown_make(
				props.device,
				props.command,
				select_device,
				select_command
			)}
		</div>
	);
};
export default MYDropdownDeviceControl;
