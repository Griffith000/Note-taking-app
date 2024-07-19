import React, { useEffect } from 'react'
import {LuCheck } from 'react-icons/lu'
import {MdDeleteOutline} from 'react-icons/md'
const ToastMessage = ({type , message , isShown,onClose}) => {
    useEffect(() => {
        const timerId = setTimeout(() => {
            onClose()
        }
        , 3000)
        return () => {
            clearTimeout(timerId)
        }

    }, [onClose])
    return (
        <div className={`absolute top-28 right-6 transition-all duration-400 ${isShown ? "opacity-100" : "opacity-0"}`}>
            <div className={`min-w-52 bg-white border rounded-md shadow-2xl after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : type === "success" ? "after:bg-green-500" : "after:bg-gray-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
                <div className="flex items-center px-4 py-4 gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50" : type === "success" ? "bg-green-50" : "bg-gray-50"}`}>
                    {type === "delete" ? <MdDeleteOutline size={20} className='text-red-500'/> :
                    type === "success" ? <LuCheck size={20} className='text-green-500' /> : <LuCheck size={20} className='text-gray-500' />}
                </div>    
                  <p className=''>{message}</p>
                </div>
            </div>
        </div>

    )
}

export default ToastMessage