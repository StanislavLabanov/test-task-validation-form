import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { PropsDataBlock } from "../typesTS/typesTS";

const DataInput: React.FC<PropsDataBlock> = ({ setDataBlock, clearInp, setTextServer }) => {
   const ref = useRef<HTMLInputElement>(null)
   const [flag, setFlag] = useState(false)

   const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if ((e.target.type === 'date' && !e.target.value.length)) {
         setFlag(true)
      }
   }

   useEffect(() => {
      ref.current!.value = ''
   }, [clearInp])

   const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTextServer(null)
      if (e.target.value.length) {
         setDataBlock({ data: e.target.value })
         setFlag(false)
      }
   }

   return (
      <div className="form-group">
         <label>Дата рождения</label>
         <input
            type="date"
            className="form-control"
            onKeyDown={(e) => e.preventDefault()}
            onBlur={e => blurHandler(e)}
            onChange={e => changeHandler(e)}
            ref={ref}
         />
         {flag && <div className="error">Это обязательное поле</div>}
      </div>
   )
}

export default DataInput