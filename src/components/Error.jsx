import { useState } from "react";

const Error = ({children}) => { //Extraemos el prop 'mensaje'
  return (
        <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded'>
          {children} {/**Lo imprimimos */}
        </div>
       /**Si hay error, imprime el string */
  )
}

export default Error;