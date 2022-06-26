import React, { ChangeEvent, useEffect, useState } from "react";
import { PropsNameBlock } from "../typesTS/typesTS";



const NameLastName: React.FC<PropsNameBlock> = ({ setNameBlock, clearInp, setTextServer }) => {
   const [name, setName] = useState('')
   const [nameDirty, setNameDirty] = useState(false)
   const [nameError, setNameError] = useState('Поле не может быть пустым')


   const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.type === 'text') {
         setNameDirty(true)
      }
   }

   useEffect(() => {
      setName('')
      setNameDirty(false)
   }, [clearInp])

   const nameHendler = (e: ChangeEvent<HTMLInputElement>) => {

      setTextServer(null)
      const val = e.target.value
      const typeval = e.target.value.trim()

      setName((e.target.value).toUpperCase())
      if (e.target.value.split(' ').length !== 2 || val.split(' ')[0] === '' || val.split(' ')[1] === '') {
         setNameError('Должно быть написано Имя и Фамилия')
      } else if (val.split(' ')[0].length < 3 || val.split(' ')[0].length > 30) {
         setNameError('Длинна Имени должна быть больше 3 и меньше 30')
      } else if (val.split(' ')[1].length < 3 || val.split(' ')[1].length > 30) {
         setNameError('Длинна Фамилии должна быть больше 3 и меньше 30')
      } else if (!/^[a-zA-Z\s]*$/.test(typeval)) {
         setNameError('Введен некоректный символ')
      } else {
         setNameError('')
         setNameBlock({ name: e.target.value })
      }
   }



   return (
      <div className="form-group">
         <label >Имя Фамилия</label>
         <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onBlur={e => blurHandler(e)}
            value={name}
            onChange={e => nameHendler(e)}
         />
         {(nameError && nameDirty) && <div className="error">{nameError}</div>}
      </div>
   )
}

export default NameLastName