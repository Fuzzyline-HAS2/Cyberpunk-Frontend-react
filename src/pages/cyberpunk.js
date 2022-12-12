import React, { Component } from 'react';
import axios from "axios";
import Badge from 'react-bootstrap/esm/Badge';
import Button from 'react-bootstrap/Button';

import './css/cyberpunk.css'
import './css/text.css'

import DeviceInfo from './component_cyberpunk/device_info';
import MYDropdownDeviceControl from './component_cyberpunk/dropdown_device_control';
import Control from './component_cyberpunk/control';

class Cyberpunk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temple: [],
            revivalmachine: [],
            itembox: [],
            generator: [],
            escapemachine: [],
            duct: [],
            tagmachine: [],
            temple_info: [],
            revivalmachine_info: [],
            itembox_info: [],
            generator_info: [],
            escapemachine_info: [],
            duct_info: [],
            tagmachine_info: []
        };
    }
    async componentDidMount() {
        let temple = [];
        let revivalmachine = [];
        let itembox = [];
        let generator = [];
        let escapemachine = [];
        let duct = [];
        let tagmachine = [];
        setInterval(async () => {
            let data = await axios.get('/api/DB_cyberpunk');
            if (data.data.length !== 0) {
                data = data.data
                // console.log(data)
                data.device.map(function (x) {
                    switch (x.device_type) {
                        case "temple":
                            temple = temple.concat(x);
                            break;
                        case "revivalmachine":
                            revivalmachine = revivalmachine.concat(x);
                            break;
                        case "itembox":
                            itembox = itembox.concat(x);
                            break;
                        case "generator":
                            generator = generator.concat(x);
                            break;
                        case "escapemachine":
                            escapemachine = escapemachine.concat(x);
                            break;
                        case "duct":
                            duct = duct.concat(x);
                            break;
                        case "tagmachine":
                            tagmachine = tagmachine.concat(x);
                            break;
                    }
                });
                this.setState({
                    temple_info: data.temple,
                    revivalmachine_info: data.revivalmachine,
                    itembox_info: data.itembox,
                    generator_info: data.generator,
                    escapemachine_info: data.escapemachine,
                    duct_info: data.duct,
                    tagmachine_info: data.tagmachine,
                    temple: temple,
                    revivalmachine: revivalmachine,
                    itembox: itembox,
                    generator: generator,
                    escapemachine: escapemachine,
                    duct: duct,
                    tagmachine: tagmachine
                })
                // console.log(this.state.temple_info);
                // console.log(this.state.revivalmachine_info);
                // console.log(this.state.itembox_info);
                // console.log(this.state.generator_info);
                // console.log(this.state.escapemachine_info);
                // console.log(this.state.duct_info);
                // console.log(this.state.tagmachine_info);
                // console.log(this.state.temple);
                // console.log(this.state.revivalmachine);
                // console.log(this.state.itembox);
                // console.log(this.state.generator);
                // console.log(this.state.escapemachine);
                // console.log(this.state.duct);
                // console.log(this.state.tagmachine);
                temple = [];
                revivalmachine = [];
                itembox = [];
                generator = [];
                escapemachine = [];
                duct = [];
                tagmachine = [];
            }
        }, 1000);
    }
    /**
    * @brief 리렌더링을 위한 함수
    */
    async refresh() {
        await axios.get('/api/cyberpunk_refresh_request');
    }
    /**
    * @brief iot제외한 전체 장치 제어버튼을 위한 함수  (all)
    * @param purpose 버튼을 누르는 목적 reset,S,R,A 등
    */
    async all_except_iot(purpose) {
        if(purpose === 'reset'){
            await axios.post('/api/reset', {
                theme: 'cyberpunk',
                device: 'all_except_iot',
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if(purpose === 'S'||purpose === 'R'||purpose === 'A'){
            await axios.post('/api/update', {
                theme: 'cyberpunk',
                device: 'all_except_iot',
                state: purpose
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    /**
    * @brief iot제외한 장치 부분 전체를 제어하는 버튼을 위한 함수 (장치별로: 아이템박스,부활장치 등)
    * @param device 장치이름 (아이템박스, 부활장치 등)
    * @param purpose 버튼을 누르는 목적 reset,S,R,A 등
    */
    async device_except_iot(device,purpose) {
        if(purpose === 'reset'){
            await axios.post('/api/reset', {
                theme: 'cyberpunk',
                device: device,
                state: 'reset'
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else if(purpose === 'S'||purpose === 'R'||purpose === 'A'){
            await axios.post('/api/update', {
                theme: 'cyberpunk',
                device: device,
                state: purpose
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
        /**
        * @brief iot제외한 장치 전체를 보여주는 함수 (장치별로: 아이템박스,부활장치 등)
        * @param device 장치이름 (아이템박스, 부활장치 등)
        * @param device_info 그 장치의 정보 배열
        */
        function place_check(device, device_info) {
            let bar = [];
            let house = [];
            let gun_shop = [];
            let office = [];
            let food_court = [];
            let bar_info = [];
            let house_info = [];
            let gun_shop_info = [];
            let office_info = [];
            let food_court_info = [];
            if (device.length !== 0 && device_info.length !== 0) {
                device.map(x => {
                    switch (x.device_name.charAt(0)) {
                        case 'B':
                            bar = bar.concat(x);
                            break;
                        case 'H':
                            house = house.concat(x);
                            break;
                        case 'G':
                            gun_shop = gun_shop.concat(x);
                            break;
                        case 'O':
                            office = office.concat(x);
                            break;
                        case 'F':
                            food_court = food_court.concat(x);
                            break;
                    }
                })
                device_info.map(x => {
                    switch (x.device_name.charAt(0)) {
                        case 'B':
                            bar_info = bar_info.concat(x);
                            break;
                        case 'H':
                            house_info = house_info.concat(x);
                            break;
                        case 'G':
                            gun_shop_info = gun_shop_info.concat(x);
                            break;
                        case 'O':
                            office_info = office_info.concat(x);
                            break;
                        case 'F':
                            food_court_info = food_court_info.concat(x);
                            break;
                    }
                })
                // console.log(bar)
                // console.log(house)
                // console.log(gun_shop)
                // console.log(office)
                // console.log(food_court)
                // console.log(bar_info)
                // console.log(house_info)
                // console.log(gun_shop_info)
                // console.log(office_info)
                // console.log(food_court_info)
                return <div className='device_device_wrapper'>
                    <div className='device_device_bar'>
                        <DeviceInfo place={bar} place_info={bar_info} />
                    </div>
                    <div className='device_device_house'>
                        <DeviceInfo place={house} place_info={house_info} />
                    </div>
                    <div className='device_device_gun_shop'>
                        <DeviceInfo place={gun_shop} place_info={gun_shop_info} />
                    </div>
                    <div className='device_device_office'>
                        <DeviceInfo place={office} place_info={office_info} />
                    </div>
                    <div className='device_device_food_court'>
                        <DeviceInfo place={food_court} place_info={food_court_info} />
                    </div>
                </div>
            }
        }
        /**
        * @brief iot제외한 장치 전체를 보여주는 함수 (장치별로: 아이템박스,부활장치 등)
        * @param device 장치이름 (아이템박스, 부활장치 등)
        * @param device_except_iot iot제외한 장치 부분 전체를 제어하는 버튼을 위한 함수 (장치별로: 아이템박스,부활장치 등)
        */
        function control(device,device_except_iot) {
            switch (device) {
                case 'itembox':
                    return <Badge bg="bdg">
                        <span>아이템박스[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('itembox', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('itembox', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('itembox', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('itembox', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'revivalmachine':
                    return <Badge bg="bdg">
                        <span>부활장치[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('revivalmachine', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('revivalmachine', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('revivalmachine', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('revivalmachine', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'tagmachine':
                    return <Badge bg="bdg">
                        <span>태그머신[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('tagmachine', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('tagmachine', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('tagmachine', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('tagmachine', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'duct':
                    return <Badge bg="bdg">
                        <span>덕트[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('duct', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('duct', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('duct', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('duct', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'generator':
                    return <Badge bg="bdg">
                        <span>발전기[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('generator', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('generator', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('generator', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('generator', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'escapemachine':
                    return <Badge bg="bdg">
                        <span>탈출장치[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('escapemachine', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('escapemachine', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('escapemachine', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('escapemachine', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>
                case 'temple':
                    return <Badge bg="bdg">
                        <span>제단[{device}]</span><br />
                        <Button variant="danger" size='reset' onClick={() => { device_except_iot('temple', 'reset') }}>device reset</Button>
                        <Button variant="light" size='SRA' onClick={() => { device_except_iot('temple', 'S') }}>S</Button>
                        <Button variant="danger" size='SRA' onClick={() => { device_except_iot('temple', 'R') }}>R</Button>
                        <Button variant="warning" size='SRA' onClick={() => { device_except_iot('temple', 'A') }}>A</Button><br />
                        <MYDropdownDeviceControl device={device} command='select' />
                    </Badge>

            }

        }
        return (
            <>  
                <style type="text/css">
                    {`
                .btn-reset {
                    padding: 0px 1px;
                    font-size: 11px;
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
                <div className='wrapper'>
                    <div className='main'>
                        <h1>Cyberpunk</h1>
                        <button onClick={this.refresh} style={{ position: 'absolute', top: '40px', left: '450px' }}>새로고침</button>
                    </div>
                    <div className='controler'>
                        <div className='controler_wrapper'>
                            <Control itembox_info = {this.state.itembox_info} revivalmachine_info = {this.state.revivalmachine_info} tagmachine_info = {this.state.tagmachine_info} duct_info = {this.state.duct_info} generator_info = {this.state.generator_info} escapemachine_info = {this.state.escapemachine_info} temple_info = {this.state.temple_info}/>
                        </div>
                    </div>
                    <div className='device'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                <Badge bg='light' text="dark">all -</Badge>
                                <Button variant="danger" size='reset' onClick={() => { this.all_except_iot('reset') }}>reset</Button>
                                <Button variant="light" size='SRA' onClick={() => { this.all_except_iot('S') }}>S</Button>
                                <Button variant="danger" size='SRA' onClick={() => { this.all_except_iot('R') }}>R</Button>
                                <Button variant="warning" size='SRA' onClick={() => { this.all_except_iot('A') }}>A</Button><br />
                            </div>
                            <div className='device_bar'>바</div>
                            <div className='device_house'>하우스</div>
                            <div className='device_gun_shop'>건샵</div>
                            <div className='device_office'>오피스</div>
                            <div className='device_food_court'>푸드코트</div>
                        </div>
                    </div>
                    <div className='itembox'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('itembox',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.itembox, this.state.itembox_info)}
                            </div>
                        </div>
                    </div>
                    <div className='revivalmachine'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('revivalmachine',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.revivalmachine, this.state.revivalmachine_info)}
                            </div>
                        </div>
                    </div>
                    <div className='tagmachine'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('tagmachine',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.tagmachine, this.state.tagmachine_info)}
                            </div>
                        </div>
                    </div>
                    <div className='duct'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('duct',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.duct, this.state.duct_info)}
                            </div>
                        </div>
                    </div>
                    <div className='generator'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('generator',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.generator, this.state.generator_info)}
                            </div>
                        </div>
                    </div>
                    <div className='escapemachine'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('escapemachine',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.escapemachine, this.state.escapemachine_info)}
                            </div>
                        </div>
                    </div>
                    <div className='temple'>
                        <div className='device_wrapper'>
                            <div className='device_control'>
                                {control('temple',this.device_except_iot)}
                            </div>
                            <div className='device_device'>
                                {place_check(this.state.temple, this.state.temple_info)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};


export default Cyberpunk;