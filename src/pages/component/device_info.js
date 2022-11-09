import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';

/**
* @brief 장치 정보를 보여주는 컴포넌트 
*/
const DeviceInfo = (props) => {
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
                        case 'stop':
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
                    switch (place_info.device_state){
                        case 'stop':
                            device_color = 'light'
                            break;
                        case 'ready':
                            device_color = 'danger'
                            break;
                        case 'activate':
                            device_color = 'warning'
                            break;
                        default :
                            break;
                    }
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
                    switch (place.shift_machine){
                        case 0:
                            online_color = 'success'
                            online_state = 'on'
                            break;
                        case 1:
                            online_color = 'success'
                            online_state = 'on'
                            break;
                        default :
                            online_color = 'danger'
                            online_state = 'off'
                            break;
                    }
            switch (place.device_type){
                case "itembox":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🔋</span><Badge bg="light" text="dark">{place_info.battery_pack}</Badge><span>🌟</span><Badge bg="light" text="dark">{place_info.exp_pack}</Badge>
                            </Badge>
                case "revivalmachine":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>💟</span><Badge bg="light" text="dark">{place_info.life_chip}</Badge>
                            </Badge>
                case "tagmachine":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                            </Badge>
                case "duct":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🧊쿨타임</span><Badge bg="light" text="dark">{place_info.cool_time}</Badge>
                            </Badge>
                case "generator":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🔋</span><Badge bg="light" text="dark">{place_info.battery_pack}/{place_info.max_battery_pack}</Badge>
                            </Badge>
                case "escapemachine":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>👻</span><Badge bg="light" text="dark">{place_info.max_ghost_tag}</Badge>
                            </Badge>
                case "temple":
                    return  <Badge bg="light" text="dark">
                                <Badge bg={device_name_color} text="dark"><div className='device_name'>{place.device_name}</div></Badge><Badge bg={online_color} text="dark">{online_state}</Badge>
                                <Badge bg={game_color} text="dark">{place_info.game_state}</Badge><br></br>
                                <Badge bg="light" text="dark">장치 상태 :</Badge><Badge bg={device_color} text="dark">{place_info.device_state}</Badge><br></br>
                                <span>🚔</span><Badge bg="light" text="dark">{place_info.taken_chip}</Badge>
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
                `}
                </style>
            {/* 황무지에서 한방에 덕트가 3개있는 경우도 있음. -> unedfined가 아닐때만 출력함. */}
                

                    {show_device(props.place[0],props.place_info[0])}
                    {show_device(props.place[1],props.place_info[1])}
                    {show_device(props.place[2],props.place_info[2])}
                
            </>
            

        
    );
};

export default DeviceInfo;