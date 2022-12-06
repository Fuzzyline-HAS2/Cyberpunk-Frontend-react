import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
* @brief 장치 정보를 보여주는 컴포넌트 
*/
const DeviceInfo = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ductemergency,setDuctEmergency] = useState('');
    /**
    * @brief 장치 정보를 보여주는 함수
    * @param props place 디바이스의 위치 -> 장소 알 수 있음. css 그리드 지정.   
    * @param props place_info 디바이스의 정보 -> 화면에 info 띄워주기
    */
    function show_device(place,place_info){
        if(place !== undefined && place_info !== undefined){
            let game_color;
                    let device_color;
                    let device_name_color = "light";
                    let online_color;
                    let online_state;
                    switch (place_info.game_state){
                        case 'setting':
                            game_color = 'light'
                            break;
                        case 'ready':
                            game_color = 'danger'
                            break;
                        case 'activate':
                            game_color = 'warning'
                            break;
                        default :
                            break;
                    }
                    switch (place.shift_machine){
                        case 0:
                            online_color = 'light'
                            online_state = 'on'
                            break;
                        case 1:
                            online_color = 'light'
                            online_state = 'on'
                            break;
                        default :
                            online_color = 'danger'
                            online_state = 'off'
                            break;
                    }
                    switch (place_info.device_state){
                        case 'setting':
                            device_color = 'light'
                            break;
                        case 'ready':
                            device_color = 'danger'
                            break;
                        case 'activate':
                            device_color = 'warning'
                            break;
                        case 'open':
                            device_color = 'open'
                            break;
                        case 'used':
                            device_color = 'used'
                            break;
                        case 'self_revive':
                            device_color = 'self_revive'
                            break;
                        case 'lock':
                            device_color = 'lock'
                            break;
                        case 'battery_max':
                            device_color = 'battery_max'
                            break;
                        case 'starter_finish':
                            device_color = 'starter_finish'
                            break;
                        case 'escape':
                            device_color = 'escape'
                            break;
                        case 'takenchip_max':
                            device_color = 'takenchip_max'
                            break;
                        case 'player_win':
                            device_color = 'escape'
                            break;
                        case 'player_lose':
                            device_color = 'takenchip_max'
                            break;
                        case 'emergency':
                            device_color = 'emergency';
                            online_color = 'emergency';
                            if(ductemergency !== 'emergency'){
                                handleShow();
                                setDuctEmergency('emergency');
                            }
                            break;
                        default :
                            break;
                    }
                    // if(place_info.device_state !== 'emergency' && place_info.device_state !== ''){
                    //     setDuctEmergency('');
                    // }
                    switch (place.restart){
                        case 0:
                            device_name_color = 'light'
                            break;
                        case 1:
                            device_name_color = 'warning'
                            break;
                        default :
                            break;
                    }
            switch (place.device_type){
                case "itembox":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🔋</span><Badge bg={online_color} text="dark">{place_info.battery_pack}</Badge><span>🌟</span><Badge bg={online_color} text="dark">{place_info.exp_pack}</Badge>
                            </Badge>
                case "revivalmachine":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>💟</span><Badge bg={online_color} text="dark">{place_info.life_chip}</Badge>
                            </Badge>
                case "tagmachine":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                            </Badge>
                case "duct":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🧊쿨타임</span><Badge bg={online_color} text="dark">{place_info.cool_time}</Badge>
                            </Badge>
                case "generator":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🔋</span><Badge bg={online_color} text="dark">{place_info.battery_pack}/{place_info.max_battery_pack}</Badge>
                            </Badge>
                case "escapemachine":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>👻</span><Badge bg={online_color} text="dark">{place_info.max_ghost_tag}</Badge>
                            </Badge>
                case "temple":
                    return  <Badge bg={online_color} text="dark">
                                <Badge bg={online_color} text="dark">{online_state}</Badge><Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg={online_color} text="dark">장치 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🚔</span><Badge bg={online_color} text="dark">{place_info.taken_chip}</Badge>
                            </Badge>    
            }
        }
    }

    return (
            <>
                <style type="text/css">
                    {`
                .bg-on {
                    background-color: light;
                    color: black;
                    outline : solid 4px rgb(0, 255, 0);
                }
                .bg-off {
                    background-color: light;
                    color: black;
                    outline : solid 4px rgb(255, 0, 0);
                }
                .bg-open {
                    background-color: rgba(75, 204, 255, 0.7);
                    color: black;
                }
                .bg-used {
                    background-color: rgba(75, 117, 255, 0.7);
                    color: black;
                }
                .bg-self_revive {
                    background-color: rgba(171, 255, 75, 0.7);
                    color: black;
                }
                .bg-lock {
                    background-color: rgba(90, 255, 75, 0.7);
                    color: black;
                }
                .bg-battery_max {
                    background-color: rgba(90, 255, 75, 0.7);
                    color: black;
                }
                .bg-starter_finish {
                    background-color: rgba(75, 102, 255, 0.7);
                    color: black;
                }
                .bg-escape {
                    background-color: rgba(90, 255, 75, 0.7);
                    color: black;
                }
                .bg-takenchip_max {
                    background-color: rgba(183, 75, 255, 0.7);
                    color: black;
                }
                .bg-emergency {
                    background-color: rgb(251, 255, 0);
                    color: black;
                }
                `}
                </style>
                {/* 한 방당 장치가 cyberpunk 테마에서 최대 2개이지만  */}
                {/* 황무지에서 한방에 덕트가 3개있는 경우도 있음. -> unedfined가 아닐때만 출력함. */}
                {/* 그래서 show 3개를 해놓음.  */}
                {show_device(props.place[0],props.place_info[0])}
                {show_device(props.place[1],props.place_info[1])}
                {show_device(props.place[2],props.place_info[2])}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>덕트 비상 감지</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>문제가 생긴 덕트를 확인해주세요.(노란색 배경)</Modal.Body>
                </Modal>
            </>
            

        
    );
};

export default DeviceInfo;