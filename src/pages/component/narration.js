import React, { useState } from 'react';
import axios from "axios";

const Narration = (props) => {
    /**
    * @brief time에 따라 내레이션을 결정해주는 함수 
    */
    const narration_time = (time) => { 
        console.log(time)
        switch (time){
            case 2099:
                narration(1,1) //0001 VO1 하이드앤시크 프로젝트에 오신 것을 환영합니다. 모든 플레이어는 진입해주십시오
                break;
            case 2098:
                narration(1,2) //0002 VO2 술래의 등장 이전까지는 문을 제외한 장치의 사용이 불가합니다, 지형지물과 장치의 위치를 파악하십시오
                break;
            case 2097:
                narration(1,3) //0003 VO3 술래는 랜덤한 플레이어로 결정됩니다, 모두 흩어져 서로를 경계하십시오
                break;
            case 1953:
                narration(1,4) //0004 VO4 술래 결정까지 30초 남았습니다,
                break;
            case 1929:
                narration(1,5) //0005 VO5 술래 결정 5초전, 4초, 3초, 2초, 1초
                break;
            case 1919:
                narration(1,31) //0031 VO24 생명장치 활성화
                device_activate('itembox','');
                device_activate('tagmachine','');
                device_activate('duct','');
                device_activate('generator','');
                device_activate('temple','');
                device_activate('revivalmachine',props.revival_order[0]);
                device_activate('revivalmachine',props.revival_order[1]);
                device_activate('revivalmachine',props.revival_order[2]);
                break;
            case 1740:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[3]);
                break;
            case 1560:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[4]);
                break;
            case 1380:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[5]);
                break;
            case 1200:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[6]);
                break;
            case 1020:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[7]);
                break;
            case 840:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[8]);
                break;
            case 660:
                narration(1,31)//0031 VO24 생명장치 활성화
                device_activate('revivalmachine',props.revival_order[9]);
                break;
            case 1:
                narration(1,16)//0016 VO14 탈출제한시간이 끝났습니다, 술래가 승리하였습니다
                break;
            
        }

    }
    const narration = async(folder_num,file_num)=>{
        await axios.post('/api/narration', {
            theme: 'cyberpunk',
            device: 'mp3',
            folder_num : folder_num,
            file_num : file_num
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const device_activate = async(device_type,device_name)=>{
        await axios.post('/api/update/device', {
            theme: 'cyberpunk',
            device_type: device_type,
            device_name: device_name,
            device_state: 'activate'
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <>
            {narration_time(props.time, props.revival_order)}
        </>
    )
}
export default Narration;