import React, { useState } from 'react';

const MYDropdownDeviceControl = (props) => {
    const select_device = {
        itembox :  [
            { value: "장치명", name: "장치명" },
            { value: "BI1", name: "BI1" },
            { value: "BI2", name: "BI2" },
            { value: "HI1", name: "HI1" },
            { value: "HI2", name: "HI2" },
            { value: "GI1", name: "GI1" },
            { value: "GI2", name: "GI2" },
            { value: "OI1", name: "OI1" },
            { value: "OI2", name: "OI2" },
            { value: "FI1", name: "FI1" },
            { value: "FI2", name: "FI2" }
        ],
        revivalmachine : [
            { value: "장치명", name: "장치명" },
            { value: "BR1", name: "BR1" },
            { value: "BR2", name: "BR2" },
            { value: "HR1", name: "HR1" },
            { value: "HR2", name: "HR2" },
            { value: "GR1", name: "GR1" },
            { value: "GR2", name: "GR2" },
            { value: "OR1", name: "OR1" },
            { value: "OR2", name: "OR2" },
            { value: "FR1", name: "FR1" },
            { value: "FR2", name: "FR2" }
        ],
        tagmachine : [
            { value: "장치명", name: "장치명" },
            { value: "BD", name: "BD" },
            { value: "HD1", name: "HD1" },
            { value: "HD2", name: "HD2" },
            { value: "GD", name: "GD" },
            { value: "OD", name: "OD" },
            { value: "FD1", name: "FD1" },
        ],
        duct : [
            { value: "장치명", name: "장치명" },
            { value: "BV1", name: "BV1" },
            { value: "BV2", name: "BV2" },
            { value: "HV1", name: "HV1" },
            { value: "HV2", name: "HV2" },
            { value: "GV1", name: "GV1" },
            { value: "GV2", name: "GV2" },
            { value: "FV", name: "FV" }
        ],
        generator : [
            { value: "장치명", name: "장치명" },
            { value: "BG", name: "BG" },
            { value: "HG", name: "HG" },
            { value: "GG", name: "GG" },
            { value: "OG", name: "OG" },
            { value: "FG", name: "FG" },
        ],
        escapemachine : [
            { value: "장치명", name: "장치명" },
            { value: "BE", name: "BE" },
            { value: "OE", name: "OE" },
            { value: "FE", name: "FE" },
        ],
        temple : [
            { value: "장치명", name: "장치명" },
            { value: "BT", name: "BT" },
        ],
    }

    const select_command = {
        itembox : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "open", name: "상자열기(장치상태)" },
            { value: "close", name: "상자닫기(장치상태)" }
        ],
        revivalmachine : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "self_revive", name: "자가부활(장치상태)" },
            { value: "use_complit", name: "사용완료(장치상태)" }
        ],
        tagmachine : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "open", name: "도어오픈" },
            { value: "lock", name: "도어잠금" },
        ],
        duct : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
        ],
        generator : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "battery_max", name: "배터리공급완료" },
            { value: "repair_completed", name: "수리완료" },
            
        ],
        escapemachine : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "escape_activate", name: "탈출장치활성화" },
            { value: "escape_completed", name: "탈출완료" },
        ],
        temple : [
            { value: "명령어", name: "명령어" },
            { value: "S", name: "S(게임상태)" },
            { value: "R", name: "R(게임상태)" },
            { value: "A", name: "A(게임상태)" },
            { value: "takenchip+1", name: "생명칩+1" },
            { value: "takenchip_max", name: "술래승리" },
        ],
    }

    const device_change = (e) => {
        console.log(e.target.value)
    }
    const command_change = (e) => {
        console.log(e.target.value)
    }

        function dropdown_make(device,command,device_list,command_list){
            if((device_list[device] && command_list[device])!== undefined){
            let my_device_list = device_list[device];
            let my_command_list = command_list[device];
            switch (command){
                case 'select' :
                    return  <div>
                                <select style={{fontSize :'10px'}} onChange={device_change}>
                                    {my_device_list.map((option) =>
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    )}
                                </select><br/>
                                <select style={{fontSize :'10px'}} onChange={command_change}>
                                    {my_command_list.map((option) =>
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    )}
                                </select>
                                <button style={{border:'none'}}>제출</button>
                            </div> 
                default :
                    break;
            }
    }
}
    return(
        <div>
            {dropdown_make(props.device,props.command,select_device,select_command)}
        </div>
    );
};
export default MYDropdownDeviceControl;
