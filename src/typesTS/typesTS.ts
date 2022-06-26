import { Dispatch, SetStateAction } from "react"

export interface PropsNameBlock {
   setNameBlock: Dispatch<SetStateAction<boolean | object>>
   clearInp: boolean
   setTextServer: Dispatch<SetStateAction<boolean | null>>
}

export interface PropsEmailBlock {
   setEmailBlock: Dispatch<SetStateAction<boolean | object>>
   clearInp: boolean
   setTextServer: Dispatch<SetStateAction<boolean | null>>
}

export interface PropsPhoneBlock {
   setPhoneBlock: Dispatch<SetStateAction<boolean | object>>
   clearInp: boolean
   setTextServer: Dispatch<SetStateAction<boolean | null>>
}

export interface PropsDataBlock {
   setDataBlock: Dispatch<SetStateAction<boolean | object>>
   clearInp: boolean
   setTextServer: Dispatch<SetStateAction<boolean | null>>
}

export interface PropsTextareaBlock {
   setTextareaBlock: Dispatch<SetStateAction<boolean | object>>
   clearInp: boolean
   setTextServer: Dispatch<SetStateAction<boolean | null>>
}

