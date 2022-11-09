import React, { useState } from 'react';
import axios from "axios";

import Button from 'react-bootstrap/Button';

let time_control = null;
/**
* @brief 장치 정보를 보여주는 컴포넌트 
*/
const Timer = () => {
    const [timer,setTimer]=useState(0);
    let timer_notstate;

    async function time_control_func(){
        let time = await axios.post('/api/timer', {
            theme: 'cyberpunk',
            timer_name: 'playtime',
            command: 'start'
        })
        .catch(function (error) {
            console.log(error);
        });
        setTimer(time.data[0].sec);
    }

    async function reset(timer_name,command){
        if(command === "start"){
            if(time_control === null){
                time_control = setInterval(time_control_func, 1000);
            }
        }
        else if(command === "stop"){
            clearInterval(time_control);
            time_control = null;
            await axios.post('/api/timer', {
                theme: 'cyberpunk',
                timer_name: timer_name,
                command: command
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else if(command === "reset"){
            clearInterval(time_control);
            time_control = null;
            let time = await axios.post('/api/timer', {
                theme: 'cyberpunk',
                timer_name: timer_name,
                command: command
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log(time.data[0].sec)
            setTimer(time.data[0].sec);
        }
        else {
            if(command !== '+60' || timer < 2040){
                let time = await axios.post('/api/timer', {
                    theme: 'cyberpunk',
                    timer_name: timer_name,
                    command: command
                })
                .catch(function (error) {
                    console.log(error);
                });
                setTimer(time.data[0].sec);    
            }
            else {
                console.log('불가능')
            }
        }
    }
        
        // if(command === "start"){
        //     send = true;
        //     let interval = setInterval( async() => {
        //         await axios.post('/api/timer', {
        //             theme: 'cyberpunk',
        //             timer_name: timer_name,
        //             command: command
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        //     },1000)
        // }
        // else if(command === "stop"){
        //     send = false;
        //     clearInterval(interval);
        // }
        // else {
        //         if(send){
        //         await axios.post('/api/timer', {
        //             theme: 'cyberpunk',
        //             timer_name: timer_name,
        //             command: command
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        //     }
        // }


    function timer_calculate(){ 
        let sec = timer%60;
        if(timer <0){
            setTimer(0);
            clearInterval(time_control);
            time_control = null;
        }
        if( 0 <= sec && sec<10){
            return <p className='timer_number_font'>{parseInt(timer/60)}:0{timer%60}</p>
        }
        else {
            return <p className='timer_number_font'>{parseInt(timer/60)}:{timer%60}</p>
        }
    }
    return(
        <>
            <div>
                <p style = {{fontSize : '20px', margin : "0px 0px -20px 10px"}}>play time : 35:00</p>
                <div style = {{position: 'absolute', top: '90px', left: '290px', textAlign: 'center'}}>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '8px'}} onClick = {() => {reset('playtime','reload')}}>새로고침</Button><br/>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '8px'}} onClick = {() => {reset('playtime','reset')}}>초기화</Button><br/>
                </div>
                {timer_calculate()}
                <div style = {{position: 'absolute', top: '90px', left: '350px', textAlign: 'center'}}>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '12px', margin : '0px 0px 1px 0px'}} onClick = {() => {reset('playtime','start')}}>타이머 시작</Button><br/>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '12px', margin : '0px 0px 1px 0px'}} onClick = {() => {reset('playtime','stop')}}>타이머 정지</Button><br/>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '12px', margin : '0px 0px 1px 0px'}} onClick = {() => {reset('playtime','+60')}}>1분 추가</Button><br/>
                    <Button variant="outline-dark" size = 'sm' style = {{fontSize : '12px', margin : '0px 0px 1px 0px'}} onClick = {() => {reset('playtime','-30')}}>30초 감소</Button>
                </div>
            </div>
        </>
    )
};

export default Timer;