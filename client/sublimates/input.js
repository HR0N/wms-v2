import {useState} from "react";

class InputClass {
    init = (define)=>{
        const [val, setVal] = useState(define);
        const [touched, setTouched] = useState(false);
        const [checked, setChecked] = useState(false);
        const onChange = e => setVal(this.v(e));
        const setValue = v => setVal(v);
        const onBlur = e => setTouched(true);
        return {val, touched, onChange, onBlur, setValue}
    };
    v = e => e.target.value
}

export default InputClass;