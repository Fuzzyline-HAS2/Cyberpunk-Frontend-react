import React, { useState } from 'react';
import axios from "axios";

const Narration = (props) => {
    const [itemused,setItemUsed]=useState(0);
    const [generatorrepaired,setGeneratorRepaired]=useState(0);
    const [revivalused,setRevivalUsed]=useState(0);
    const [templetakenchip,setTempleTakenChip]=useState(0);
    const [escapeescape,setEscapeEscape]=useState(0);
    const [taggerActivate,setTaggerActivate]=useState('');
    /**
    * @brief time에 따라 내레이션을 결정해주는 함수 
    */
    const narration_time = (time) => { 
        console.log(time)
        switch (time){
            case 2099:
                iotglove_activate('tagger_blink');
                narration(1,1) //0001 VO1 하이드앤시크 프로젝트에 오신 것을 환영합니다. 모든 플레이어는 진입해주십시오
                break;
            case 2098:
                narration(1,2) //0002 VO2 술래의 등장 이전까지는 문을 제외한 장치의 사용이 불가합니다, 지형지물과 장치의 위치를 파악하십시오
                break;
            case 2097:
                narration(1,3) //0003 VO3 술래는 랜덤한 플레이어로 결정됩니다, 모두 흩어져 서로를 경계하십시오
                break;
            case 2050:
                narration(1,55) //0055 VO47 술래결정전까지는 장치이용안됩니다 빨간색이면 쓰면 안됨
                break;
            case 1983:
                narration(1,63) //0063 VO55 1분후 술래가 결정됩니다 (2)
                break;
            case 1953:
                narration(1,4) //0004 VO4 술래 결정까지 30초 남았습니다,
                break;
            case 1929:
                narration(1,5) //0005 VO5 술래 결정 5초전, 4초, 3초, 2초, 1초
                break;
            case 1921:
                narration(1,56) //0056 VO48 술래가 결정되었습니다. 술래는 제단으로 가 글러브를 활성시켜 주세요
                // iotglove_activate('tagger_blink');
                //술래 iot글러브 정상상태는 iotglove 코드에 있음. 
                break;
            case 1920:
                narration(1,31) //0031 VO24 생명장치 활성화
                break;    
            case 1919:
                device_activate('itembox','');
                device_activate('tagmachine','');
                device_activate('duct','');
                device_activate('generator','');
                device_activate('revivalmachine',props.revival_order[0]);
                device_activate('revivalmachine',props.revival_order[1]);
                device_activate('revivalmachine',props.revival_order[2]);
                break;
            case 1740:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[3]);
                break;
            case 1560:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[4]);
                break;
            case 1380:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[5]);
                break;
            case 1200:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[6]);
                break;
            case 1020:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[7]);
                break;
            case 840:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[8]);
                break;
            case 660:
                narration(1,31)//0031 VO24 생명장치 활성화
                break;
            case 1739:
                device_activate('revivalmachine',props.revival_order[9]);
                break;
            case 2:
                narration(1,16)//0016 VO14 탈출제한시간이 끝났습니다, 술래가 승리하였습니다
                break;
            case 1:
                narration(1,61)//0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요 
                break;
        }

    }

    const itembox = (itembox) => {
        let used = 0;
        if(itembox !== undefined){
            itembox.map( x => {
                if(x['device_state'] === 'used'){
                    used++;
                }
            })
            if(used !== itemused){
                setItemUsed(used);
            }
        }
    }
    const generator = (generator) => {
        let repaired = 0;
        // console.log(generator)
        if(generator !== undefined){
            generator.map( x => {
                if(x['device_state'] === 'repaired'){
                    repaired++;
                }
            })
            // console.log(repaired)
            if(repaired !== generatorrepaired){
                switch (repaired){
                    case 1 :
                        narration(3,3) //0003 VO38 남은 전원공급장치는 2개 입니다
                        break;
                    case 2 :
                        narration(3,2) //0002 VO37 남은 전원공급장치는 1개 입니다
                        break;
                    case 3 :
                        narration(3,1) //0001 VO22 모든 전원공급장치의 수리가 완료되었습니다.
                        break;
                }
                setGeneratorRepaired(repaired);
                if(repaired >= 3){
                    narration(1,30) //0030 VO23 탈출장치가 활성화 됩니다.
                    device_activate('escapemachine','');
                }
            }
        }
    }
    const revivalmachine = (revivalmachine) => {
        let used = 0;
        if(revivalmachine !== undefined){
            revivalmachine.map( x => {
                if(x['device_state'] === 'used'){
                    used++;
                }
            })
            if(used !== revivalused){
                setRevivalUsed(used);
            }
        }
    }
    const escapemachine = (escapemachine) => {
        let escape = 0;
        if(escapemachine !== undefined){
            escapemachine.map( x => {
                if(x['device_state'] === 'escape'){
                    escape++;
                }
            })
            if(escape !== escapeescape){
                console.log('탈출')
                if(escape > 0){
                    narration(1,32) //0032 VO25 탈출에 성공하였습니다. 생존자가 승리하였습니다.
                    setTimeout(function() {
                        narration(1,61) //0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요 
                    }, 1000);
                }
                props.timer_control('playtime','stop');
                // timer_stop('playtime','stop');
                setEscapeEscape(escape);
            }
        }
    }
    const temple = (temple) => {
        let takenchip = 0;
        if(temple !== undefined){
            if(temple.length !== 0){
                console.log('temple[0][device_state] : ',temple[0]['device_state'])
                console.log('taggerActivate : ',taggerActivate)
                if(temple[0]['device_state'] === 'activate' && temple[0]['device_state'] !== taggerActivate){
                    console.log('taggerActivate:',taggerActivate)
                    setTaggerActivate('activate');
                    narration(1,59)//0059 VO51 술래의 글러브가 활성화 되었습니다. 술래가 활동을 시작합니다.
                }
                if(temple[0]['taken_chip']  !== templetakenchip){
                    takenchip = temple[0]['taken_chip'];
                    setTempleTakenChip(takenchip);
                    switch (10 - takenchip){
                        case 9:
                            narration(2,9) //0009 한명의 생존자가 사망하였습니다, 남은 생명은 9개 입니다.
                            break;
                        case 8: 
                            narration(2,8) //0008 한명의 생존자가 사망하였습니다, 남은 생명은 8개 입니다.
                            break;
                        case 7:
                            narration(2,7) //0007 한명의 생존자가 사망하였습니다, 남은 생명은 7개 입니다.
                            break;
                        case 6:
                            narration(2,6) //0006 한명의 생존자가 사망하였습니다, 남은 생명은 6개 입니다.
                            break;
                        case 5:
                            narration(2,5) //0005 한명의 생존자가 사망하였습니다, 남은 생명은 5개 입니다.
                            break;
                        case 4:
                            narration(2,4) //0004 한명의 생존자가 사망하였습니다, 남은 생명은 4개 입니다.
                            break;
                        case 3:
                            narration(2,3) //0003 한명의 생존자가 사망하였습니다, 남은 생명은 3개 입니다.
                            break;
                        case 2:
                            narration(2,2) //0002 한명의 생존자가 사망하였습니다, 남은 생명은 2개 입니다.
                            break;
                        case 1:
                            narration(2,1) //0001 한명의 생존자가 사망하였습니다, 남은 생명은 1개 입니다.
                            break;
                        case 0: //술래승리
                            narration(1,15) //0015 VO13 제단이 활성화 되었습니다. 술래가 승리하였습니다.
                            props.timer_control('playtime','stop');
                            setTimeout(function() {
                                narration(1,61) //0061 VO53 게임이 종료되었습니다. 모든플레이어는 제단앞으로 모여주세요 
                            }, 1000);
                            break;
                    }
                }
            }
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
        if(folder_num === 1 && file_num === 61){
            setItemUsed(0);
            setGeneratorRepaired(0);
            setRevivalUsed(0);
            setTempleTakenChip(0);
            setEscapeEscape(0);
            setTaggerActivate('');
        }
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
    const iotglove_activate = async(command)=>{
        await axios.post('/api/update/iotglove', {
            theme: 'cyberpunk',
            device_state: 'activate',
            command : command
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <>
        {/* {console.log(props.device_info)} */}
            {narration_time(props.time, props.revival_order)}
            {itembox(props.device_info.itembox_info)}
            {generator(props.device_info.generator_info)}
            {revivalmachine(props.device_info.revivalmachine_info)}
            {temple(props.device_info.temple_info)}
            {escapemachine(props.device_info.escapemachine_info)}
            <div className='controler_game_progerss'>
                <p className='progress_font_name'>게임 진행도 </p>
                <p className='progress_font'>빈 아이템박스 : {itemused}/10</p>
                <p className='progress_font'>수리 완료 발전기 : {generatorrepaired}/3</p>
                <p className='progress_font'>사용된 부활장치 : {revivalused}/10</p>
                <p className='progress_font'>제단 생명칩 개수 : {templetakenchip}/10</p>
                <p className='progress_font'>남은 생명 : {10-templetakenchip}/10</p>
                <p className='progress_font'>자가부활 : ??:??</p>
            </div>
        </>
    )
}
export default Narration;