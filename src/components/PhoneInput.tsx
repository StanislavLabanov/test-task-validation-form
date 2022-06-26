import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { PropsPhoneBlock } from "../typesTS/typesTS";

const PhoneInput: React.FC<PropsPhoneBlock> = ({ setPhoneBlock, clearInp, setTextServer }) => {
   const ref = useRef<HTMLInputElement>(null)
   const [phoneDirty, setPhoneDirty] = useState(false)
   const [phoneError, setPhoneError] = useState('Поле не может быть пустым')

   const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if ((e.target.type === 'tel')) {
         setPhoneDirty(true)
      }
   }

   useEffect(() => {
      ref.current!.value = ''
      setPhoneDirty(false)
   }, [clearInp])

   const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTextServer(null)

      let el = e.target,
         clearVal = el.dataset.phoneClear,
         pattern = el.dataset.phonePattern,
         matrix_def = "+7(___) ___-__-__",
         matrix = pattern ? pattern : matrix_def,
         i = 0,
         def = matrix.replace(/\D/g, ""),
         val = e.target.value.replace(/\D/g, "");

      if (clearVal !== 'false' && e.type === 'blur') {
         if (val.length < matrix.match(/([\_\d])/g)!.length) {
            e.target.value = '';
            return;
         }
      }

      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });


      if (e.target.value.replace(/\D/g, "").length !== 11) {
         setPhoneError('Номер телефона должен содержать 11 символов')
      } else {
         setPhoneError('')
         setPhoneBlock({ tel: e.target.value })
      }
   }

   return (
      <div className="form-group">
         <label >Номер телефона</label>
         <input
            type="tel"
            className="form-control"
            pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
            onChange={e => changeHandler(e)}
            onBlur={e => blurHandler(e)}
            placeholder="+7 (___) ___-__-__"
            data-phone-pattern="+7 (___) ___-__-__"
            data-phone-clear="false"
            ref={ref}
         />
         {(phoneDirty && phoneError) && <div className="error">{phoneError}</div>}
      </div>
   )
}


export default PhoneInput