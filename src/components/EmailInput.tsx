import React, { ChangeEvent, useEffect, useState } from "react";
import { PropsEmailBlock } from "../typesTS/typesTS";

const EmailInput: React.FC<PropsEmailBlock> = ({ setEmailBlock, clearInp, setTextServer }) => {
   const [email, setEmail] = useState('')
   const [emailDirty, setEmailDirty] = useState(false)
   const [emailError, setEmailError] = useState('Email не может быть пустым')

   const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.type === 'email') {
         setEmailDirty(true)
      }
   }

   useEffect(() => {
      setEmail('')
      setEmailDirty(false)
   }, [clearInp])

   const emailHendler = (e: ChangeEvent<HTMLInputElement>) => {
      setTextServer(null)

      setEmail(e.target.value)
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(e.target.value).toLowerCase())) {
         setEmailError('Некорректный email')
      } else {
         setEmailError('')
         setEmailBlock({ email: e.target.value })
      }

   }

   return (
      <div className="form-group">
         <label >Адрес электронной почты</label>
         <input type="email"
            formNoValidate
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onBlur={e => blurHandler(e)}
            value={email}
            onChange={e => emailHendler(e)}
         />
         {(emailError && emailDirty) && <div className="error">{emailError}</div>}
      </div>
   )
}

export default EmailInput