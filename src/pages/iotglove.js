import React, { Component } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./css/iotglove.css";
import "./css/text.css";
import "./css/badge.css";

import Group from "./component_iot/group";
import ThemeControl from "./component_iot/theme_control";

class Iotglove extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			iotglove: [],
			iotglove_info: [],
			group1: [],
			group2: [],
			group3: [],
			group4: [],
			group1_info: [],
			group2_info: [],
			group3_info: [],
			group4_info: [],
			group_key1: "group1",
			group_key2: "group2",
			group_key3: "group3",
			group_key4: "group4",
		};
	}
	async componentDidMount() {
		let group1 = [];
		let group2 = [];
		let group3 = [];
		let group4 = [];
		setInterval(async () => {
			let data = await axios.get("/api/DB_iotglove");
			if (data.data.length !== 0) {
				data = data.data;
				console.log(data);
				data.device.map((x) => {
					if (x["device_name"].includes("G1")) {
						group1 = group1.concat(x);
					} else if (x["device_name"].includes("G2")) {
						group2 = group2.concat(x);
					} else if (x["device_name"].includes("G3")) {
						group3 = group3.concat(x);
					} else if (x["device_name"].includes("G4")) {
						group4 = group4.concat(x);
					}
				});
				this.setState({
					group1: group1,
					group2: group2,
					group3: group3,
					group4: group4,
					group1_info: data.g1,
					group2_info: data.g2,
					group3_info: data.g3,
					group4_info: data.g4,
				});
				// console.log(this.state.group1)
				// console.log(this.state.group2)
				// console.log(this.state.group3)
				// console.log(this.state.group4)
				// console.log(this.state.group1_info)
				// console.log(this.state.group2_info)
				// console.log(this.state.group3_info)
				// console.log(this.state.group4_info)
				group1 = [];
				group2 = [];
				group3 = [];
				group4 = [];
			}
		}, 1000);
	}
	/**
	 * @brief 리렌더링을 위한 함수
	 */
	async refresh() {
		await axios.get("/api/iotglove_refresh_request");
	}

	render() {
		return (
			<>
				<div className='wrapper'>
					<div className='header'>
						<h1>Badland_IoT글러브</h1>
						<button
							onClick={this.refresh}
							style={{ position: "absolute", top: "40px", left: "450px" }}
						>
							새로고침
						</button>
					</div>
					<div className='iotglove'>
						<div className='iotglove_wrapper'>
							<div className='iotglove_control'>컨트롤</div>
							<div className='iotglove_group1'>
								<Tabs
									id='group1'
									activeKey={this.state.group_key1}
									onSelect={(k) => this.setState({ group_key1: k })}
									className='mb-3'
								>
									<Tab eventKey='group1' title='Group1'>
										<Group
											group={this.state.group1}
											group_info={this.state.group1_info}
										/>
									</Tab>
									<Tab eventKey='skill' title='Skill'></Tab>
								</Tabs>
							</div>
							<div className='iotglove_group2'>
								<Tabs
									id='group2'
									activeKey={this.state.group_key2}
									onSelect={(k) => this.setState({ group_key2: k })}
									className='mb-3'
								>
									<Tab eventKey='group2' title='Group2'>
										<Group
											group={this.state.group2}
											group_info={this.state.group2_info}
										/>
									</Tab>
									<Tab eventKey='skill' title='Skill'></Tab>
								</Tabs>
							</div>
							<div className='iotglove_group3'>
								<Tabs
									id='group3'
									activeKey={this.state.group_key3}
									onSelect={(k) => this.setState({ group_key3: k })}
									className='mb-3'
								>
									<Tab eventKey='group3' title='Group3'>
										<Group
											group={this.state.group3}
											group_info={this.state.group3_info}
										/>
									</Tab>
									<Tab eventKey='skill' title='Skill' disabled></Tab>
								</Tabs>
							</div>
							<div className='iotglove_group4'>
								<Tabs
									id='group4'
									activeKey={this.state.group_key4}
									onSelect={(k) => this.setState({ group_key4: k })}
									className='mb-3'
								>
									<Tab eventKey='group4' title='Group4'>
										<Group
											group={this.state.group4}
											group_info={this.state.group4_info}
										/>
									</Tab>
									<Tab eventKey='skill' title='Skill' disabled></Tab>
								</Tabs>
							</div>
							<div className='iotglove_theme_control'>
								<div className='iotglove_theme_control_wrapper'>
									<ThemeControl />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
export default Iotglove;
