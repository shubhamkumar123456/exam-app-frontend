import React from 'react'
import { SpinnerInfinity } from 'spinners-react';
const LoaderComponent = ({show}) => {
  return show &&(
    <div className=' text-center p-4 loader'>
       <div className="loaderContent">
       <SpinnerInfinity size={"200px"}/>
       <p><small>loading...</small></p>
       </div>
    </div>
  )
}

export default LoaderComponent
