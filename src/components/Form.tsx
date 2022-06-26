import React, { FormEvent, useEffect, useState } from "react";
import DataInput from "./DataInpit";
import EmailInput from "./EmailInput";
import NameLastName from "./NameLastName";
import PhoneInput from "./PhoneInput";
import TextareaInput from "./TextareaInput";
import axios from 'axios'


const Form: React.FC = () => {
   const [effect, setEffect] = useState<boolean>(false)
   const [textServer, setTextServer] = useState<boolean | null>(null)

   const [notButtonClick, setNotButtonClick] = useState<boolean>(false)
   const [clearInp, setClearInp] = useState(false)
   const [notFetch, setNotFetch] = useState(false)

   const [textareaBlock, setTextareaBlock] = useState<object | boolean>(false)
   const [dataBlock, setDataBlock] = useState<object | boolean>(false)
   const [phoneBlock, setPhoneBlock] = useState<object | boolean>(false)
   const [emailBlock, setEmailBlock] = useState<object | boolean>(false)
   const [nameBlock, setNameBlock] = useState<object | boolean>(false)


   useEffect(() => {

      if (textareaBlock && dataBlock && phoneBlock && emailBlock && nameBlock) {
         setNotButtonClick(true)
         setClearInp(true)
         setNotFetch(false)

         setTimeout(() => {
            axios.post('http://localhost:4000/user', {
               name: nameBlock,
               email: emailBlock,
               phone: phoneBlock,
               data: dataBlock,
               textarea: textareaBlock,
            }).then(() => {
               setTextServer(true)
               setNotButtonClick(false)

               setTextareaBlock(false)
               setDataBlock(false)
               setPhoneBlock(false)
               setEmailBlock(false)
               setNameBlock(false)

               setClearInp(false)

            }).catch(() => {
               setTextServer(false)
               setNotButtonClick(false)
            })
         }, 1000)
      }

   }, [effect])

   const submitHendler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (textareaBlock && dataBlock && phoneBlock && emailBlock && nameBlock) {
         setEffect(!effect)
      } else {
         setNotFetch(true)
      }

   }


   return (
      <div className="form_block">
         <form noValidate onSubmit={(e) => submitHendler(e)}>
            <NameLastName setNameBlock={setNameBlock} clearInp={clearInp} setTextServer={setTextServer} />
            <EmailInput setEmailBlock={setEmailBlock} clearInp={clearInp} setTextServer={setTextServer} />
            <PhoneInput setPhoneBlock={setPhoneBlock} clearInp={clearInp} setTextServer={setTextServer} />
            <DataInput setDataBlock={setDataBlock} clearInp={clearInp} setTextServer={setTextServer} />
            <TextareaInput setTextareaBlock={setTextareaBlock} clearInp={clearInp} setTextServer={setTextServer} />
            <button
               type="submit"
               className="btn btn-primary"
               disabled={notButtonClick}
            >Отправить</button>
            {
               textServer
                  ? <div className="fetch_data">Ваши данные успешно отправлены</div>
                  : textServer === null
                     ? null
                     : <div className="error">Произошла ошибка</div>
            }
            {notFetch && <div className="error">Вы заполнили не все поля</div>}
         </form>
      </div >
   )
}

export default Form