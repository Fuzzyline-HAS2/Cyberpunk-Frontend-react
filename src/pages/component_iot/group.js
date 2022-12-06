import axios from 'axios';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Group = (props) => {
    const role_change = async(glove,role) => {
        await axios.post('/api/update/iotglove',{
            glove : glove,
            command : 'role_change',
            role : role
        })
        .catch(function (error){
            console.log(error);
        })
    }
    const exp_change = async(glove,exp) => {
        await axios.post('/api/update/iotglove',{
            glove : glove,
            command : 'exp_change',
            exp : exp
        })
        .catch(function (error){
            console.log(error);
        })
    }
    const group_info = (group,group_info) => {
        let color_online;
        let color_role;
        let color_game_state;
        let color_device_state;
        let life_chip;
        let battery_pack;
        let exp;
        let exp_percent;
        let taken_chip;
        let text;
        let background_in;
        let background_out;
        let color_theme;
        if(group !== undefined && group_info !== undefined){
            //생명칩 개수에 따라 역할 변경 player <-> ghost
            if(group_info.role === 'player' && group_info.life_chip <1){
                console.log('ghost로 변경')
                role_change(group_info.device_name,'ghost');
            }
            else if(group_info.role === 'ghost' && group_info.life_chip >0){
                console.log('player로 변경')
                role_change(group_info.device_name,'player');
            }
            //경험치 상승에 따른 LV,SP변경
            if(group_info.exp > group_info.max_exp){
                exp_change(group_info.device_name,group_info.exp-group_info.max_exp);
            }

            switch(group_info.role){
                case 'player':
                    color_role = 'green';
                    break;
                case 'tagger':
                    color_role = 'purple'
                    break;
                case 'ghost':
                    color_role = 'blue'
                    break;
                case 'neutral':
                    color_role = 'gray'
                    break;
                default:
                    break;
            }
            switch(group.theme){
                case 'waiting':
                    color_theme = 'theme_name_waiting';
                    break;
                case 'exerciseroom':
                    color_theme = 'theme_name_exerciseroom';
                    break;
                case 'cyberpunk':
                    color_theme = 'theme_name_cyberpunk'
                    break;
                default:
                    break;
            }
            switch(group_info.game_state){
                case 'setting':
                    if(group_info.role === 'neutral'){
                        color_game_state = 'gray';
                    }
                    else{
                        color_game_state = 'beige';
                    }
                    break;
                case 'ready':
                    color_game_state = 'danger'
                    break;
                case 'activate':
                    color_game_state = 'warning'
                    break;
                default:
                    break;
            }
            switch(group_info.device_state){
                case 'setting':
                    if(group_info.role === 'neutral'){
                        color_device_state = 'gray';
                    }
                    else{
                        color_device_state = 'beige';
                    }
                    break;
                case 'ready':
                    color_device_state = 'danger'
                    break;
                case 'activate':
                    color_device_state = 'warning'
                    break;
                case 'blink':
                    color_device_state = 'device_purple';
                    break;
                case 'player_win':
                    color_device_state = 'green';
                    break;
                case 'player_lose':
                    color_device_state = 'purple';
                    break;
                default:
                    break;
            }
            //장치 on/off 구분
            if(group.shift_machine > 1){
                color_online = 'off';
            }
            else {
                color_online = 'on';
            }
            if(group_info.role === 'neutral' || group.theme === 'waiting'){
                text = 'dark';
                background_out = 'gray';
                background_in = 'gray';
            }
            else {
                //장치 on/off 구분
                if(group.shift_machine > 1){
                    color_online = 'off';
                    background_out = 'off';
                    background_in = 'off';
                }
                else {
                    color_online = 'on';
                    text = 'dark';
                    background_out = 'white_outline';
                    background_in = 'beige';
                }
            }
            
            life_chip = group_info.life_chip + '/' + group_info.max_life_chip;
            battery_pack = group_info.battery_pack + '/' + group_info.max_battery_pack;
            exp = group_info.exp + '/' + group_info.max_exp;
            exp_percent = (group_info.exp/group_info.max_exp)*100;
            taken_chip = group_info.taken_chip + '/' + group_info.max_taken_chip;

            if(group_info.role === 'tagger'){
                return  <div style = {{margin : '0px 0px 5px 0px' , textAlign : 'center'}}>
                            <Badge bg = {background_out} text = {text}>
                                <div className="text-center">
                                    <Badge bg = {color_theme} >{group.theme}</Badge><Badge bg = {color_online} >{color_online}</Badge><Badge bg = {color_role}>{group_info.device_name}</Badge><Badge bg = {background_in} text="dark">Lv : {group_info.lv}</Badge><Badge bg = {background_in} text="dark">위치</Badge>  
                                </div>
                                <div className="text-center">
                                    게임 상태 : <Badge bg = {color_game_state} text="dark">{group_info.game_state}</Badge> 장치 상태 : <Badge bg = {color_device_state} text="dark">{group_info.device_state}</Badge>
                                </div>
                                <div className="text-center">
                                    <ProgressBar variant="success" now = {exp_percent}  />
                                </div>
                                <div className="text-center">
                                    <span>🌟</span><Badge bg = {background_in} text="dark">{exp}</Badge>
                                    <Badge bg = {background_in} text="dark">SP : {group_info.skill_point}</Badge>
                                    <span>🚔</span><Badge bg = {background_in} text="dark">{taken_chip}</Badge>
                                    
                                </div>  
                            </Badge>
                        </div>
            }
            else {
                return  <div style = {{margin : '0px 0px 5px 0px' , textAlign : 'center'}}>
                            <Badge bg = {background_out} text={text}>
                                <div className="text-center">
                                    <Badge bg = {color_theme} >{group.theme}</Badge><Badge bg = {color_online} >{color_online}</Badge><Badge bg = {color_role} >{group_info.device_name}</Badge><Badge bg = {background_in} text="dark">Lv : {group_info.lv}</Badge><Badge bg = {background_in} text="dark">위치</Badge>  
                                </div>
                                <div className="text-center">
                                    게임 상태 : <Badge bg = {color_game_state} text="dark">{group_info.game_state}</Badge> 장치 상태 : <Badge bg = {color_device_state} text="dark">{group_info.device_state}</Badge>
                                    <ProgressBar variant="success" now = {exp_percent}  />  
                                </div>
                                <div className="text-center">
                                <span>🌟</span><Badge bg = {background_in} text="dark">{exp}</Badge><Badge bg = {background_in} text="dark"> SP : {group_info.skill_point}</Badge><span>💟</span><Badge bg = {background_in} text="dark">{life_chip}</Badge><span>🔋</span><Badge bg = {background_in} text="dark">{battery_pack}</Badge>
                                </div>
                            </Badge>
                        </div>
            }
        }
    }

    return(
        <>
            <style type="text/css">
            {`
                .bg-on {
                    background-color: white;
                    color: black;
                }
                .bg-off {
                    background-color: rgb(220, 53, 69);
                    color: black;
                }
                .bg-purple {
                background-color: purple;
                color: white;
                font-size : 13px
                }
                .bg-device_purple {
                    background-color: rgba(211, 158, 255, 0.61);
                    color: white;
                    font-size : 10px
                }
                .bg-green {
                background-color: green;
                color: white;
                font-size : 13px
                }
                .bg-blue {
                background-color: blue;
                color: white;
                font-size : 13px
                }
                .bg-gray {
                background-color: gray;
                color: white;
                font-size : 12px
                }
                .bg-white_outline {
                background-color: white;
                color: dark;
                font-size : 12px;
                outline : solid 1px rgb(190, 190, 190);
                }
                .bg-beige {
                background-color: light;
                color: dark;
                font-size : 12px;
                }
                .bg-theme_name_waiting {
                color: light;
                font-size : 13px
                }
                .bg-theme_name_exerciseroom {
                color: black;
                font-size : 13px
                }
                .bg-theme_name_cyberpunk {
                color: purple;
                font-size : 13px
                }
            `}
            </style>
            {group_info(props.group[0],props.group_info[0])}
            {group_info(props.group[1],props.group_info[1])}
            {group_info(props.group[2],props.group_info[2])}
            {group_info(props.group[3],props.group_info[3])}
            {group_info(props.group[4],props.group_info[4])}
            {group_info(props.group[5],props.group_info[5])}
            {group_info(props.group[6],props.group_info[6])}
            {group_info(props.group[7],props.group_info[7])}
        </>
    )
}

export default Group;