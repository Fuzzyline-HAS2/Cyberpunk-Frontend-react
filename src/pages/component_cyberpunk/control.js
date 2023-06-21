import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Narration from "./narration.js";

let time_control = null;
/**
 * @brief 게임 진행을 조작하는 컴포넌트
 */
const Control = (props) => {
	const [timer, setTimer] = useState(2101);
	const language = [
		{ value: "KO", name: "한국어" },
		{ value: "EN", name: "영어" },
	];
	const [selected_language, setSelectedLanguage] = useState("");
	const [game_start_show, setGameStartShow] = useState(false);
	const [timer_reset_show, setTimerResetShow] = useState(false);
	const revival = [
		"BR1",
		"BR2",
		"HR1",
		"HR2",
		"GR1",
		"GR2",
		"OR1",
		"OR2",
		"FR1",
		"FR2",
	];
	const [revival_order, setRevivalOrder] = useState([]);
	let revival_list = [];

	const game_startClose = () => setGameStartShow(false);
	const game_startShow = () => setGameStartShow(true);
	const timer_resetClose = () => setTimerResetShow(false);
	const timer_resetShow = () => setTimerResetShow(true);

	async function time_control_func() {
		let time = await axios
			.post("/api/timer", {
				theme: "cyberpunk",
				timer_name: "playtime",
				command: "start",
			})
			.catch(function (error) {
				console.log(error);
			});
		setTimer(time.data[0].sec);
	}
	/**
	 * @brief 타이머를 컨트롤하는 버튼들 제어 함수
	 * @param timer_name 타이머 종류
	 * @param command 타이머 제어 명령어
	 */
	const timer_control = async (timer_name, command) => {
		if (command === "start") {
			if (time_control === null) {
				time_control = setInterval(time_control_func, 1000);
			}
		} else if (command === "stop") {
			clearInterval(time_control);
			time_control = null;
			await axios
				.post("/api/timer", {
					theme: "cyberpunk",
					timer_name: timer_name,
					command: command,
				})
				.catch(function (error) {
					console.log(error);
				});
		} else if (command === "reset") {
			clearInterval(time_control);
			time_control = null;
			let time = await axios
				.post("/api/timer", {
					theme: "cyberpunk",
					timer_name: timer_name,
					command: command,
				})
				.catch(function (error) {
					console.log(error);
				});
			setTimer(time.data[0].sec);
			setTimerResetShow(false);
		} else {
			if (command !== "+60" || timer < 2040) {
				let time = await axios
					.post("/api/timer", {
						theme: "cyberpunk",
						timer_name: timer_name,
						command: command,
					})
					.catch(function (error) {
						console.log(error);
					});
				setTimer(time.data[0].sec);
			} else {
				console.log("불가능");
			}
		}
	};
	/**
	 * @brief game start 버튼을 누르면 카운트다운 시작하는 함수 1초마다 반복됨
	 */
	const game_start = async () => {
		let time = await axios
			.post("/api/timer", {
				theme: "cyberpunk",
				timer_name: "playtime",
				command: "game_start",
			})
			.catch(function (error) {
				console.log(error);
			});
		setTimer(time.data[0].sec);
		if (time_control === null) {
			time_control = setInterval(time_control_func, 1000);
		}
		setGameStartShow(false);
	};
	/**
	 * @brief iot제외 모든장치 목적에따라 상태 변경해주는 함수
	 * @param purpose 버튼을 누르는 목적 S,R
	 */
	const button_all_device = async (purpose) => {
		if (purpose === "check") {
			await axios
				.post("/api/check", {
					theme: "cyberpunk",
					device: "all_except_iot",
					state: purpose,
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			await axios
				.post("/api/update", {
					theme: "cyberpunk",
					device: "all_except_iot",
					state: purpose,
				})
				.catch(function (error) {
					console.log(error);
				});
			if (purpose === "R") {
				//생명장치 활성화 순서 DB에 저장
				revival_list = [];
				let order = 0;
				while (revival_list.length < 10) {
					let num = Math.floor(Math.random() * 10);
					if (!revival_list.includes(revival[num])) {
						revival_list.push(revival[num]);
						await axios
							.post("/api/update", {
								theme: "cyberpunk",
								device: "revivalmachine",
								name: revival[num],
								num: order,
								command: "activate_num",
							})
							.catch(function (error) {
								console.log(error);
							});
						order++;
					}
				}
				setRevivalOrder(revival_list);
			} else if (purpose === "S") {
				//전체 장치 세팅할때 DB 리셋툄.
				await axios
					.post("/api/reset", {
						theme: "cyberpunk",
						device: "all_except_iot",
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	};
	/**
	 * @brief timer를 계산해서 출력해주는 함수
	 */
	function timer_calculate() {
		let sec = timer % 60;
		if (timer < 0) {
			setTimer(0);
			clearInterval(time_control);
			time_control = null;
		}
		if (0 <= sec && sec < 10) {
			return (
				<p className='timer_number_font'>
					{parseInt(timer / 60)}:0{timer % 60}
				</p>
			);
		} else {
			return (
				<p className='timer_number_font'>
					{parseInt(timer / 60)}:{timer % 60}
				</p>
			);
		}
	}
	const handleSelectLanguage = (e) => {
		setSelectedLanguage(e.target.value);
		onChangeLanguage(e.target.value);
	};
	const onChangeLanguage = async (lang) => {
		localStorage.setItem("language", JSON.stringify(lang));
		await axios
			.post("/api/update/selected_language", {
				lang: lang,
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	React.useEffect(() => {
		const lastSelected = JSON.parse(localStorage.getItem("language") ?? "[]");
		setSelectedLanguage(lastSelected);
	}, []);

	return (
		<>
			<style type='text/css'>
				{`
                    .btn-game_check {
                        padding: 6px 68px;
                        font-size: 14px;
                    }
                    .btn-game_setting {
                        padding: 6px 36px;
                        font-size: 14px;
                    }
                    .btn-game_ready {
                        padding: 6px 60px;
                        font-size: 14px;
                    }
                    .btn-game_start {
                        padding: 11px 56px;
                        font-size: 20px;
                        margin: 0px 0px 0px 0px
                    }
                    .bg-bdg {
                        background-color: light;
                        color: black;
                    }
                    .btn-SRA {
                    padding: 0px 10px ;
                    font-size: 11px;
                    }
                `}
			</style>
			<div className='controler_timer'>
				<p
					style={{
						fontSize: "11px",
						margin: "0px 0px -5px 0px",
						textAlign: "center",
						backgroundColor: "rgba(255, 255, 0, 0.7)",
					}}
				>
					게임도중 [F5 or 페이지 새로고침]시 타이머 돌아가고있는지 확인.
				</p>
				<br />
				<p
					style={{
						fontSize: "11px",
						margin: "0px 0px -5px -70px",
						textAlign: "center",
						backgroundColor: "rgba(255, 255, 0, 0.7)",
						position: "absolute",
						top: "100px",
						left: "100px",
					}}
				>
					타이머 멈춰있으면 타이머 새로고침 -&gt; 타이머 시작 다시 눌러주기.
				</p>
				<p style={{ fontSize: "20px", margin: "0px 0px -20px 10px" }}>
					play time : 35:00
				</p>
				<div
					style={{
						position: "absolute",
						top: "125px",
						left: "290px",
						textAlign: "center",
					}}
				>
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "8px" }}
						onClick={() => {
							timer_control("playtime", "reload");
						}}
					>
						새로고침
					</Button>
					<br />
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "8px" }}
						onClick={timer_resetShow}
					>
						초기화
					</Button>
					<br />
					<Modal
						show={timer_reset_show}
						onHide={timer_resetClose}
						animation={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>타이머 초기화 버튼 입력 감지</Modal.Title>
						</Modal.Header>
						<Modal.Body>타이머를 정말로 초기화 하시겠습니까?</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={timer_resetClose}>
								취소
							</Button>
							<Button
								variant='primary'
								onClick={() => {
									timer_control("playtime", "reset");
								}}
							>
								초기화
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				{timer_calculate()}
				<div
					style={{
						position: "absolute",
						top: "125px",
						left: "350px",
						textAlign: "center",
					}}
				>
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "12px", margin: "0px 0px 1px 0px" }}
						onClick={() => {
							timer_control("playtime", "start");
						}}
					>
						타이머 시작
					</Button>
					<br />
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "12px", margin: "0px 0px 1px 0px" }}
						onClick={() => {
							timer_control("playtime", "stop");
						}}
					>
						타이머 정지
					</Button>
					<br />
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "12px", margin: "0px 0px 1px 0px" }}
						onClick={() => {
							timer_control("playtime", "+60");
						}}
					>
						1분 추가
					</Button>
					<br />
					<Button
						variant='outline-dark'
						size='sm'
						style={{ fontSize: "12px", margin: "0px 0px 1px 0px" }}
						onClick={() => {
							timer_control("playtime", "-30");
						}}
					>
						30초 감소
					</Button>
				</div>
			</div>
			<div className='controler_game_start'>
				<Button
					variant='info'
					size='game_check'
					onClick={() => {
						button_all_device("check");
					}}
				>
					전체 장치 확인
				</Button>
				<Button
					variant='light'
					size='game_setting'
					onClick={() => {
						button_all_device("S");
					}}
				>
					1. 전체 장치 리셋 & 세팅
				</Button>
				<Button
					variant='danger'
					size='game_ready'
					onClick={() => {
						button_all_device("R");
					}}
				>
					2. 전체 장치 준비
				</Button>
				<Button variant='success' size='game_start' onClick={game_startShow}>
					GAME START
				</Button>
				<select onChange={handleSelectLanguage} value={selected_language}>
					{language.map((item) => (
						<option value={item.value} key={item.value}>
							{item.name}
						</option>
					))}
				</select>
				<Modal
					show={game_start_show}
					onHide={game_startClose}
					animation={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>GAME START 버튼 입력 감지</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						게임을 시작하시겠습니까? OS 리셋버튼을 눌러주세요.
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={game_startClose}>
							취소
						</Button>
						<Button variant='primary' onClick={game_start}>
							게임 시작
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<Narration
				time={timer}
				revival_order={revival_order}
				device_info={props}
				timer_control={timer_control}
			/>
		</>
	);
};

export default Control;
