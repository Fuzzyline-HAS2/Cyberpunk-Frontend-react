import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Narration = (props) => {
	const [itemused, setItemUsed] = useState(0);
	const [generatorrepaired, setGeneratorRepaired] = useState(0);
	const [revivalused, setRevivalUsed] = useState(0);
	const [templetakenchip, setTempleTakenChip] = useState(0);
	const [escapeescape, setEscapeEscape] = useState(0);
	const [taggerActivate, setTaggerActivate] = useState("");
	const [gamegroup, setGameGroup] = useState("non");
	const [player, setPlayer] = useState(0);
	const [selfrevivalstart, setSelfRevivalStart] = useState(0);
	const [selfreviveshow, setSelfReviveShow] = useState(false);
	const handleClose = () => setSelfReviveShow(false);
	const handleShow = () => setSelfReviveShow(true);

	const [rescueCount, setRescueCount] = useState(0);
	const [rescueState, setRescueState] = useState(false);

	/**
	 * @brief time에 따라 내레이션을 결정해주는 함수
	 */
	const narration_time = (time, revival) => {
		console.log(time);
		if (revival !== undefined) {
			if (revival.length !== 0) {
				let revival_order = revival.map((x) => [x.activate_num, x.device_name]);
				revival_order.sort();
				// console.log('revival_order:',revival_order)
				switch (time) {
					case 2099:
						narration(1, 1); //0001 VO1 하이드앤시크 프로젝트에 오신 것을 환영합니다. 모든 플레이어는 진입해주십시오
						break;
					case 2095:
						narration(1, 2); //0002 VO2 술래의 등장 이전까지는 문을 제외한 장치의 사용이 불가합니다, 지형지물과 장치의 위치를 파악하십시오
						break;
					case 2090:
						narration(1, 3); //0003 VO3 술래는 랜덤한 플레이어로 결정됩니다, 모두 흩어져 서로를 경계하십시오
						break;
					case 2050:
						narration(1, 55); //0055 VO47 술래결정전까지는 장치이용안됩니다 빨간색이면 쓰면 안됨
						break;
					case 1983:
						narration(1, 63); //0063 VO55 1분후 술래가 결정됩니다 (2)
						break;
					case 1953:
						narration(1, 4); //0004 VO4 술래 결정까지 30초 남았습니다,
						break;
					case 1929:
						narration(1, 5); //0005 VO5 술래 결정 5초전, 4초, 3초, 2초, 1초
						break;
					case 1921:
						narration(1, 56); //0056 VO48 술래가 결정되었습니다. 술래는 제단으로 가 글러브를 활성시켜 주세요
						//술래 iot글러브 정상상태는 iotglove 코드에 있음.
						break;
					case 1920:
						narration(1, 31); //0031 VO24 생명장치 활성화
						iotglove_activate("tagger_blink");
						break;
					case 1919:
						device_activate("itembox", "");
						device_activate("tagmachine", "");
						device_activate("duct", "");
						device_activate("temple", "");
						device_activate("revivalmachine", revival_order[0][1]);
						device_activate("revivalmachine", revival_order[1][1]);
						device_activate("revivalmachine", revival_order[2][1]);
						break;
					case 1740:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 1739:
						device_activate("revivalmachine", revival_order[3][1]);
						console.log(revival_order[3][1]);
						break;
					case 1560:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 1559:
						device_activate("revivalmachine", revival_order[4][1]);
						console.log(revival_order[4][1]);
						break;
					case 1380:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 1379:
						device_activate("revivalmachine", revival_order[5][1]);
						console.log(revival_order[5][1]);
						break;
					case 1200:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 1199:
						device_activate("revivalmachine", revival_order[6][1]);
						console.log(revival_order[6][1]);
						break;
					case 1020:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 1019:
						device_activate("revivalmachine", revival_order[7][1]);
						console.log(revival_order[7][1]);
						break;
					case 840:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 839:
						device_activate("revivalmachine", revival_order[8][1]);
						console.log(revival_order[8][1]);
						break;
					case 660:
						narration(1, 31); //0031 VO24 생명장치 활성화
						break;
					case 659:
						device_activate("revivalmachine", revival_order[9][1]);
						console.log(revival_order[9][1]);
						break;
					case 3:
						narration(1, 16); //0016 VO14 탈출제한시간이 끝났습니다, 술래가 승리하였습니다
						break;
					case 2:
						narration(1, 61); //0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요
						break;
					case 1:
						game_over("player_lose");
						device_ready("tagmachine", "");
						break;
				}
			}
		}
	};

	const itembox = (itembox) => {
		let used = 0;
		if (itembox !== undefined) {
			itembox.map((x) => {
				if (x["device_state"] === "used") {
					used++;
				}
			});
			if (used !== itemused) {
				setItemUsed(used);
			}
		}
	};
	const generator = (generator) => {
		let repaired = 0;
		// console.log(generator)
		if (generator !== undefined) {
			generator.map((x) => {
				if (x["device_state"] === "repaired") {
					repaired++;
				}
			});
			// console.log(repaired)
			if (repaired !== generatorrepaired) {
				switch (repaired) {
					case 1:
						console.log("1개 수리");
						narration(3, 3); //0003 VO38 남은 전원공급장치는 2개 입니다
						left_generator(-1);
						setGeneratorRepaired(repaired);
						break;
					case 2:
						console.log("2개 수리");
						narration(3, 2); //0002 VO37 남은 전원공급장치는 1개 입니다
						left_generator(-1);
						setGeneratorRepaired(repaired);
						break;
					case 3:
						console.log("3개 수리");
						narration(3, 1); //0001 VO22 모든 전원공급장치의 수리가 완료되었습니다.
						left_generator(-1);
						setGeneratorRepaired(repaired);
						break;
				}
				if (repaired >= 3) {
					narration(1, 30); //0030 VO23 탈출장치가 활성화 됩니다.
					device_activate("escapemachine", "");
				}
			}
		}
	};
	const revivalmachine = (revivalmachine) => {
		let used = 0;
		if (revivalmachine !== undefined) {
			revivalmachine.map((x) => {
				if (x["device_state"] === "used") {
					used++;
				}
			});
			if (used !== revivalused) {
				setRevivalUsed(used);
			}
		}
	};
	const escapemachine = (escapemachine) => {
		let escape = 0;
		if (escapemachine !== undefined) {
			escapemachine.map((x) => {
				if (x["device_state"] === "escape") {
					escape++;
				}
			});
			if (escape !== escapeescape) {
				console.log("탈출");
				if (escape > 0) {
					narration(1, 32); //0032 VO25 탈출에 성공하였습니다. 생존자가 승리하였습니다.
					game_over("player_win");
					device_ready("tagmachine", "");
					setTimeout(function () {
						narration(1, 61); //0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요
					}, 1000);
				}
				props.timer_control("playtime", "stop");
				// timer_stop('playtime','setting');
				setEscapeEscape(escape);
			}
		}
	};
	const temple = (temple) => {
		let takenchip = 0;
		if (temple !== undefined) {
			if (temple.length !== 0) {
				if (
					temple[0]["device_state"] === "activate" &&
					temple[0]["device_state"] !== taggerActivate
				) {
					setTaggerActivate("activate");
					device_activate("generator", "");
					device_activate("chair", "");
					narration(1, 59); //0059 VO51 술래의 글러브가 활성화 되었습니다. 술래가 활동을 시작합니다.
				}
				if(temple[1]["device_state"] === "rescue" && rescueState === false){
					setRescueState(true);
					setRescueCount(rescueCount + 1);
					// console.log(`rescueCount : ${rescueCount + 1}`);
				}
				if(temple[1]["device_state"] !== "rescue" && rescueState === true){
					setRescueState(false);
				}
				if(temple[1]["device_state"] === "setting" && rescueCount > 0){
					setRescueCount(0);
					setRescueState(false);
				}
				if (temple[0]["taken_chip"] !== templetakenchip) {
					takenchip = temple[0]["taken_chip"];
					setTempleTakenChip(takenchip);
					switch (10 - takenchip) {
						case 9:
							narration(2, 9); //0009 한명의 생존자가 사망하였습니다, 남은 생명은 9개 입니다.					
							break;
						case 8:
							narration(2, 8); //0008 한명의 생존자가 사망하였습니다, 남은 생명은 8개 입니다.
							break;
						case 7:
							narration(2, 7); //0007 한명의 생존자가 사망하였습니다, 남은 생명은 7개 입니다.
							break;
						case 6:
							narration(2, 6); //0006 한명의 생존자가 사망하였습니다, 남은 생명은 6개 입니다.
							break;
						case 5:
							narration(2, 5); //0005 한명의 생존자가 사망하였습니다, 남은 생명은 5개 입니다.
							break;
						case 4:
							narration(2, 4); //0004 한명의 생존자가 사망하였습니다, 남은 생명은 4개 입니다.
							break;
						case 3:
							narration(2, 3); //0003 한명의 생존자가 사망하였습니다, 남은 생명은 3개 입니다.
							break;
						case 2:
							narration(2, 2); //0002 한명의 생존자가 사망하였습니다, 남은 생명은 2개 입니다.
							break;
						case 1:
							narration(2, 1); //0001 한명의 생존자가 사망하였습니다, 남은 생명은 1개 입니다.
							break;
						case 0: //술래승리
							narration(1, 15); //0015 VO13 제단이 활성화 되었습니다. 술래가 승리하였습니다.
							game_over("player_lose");
							device_ready("tagmachine", "");
							props.timer_control("playtime", "stop");
							setTimeout(function () {
								narration(1, 61); //0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요
							}, 1000);
							break;
					}
				}
			}
		}
	};
	const left_generator = async (value) => {
		await axios
			.post("/api/update", {
				theme: "cyberpunk",
				device: "generator",
				value: value,
				command: "left_generator",
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const narration = async (folder_num, file_num) => {
		await axios
			.post("/api/narration", {
				theme: "cyberpunk",
				device: "mp3",
				folder_num: folder_num,
				file_num: file_num,
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const device_activate = async (device_type, device_name) => {
		await axios
			.post("/api/update/device", {
				theme: "cyberpunk",
				device_type: device_type,
				device_name: device_name,
				device_state: "activate",
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const device_ready = async (device_type, device_name) => {
		await axios
			.post("/api/update/device", {
				theme: "cyberpunk",
				device_type: device_type,
				device_name: device_name,
				device_state: "ready",
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	/**
	 * @brief 게임이 종료되었을 때 player_win & player_lose로 device_state를 변경해주는 함수
	 * @param device_state 게임이 끝났을 때 device_state
	 */
	const game_over = async (device_state) => {
		await axios
			.post("/api/update/all", {
				theme: "cyberpunk",
				device: "all",
				glove: gamegroup,
				state: device_state,
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	/**
	 * @brief iot글러브를 활성화시키는 함수
	 */
	const iotglove_activate = async (command) => {
		await axios
			.post("/api/update/iotglove", {
				theme: "cyberpunk",
				device_state: "activate",
				command: command,
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	/**
	 * @brief 부활장치 활성화 순서를 출력해줌
	 */
	const revival_activate_num = (revival) => {
		if (revival !== undefined) {
			if (revival.length !== 0) {
				let revival_order = revival.map((x) => [x.activate_num, x.device_name]);
				revival_order.sort();
				return (
					<div>
						<p className='revival_font'>
							32:00 - {revival_order[0][1]} {revival_order[1][1]}{" "}
							{revival_order[2][1]}
						</p>
						<p className='revival_font'>29:00 - {revival_order[3][1]}</p>
						<p className='revival_font'>26:00 - {revival_order[4][1]}</p>
						<p className='revival_font'>23:00 - {revival_order[5][1]}</p>
						<p className='revival_font'>20:00 - {revival_order[6][1]}</p>
						<p className='revival_font'>17:00 - {revival_order[7][1]}</p>
						<p className='revival_font'>14:00 - {revival_order[8][1]}</p>
						<p className='revival_font'>11:00 - {revival_order[9][1]}</p>
					</div>
				);
			}
		}
	};
	/**
	 * @brief 내레이션 DB를 리셋하고 게임에 필요한 변수(state)를 초기화하는 함수
	 */
	const narration_reset = async () => {
		await axios
			.post("/api/reset", {
				theme: "cyberpunk",
				device: "mp3",
				command: "mp3_reset",
			})
			.catch(function (error) {
				console.log(error);
			});
		setItemUsed(0);
		setGeneratorRepaired(0);
		setRevivalUsed(0);
		setTempleTakenChip(0);
		setEscapeEscape(0);
		setTaggerActivate("");
		setSelfRevivalStart(0);
		// setSelfRevivalEnd(-10);
	};
	const narration_problem_reset = async () => {
		await axios
			.post("/api/reset", {
				theme: "cyberpunk",
				device: "mp3",
				command: "mp3_reset",
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	/**
	 * @brief 게임하고있는 플레이어의 수 계산하는 함수
	 */
	const iotglove_cyberpunk = async () => {
		await axios.get("/api/iotglove_refresh_request");
		let iot = await axios.get("/api/DB_iotglove");
		let player = 0;
		console.log(iot.data);
		if (iot.data.device[0].theme === "cyberpunk") {
			setGameGroup("G1");
			for (let i = 0; i < iot.data.g1.length; i++) {
				if (iot.data.g1[i].role !== "neutral") {
					++player;
				}
			}
			setPlayer(player);
		} else if (iot.data.device[8].theme === "cyberpunk") {
			setGameGroup("G2");
			for (let i = 0; i < iot.data.g2.length; i++) {
				if (iot.data.g2[i].role !== "neutral") {
					++player;
				}
			}
			setPlayer(player);
		}
	};
	/**
	 * @brief 자가부활모드
	 */
	const self_revive = (templetakenchip, player, revivalused, rescueCount, time ) => {
		// console.log(`자가부활 개수 : ${player-1+revivalused + rescueCount}`);
		if (player - 1 + revivalused + rescueCount === templetakenchip) {
			//술래가 제단에 모은 칩 === 생존자수 + 부활장치 이용개수
			if (selfrevivalstart <= 0) {
				narration(1, 48); //0048 VO40 자가부활
				handleShow();
				setSelfRevivalStart(time);
				self_revive_iotglove();
			}
		}
	};
	/**
	 * @brief 강제 자가부활모드
	 */
	const forced_self_revive = (time) => {
		if (selfrevivalstart <= 0) {
			narration(1, 48); //0048 VO40 자가부활
			handleShow();
			setSelfRevivalStart(time);
			self_revive_iotglove();
		}
	};
	/**
	 * @brief 자가부활 -> iotglove에 생명칩 하나씩 넣어주기
	 */
	const self_revive_iotglove = async () => {
		await axios
			.post("/api/selfrevive/iotglove", {
				theme: "cyberpunk",
				device: "iotglove",
				group: gamegroup,
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<>
			{/* {console.log("selfrevivalstart :", selfrevivalstart)}
			{console.log("selfrevivalend :", selfrevivalend)} */}
			<style type='text/css'>
				{`
                    .btn-narration_reset {
                        padding: 6px 56px;
                        font-size: 14px;
                    }
                    .btn-player_check {
                        padding: 6px 63px;
                        font-size: 14px;
                    }
                    .btn-self_revive_button {
                        padding: 6px 71px;
                        font-size: 14px;
                    }
                `}
			</style>
			<Modal show={selfreviveshow} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>자가 부활 모드 ON</Modal.Title>
				</Modal.Header>
			</Modal>
			{narration_time(props.time, props.device_info.revivalmachine_info)}
			{itembox(props.device_info.itembox_info)}
			{generator(props.device_info.generator_info)}
			{revivalmachine(props.device_info.revivalmachine_info)}
			{temple(props.device_info.temple_info)}
			{escapemachine(props.device_info.escapemachine_info)}
			{self_revive(templetakenchip, player, revivalused, rescueCount, props.time)}{" "}
			{/* 자가부활모드 */}
			<div className='controler_narration'>
				<p style={{ margin: "0px 0px 0px 0px", textAlign: "center" }}>
					내레이션
				</p>
				<Button
					variant='secondary'
					size='narration_reset'
					onClick={narration_reset}
					style={{ margin: "0px 0px 0px 0px" }}
				>
					3. 내레이션 초기화
				</Button>
				<Button
					variant='primary'
					size='player_check'
					onClick={iotglove_cyberpunk}
					style={{ margin: "0px 0px 0px 0px" }}
				>
					4. 플레이어 확인
				</Button>
				<Button
					variant='secondary'
					size='narration_reset'
					onClick={narration_problem_reset}
					style={{ margin: "0px 0px 0px 0px" }}
				>
					mp3문제있을때
				</Button>
				<Button
					variant='warning'
					size='self_revive_button'
					onClick={() => forced_self_revive(props.time)}
					style={{ margin: "30px 0px 0px 0px" }}
				>
					강제 자가부활
				</Button>
			</div>
			<div className='controler_game_progerss'>
				<p className='progress_font_name' style={{ margin: "0px 0px 0px 0px" }}>
					게임 진행도{" "}
				</p>
				<p className='progress_font'>
					글러브 : {gamegroup}, 총 : {player}
				</p>
				<p className='progress_font'>빈 아이템박스 : {itemused}/10</p>
				<p className='progress_font'>
					수리 완료 발전기 : {generatorrepaired}/3
				</p>
				<p className='progress_font'>사용된 부활장치 : {revivalused}/10</p>
				<p className='progress_font'>제단 생명칩 개수 : {templetakenchip}/10</p>
				<p className='progress_font'>
					자가부활 시간:{" "}
					{selfrevivalstart <= 0
						? "X"
						: parseInt(selfrevivalstart / 60) + ":" + (selfrevivalstart % 60)}
				</p>
			</div>
			<div className='controler_revival_order'>
				<p className='revival_font_name'>생명장치</p>
				{revival_activate_num(props.device_info.revivalmachine_info)}
			</div>
		</>
	);
};
export default Narration;
