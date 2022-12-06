import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/esm/Badge';

const ThemeControl = () => {
    const [ exercisegroup, setExerciseGroup ] = useState()
    const [ cyberpunkgroup, setCyberpunkGroup ] = useState()
    const [ iotinputcheck , setIotInputCheck ] = useState([])
    const [ iotinputglove1, setIotInputGlove1] = useState([])
    const [ iotinputglove2, setIotInputGlove2] = useState([])
    const [ iotinputglove3, setIotInputGlove3] = useState([])
    const [ iotinputglove4, setIotInputGlove4] = useState([])
    const [ taggercheck , setTaggerCheck ] = useState([])
    const [ taggerglove1, setTaggerGlove1] = useState([])
    const [ taggerglove2, setTaggerGlove2] = useState([])
    const [ taggerglove3, setTaggerGlove3] = useState([])
    const [ taggerglove4, setTaggerGlove4] = useState([])

    const [choosecyberpunk, setChooseCyberpunk] = useState(false);
    const [chooseexerciseroom, setChooseExerciseroom] = useState(false);
    const cyberpunkhandleClose = () => setChooseCyberpunk(false);
    const cyberpunkhandleShow = () => setChooseCyberpunk(true);
    const exerciseroomhandleClose = () => setChooseExerciseroom(false);
    const exerciseroomhandleShow = () => setChooseExerciseroom(true);

    const [G1reset, setG1Reset] = useState(false);
    const [G2reset, setG2Reset] = useState(false);
    const [G3reset, setG3Reset] = useState(false);
    const [G4reset, setG4Reset] = useState(false);

    const G1handleClose = () => setG1Reset(false);
    const G1handleShow = () => setG1Reset(true);
    const G2handleClose = () => setG2Reset(false);
    const G2handleShow = () => setG2Reset(true);
    const G3handleClose = () => setG3Reset(false);
    const G3handleShow = () => setG3Reset(true);
    const G4handleClose = () => setG4Reset(false);
    const G4handleShow = () => setG4Reset(true);

    const handleClickExercise = (radioBtnName) => {
        setExerciseGroup(radioBtnName)
    }
    const handleClickCyberpunk = (radioBtnName) => {
        setCyberpunkGroup(radioBtnName)
    }
    const exerciseroom = () => {
        return  <div className='iotglove_theme_exerciseroom'>
                    <Badge bg = 'theme_exerciseroom' text = 'dark'>
                        <span className='theme_glove_font'> 훈련소 </span><br></br>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_exercise"
                                value="G1"
                                checked={exercisegroup === "G1"}
                                onChange={() => handleClickExercise('G1')}
                            />G1
                        </label>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_exercise"
                                value="G2"
                                checked={exercisegroup === "G2"}
                                onChange={() => handleClickExercise('G2')}
                            />G2
                        </label>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_exercise"
                                value="G3"
                                checked={exercisegroup === "G3"}
                                onChange={() => handleClickExercise('G3')}
                            />G3
                        </label>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_exercise"
                                value="G4"
                                checked={exercisegroup === "G4"}
                                onChange={() => handleClickExercise('G4')}
                            />G4
                        </label><br></br>
                        <Button variant="secondary" size = 'sm' onClick={exerciseroomhandleShow}>선택 확정</Button>
                        <Modal show={chooseexerciseroom} onHide={exerciseroomhandleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>훈련소 설정 확정 입력 감지</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>현재 선택한 장치들로 정말로 확정하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={exerciseroomhandleClose}>
                                취소
                            </Button>
                            <Button variant="primary" onClick={() => theme_confirm('exerciseroom',exercisegroup)}>
                                선택 확정
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Badge>
                </div>
    }
    const cyberpunk = () => {
        return  <div className='iotglove_theme_cyberpunk'>
                    <Badge bg = 'theme_cyberpunk' text = 'dark'>
                        <span className='theme_glove_font' style={{margin : '0px 5px 0px 5px'}}> Cyberpunk </span><br></br>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_cyberpunk"
                                value="G1"
                                checked={cyberpunkgroup === "G1"}
                                onChange={() => handleClickCyberpunk('G1')}
                            />G1
                        </label>
                        <label className='theme_glove_font'>
                            <input
                                type="radio"
                                name="radio_cyberpunk"
                                value="G2"
                                checked={cyberpunkgroup === "G2"}
                                onChange={() => handleClickCyberpunk('G2')}
                            />G2
                        </label><br></br>
                        <Button variant="secondary" size = 'sm' onClick={cyberpunkhandleShow}>선택 확정</Button>
                        <Modal show={choosecyberpunk} onHide={cyberpunkhandleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>사이버펑크 테마 설정 확정 입력 감지</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>현재 선택한 장치들로 정말로 확정하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={cyberpunkhandleClose}>
                                취소
                            </Button>
                            <Button variant="primary" onClick={() => theme_confirm('cyberpunk',cyberpunkgroup)}>
                                선택 확정
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Badge>
                </div>
    }
    const GloveGroup = (group) => {
        let theme_color;
        let iotglove_theme;
        let glove = ['P1','P2','P3','P4','P5','P6','P7','P8'];

        for(let i = 0; i < glove.length ; i++){
            glove[i] = group + glove[i];
        }
        // console.log(glove)
        if(exercisegroup === group){
            theme_color = 'theme_exerciseroom'
        }
        else if(cyberpunkgroup === group){
            theme_color = 'theme_cyberpunk'
        }
        else {
            theme_color = 'theme_waiting';
        }
        // console.log(theme_color)
        switch (group){
            case 'G1' :
                iotglove_theme = 'iotglove_theme_G1';
                break;
            case 'G2' :
                iotglove_theme = 'iotglove_theme_G2';
                break;
            case 'G3' :
                iotglove_theme = 'iotglove_theme_G3';
                break;
            case 'G4' :
                iotglove_theme = 'iotglove_theme_G4';
                break;
        }
        return  <div className= {iotglove_theme}>
                    <Badge bg = {theme_color} text = 'dark'>
                        <p style={{color : 'black', fontSize : '20px', margin : '0px 0px 5px 0px'}}>{group}</p>
                        <Button variant="secondary" size = 'sm' onClick = {()=>photo(group)}>사진촬영</Button>
                        {reset(group)}
                        <Button variant="light" size = 'sm' onClick = {()=>stateChange(group,'setting')}>S</Button><Button variant="danger" size = 'sm' onClick = {()=>stateChange(group,'ready')}>R</Button><Button variant="warning" size = 'sm' onClick = {()=>stateChange(group,'activate')}>A</Button><br></br>
                        <Button variant="device_purple" size = 'sm' onClick = {()=>stateChange(group,'blink')}>술래 결정</Button><br></br><Button variant="warning" size = 'sm' onClick = {()=>stateChange(group,'activate')}>술래 활성화</Button><br></br>
                        <span style={{margin : '0px 5px 0px 0px'}}>참여결정</span><span style={{margin : '0px 0px 0px 5px'}}>술래결정</span>
                        <form>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[0]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[0])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[0]}</label>
                            <input type={iotinputcheck.includes(glove[0])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[0]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[0])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[1]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[1])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[1]}</label>
                            <input type={iotinputcheck.includes(glove[1])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[1]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[1])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[2]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[2])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[2]}</label>
                            <input type={iotinputcheck.includes(glove[2])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[2]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[2])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[3]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[3])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[3]}</label>
                            <input type={iotinputcheck.includes(glove[3])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[3]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[3])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[4]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[4])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[4]}</label>
                            <input type={iotinputcheck.includes(glove[4])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[4]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[4])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[5]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[5])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[5]}</label>
                            <input type={iotinputcheck.includes(glove[5])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[5]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[5])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[6]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[6])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[6]}</label>
                            <input type={iotinputcheck.includes(glove[6])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[6]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[6])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                            <input type="checkbox" name = "chosen_iot_glove" value = {glove[7]}
                            onChange = {iotChosen} checked={iotinputcheck.includes(glove[7])? true:false}/>
                            <label className='checkbox_glove_font'>{glove[7]}</label>
                            <input type={iotinputcheck.includes(glove[7])? "checkbox":"hidden"} name = "chosen_iot_glove" value = {glove[7]}
                            onChange = {taggerChosen} checked={taggercheck.includes(glove[7])? true:false}/>
                            <label className='checkbox_glove_font'></label>
                            <br></br>
                        </form>
                        {sort_list(iotinputglove1,iotinputglove2,iotinputglove3,iotinputglove4)}
                        {sort_list(taggerglove1,taggerglove2,taggerglove3,taggerglove4)}

                        <p style = {{fontSize : '15px', margin : '10px 0px 5px 0px'}}> 결정된 술래</p>
                        {tagger_print(glove[0])}
                    </Badge>
                </div>
    }
    const stateChange = async(glove,state) => {
        await axios.post('/api/update/iotglove',{
            group : glove,
            command : 'state_change',
            state : state
        })
        .catch(function (error){
            console.log(error);
        })
    }
    const reset_confirm = async(group) => {
        await axios.post('api/reset/iotglove',{
            group : group,
            command : 'reset'
        })
        .catch(function (error){
            console.log(error);
        })
        switch (group){
            case 'G1':
                G1handleClose();
                break;
            case 'G2':
                G2handleClose();
                break;
            case 'G3':
                G3handleClose();
                break;
            case 'G4':
                G4handleClose();
                break;
        }
    }
    const photo = async(group) => {
        let player = [];
        let tagger = [];
        switch (group){
            case 'G1':
                player = iotinputglove1;
                tagger = taggerglove1;
                break;
            case 'G2':
                player = iotinputglove2;
                tagger = taggerglove2;
                break;
            case 'G3':
                player = iotinputglove3;
                tagger = taggerglove3;
                break;
            case 'G4':
                player = iotinputglove4;
                tagger = taggerglove4;
                break;
        }
        await axios.post('api/update/iotglove',{
            theme : 'waiting',
            group : group,
            command : 'photo_state',
            player : player,
            tagger : tagger
        })
        .catch(function (error){
            console.log(error);
        })
    }
    const theme_confirm = async(theme, group) => {
        let player = [];
        let tagger = [];
        switch (group){
            case 'G1':
                player = iotinputglove1;
                tagger = taggerglove1;
                break;
            case 'G2':
                player = iotinputglove2;
                tagger = taggerglove2;
                break;
            case 'G3':
                player = iotinputglove3;
                tagger = taggerglove3;
                break;
            case 'G4':
                player = iotinputglove4;
                tagger = taggerglove4;
                break;
        }
        console.log(tagger.length)
        if(theme !== 'exerciseroom' && tagger.length !== 0){
            tagger = [tagger[0]];
        }
        if(tagger.length === 0){
            tagger = [player[0]];        
        }
        console.log(tagger)
        await axios.post('/api/update/iotglove',{
            theme : theme,
            group : group,
            command : 'player_select',
            player : player,
            tagger : tagger
        })
        switch (theme){
            case 'exerciseroom':
                exerciseroomhandleClose();
                break;
            case 'cyberpunk':
                cyberpunkhandleClose();
                break;
        }
    }
    const reset = (group) => {
        console.log(group)
        switch (group) {
            case 'G1':
                return  <div>
                            <Button variant="danger" size = 'sm' onClick={G1handleShow}>초기화</Button><br></br>
                            <Modal show={G1reset} onHide={G1handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>G1 글러브 초기화 입력 감지</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>정말로 G1 글러브를 초기화하시겠습니까?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={G1handleClose}>
                                    취소
                                </Button>
                                <Button variant="primary" onClick={() => reset_confirm(group)}>
                                    초기화
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
            case 'G2':
                return  <div>
                            <Button variant="danger" size = 'sm' onClick={G2handleShow}>초기화</Button><br></br>
                            <Modal show={G2reset} onHide={G2handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>G2 글러브 초기화 입력 감지</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>정말로 G2 글러브를 초기화하시겠습니까?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={G2handleClose}>
                                    취소
                                </Button>
                                <Button variant="primary" onClick={() => reset_confirm(group)}>
                                    초기화
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
            case 'G3':
                return  <div>
                            <Button variant="danger" size = 'sm' onClick={G3handleShow}>초기화</Button><br></br>
                            <Modal show={G3reset} onHide={G3handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>G3 글러브 초기화 입력 감지</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>정말로 G3 글러브를 초기화하시겠습니까?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={G3handleClose}>
                                    취소
                                </Button>
                                <Button variant="primary" onClick={() => reset_confirm(group)}>
                                    초기화
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
            case 'G4':
                return  <div>
                            <Button variant="danger" size = 'sm' onClick={G4handleShow}>초기화</Button><br></br>
                            <Modal show={G4reset} onHide={G4handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>G4 글러브 초기화 입력 감지</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>정말로 G4 글러브를 초기화하시겠습니까?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={G4handleClose}>
                                    취소
                                </Button>
                                <Button variant="primary" onClick={() => reset_confirm(group)}>
                                    초기화
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
        }
        
    }
    const iotChosen = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        if(checked){
            if(value.includes("G1")){
                setIotInputGlove1([...iotinputglove1, value]); 
            }
            else if(value.includes("G2")){
                setIotInputGlove2([...iotinputglove2, value]); 
            } 
            else if(value.includes("G3")){
                setIotInputGlove3([...iotinputglove3, value]); 
            }
            else if(value.includes("G4")){
                setIotInputGlove4([...iotinputglove4, value]); 
            } 
            setIotInputCheck([...iotinputcheck, value]); 
        }
        else{
            if(value.includes("G1")){
                setIotInputGlove1(iotinputglove1.filter( (el) => el !== value)); 
                setTaggerGlove1(taggerglove1.filter( (el) => el !== value)); 
            }
            else if(value.includes("G2")){
                setIotInputGlove2(iotinputglove2.filter( (el) => el !== value)); 
                setTaggerGlove2(taggerglove2.filter( (el) => el !== value)); 
            } 
            else if(value.includes("G3")){
                setIotInputGlove3(iotinputglove3.filter( (el) => el !== value)); 
                setTaggerGlove3(taggerglove3.filter( (el) => el !== value)); 
            }
            else if(value.includes("G4")){
                setIotInputGlove4(iotinputglove4.filter( (el) => el !== value)); 
                setTaggerGlove4(taggerglove4.filter( (el) => el !== value));
            } 
            setIotInputCheck(iotinputcheck.filter( (el) => el !== value));
            setTaggerCheck(taggercheck.filter( (el) => el !== value));
        }
    }
    const taggerChosen = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        console.log(value)
        console.log(checked)
        if(checked){
            if(value.includes("G1")){
                setTaggerGlove1([...taggerglove1, value]); 
            }
            else if(value.includes("G2")){
                setTaggerGlove2([...taggerglove2, value]); 
            } 
            else if(value.includes("G3")){
                setTaggerGlove3([...taggerglove3, value]); 
            }
            else if(value.includes("G4")){
                setTaggerGlove4([...taggerglove4, value]); 
            } 
            setTaggerCheck([...taggercheck, value]); 
        }
        else{
            if(value.includes("G1")){
                setTaggerGlove1(taggerglove1.filter( (el) => el !== value)); 
            }
            else if(value.includes("G2")){
                setTaggerGlove2(taggerglove2.filter( (el) => el !== value)); 
            } 
            else if(value.includes("G3")){
                setTaggerGlove3(taggerglove3.filter( (el) => el !== value)); 
            }
            else if(value.includes("G4")){
                setTaggerGlove4(taggerglove4.filter( (el) => el !== value)); 
            } 
            setTaggerCheck(taggercheck.filter( (el) => el !== value));
        }
    }
    const sort_list = (glove1,glove2,glove3,glove4) => {
        glove1.sort();
        glove2.sort();
        glove3.sort();
        glove4.sort();
    }
    const tagger_print = (glove) => {
        let selected_tagger = '';
        if(glove.includes("G1")){
            return  <div>
                        {taggerglove1.map( x => {
                            selected_tagger+= x+" ";
                            
                        })}
                        <span>{selected_tagger}</span>
                    </div>
        }
        else if(glove.includes("G2")){
            return  <div>
                        {taggerglove2.map( x => {
                            selected_tagger+= x+" ";
                            
                        })}
                        <span>{selected_tagger}</span>
                    </div>
        }
        else if(glove.includes("G3")){
            return  <div>
                        {taggerglove3.map( x => {
                            selected_tagger+= x+" ";
                            
                        })}
                        <span>{selected_tagger}</span>
                    </div>
        }
        else if(glove.includes("G4")){
            return  <div>
                        {taggerglove4.map( x => {
                            selected_tagger+= x+" ";
                            
                        })}
                        <span>{selected_tagger}</span>
                    </div>
        }
        
    }
    return (
        <>
            <style type="text/css">
            {`
                .btn-device_purple {
                    background-color: rgba(211, 158, 255, 0.61);
                    color: black;
                }
            `}
            </style>
            {/* {console.log(taggercheck)} */}
            {exerciseroom()}
            {cyberpunk()}
            {GloveGroup('G1')}
            {GloveGroup('G2')}
            {GloveGroup('G3')}
            {GloveGroup('G4')}
            
            {console.log(iotinputglove1)}
            {/* {console.log(iotinputglove2)}
            {console.log(iotinputglove3)}
            {console.log(iotinputglove4)} */}
            {console.log(taggerglove1)}
            {/* {console.log(taggerglove2)}
            {console.log(taggerglove3)}
            {console.log(taggerglove4)} */}
        </>
    )
}

export default ThemeControl;