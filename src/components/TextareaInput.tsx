import React, { ChangeEvent, useEffect, useState } from "react";
import { PropsTextareaBlock } from "../typesTS/typesTS";

const TextareaInput: React.FC<PropsTextareaBlock> = ({ setTextareaBlock, clearInp, setTextServer }) => {

   const [texter, setTexter] = useState('')
   const [texterDirty, setTexterDirty] = useState(false)
   const [texterError, setTexterError] = useState('Поле не может быть пустым')


   const blurHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.type === 'textarea') {
         setTexterDirty(true)
      }
   }

   useEffect(() => {
      setTexter('')
      setTexterDirty(false)
   }, [clearInp])

   const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTexter(e.target.value)
      setTextServer(null)

      if (e.target.value.trim().length < 10) {
         setTexterError('Количество символов должно быть больше 10')
      } else if (e.target.value.length > 300) {
         setTexterError('Количество символов не должно превышать 300')
      } else {
         setTexterError('')
         setTextareaBlock({ textarea: e.target.value })
      }
   }

   return (
      <div className="mb-3">
         <label className="form-label">Example textarea</label>
         <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            maxLength={300}
            minLength={10}
            onBlur={e => blurHandler(e)}
            value={texter}
            onChange={e => changeHandler(e)}
         ></textarea>
         {(texterError && texterDirty) && <div className="error">{texterError}</div>}
      </div>
   )
}

export default TextareaInput