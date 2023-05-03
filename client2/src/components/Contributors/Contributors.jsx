
import React from 'react'
import './Contributors.css'
import logo from './schoollogo.jpg'

const Contributors = () => {
  return (
    <>

        <div className='contrib-parent'> 
             <div className='contrib-wrapper'>
                <div className='contrib-left'>
                    <img src={logo} style={{width:'200px', height:'200px'}} alt="" />
                    <h3 >INNAYAT FOUNDATION ACADEMY FOR THE DEAF</h3>
                    <p>Team pays regards to the head of institution for allowing the team to collect dataset from their students on their premises.
                        This would not have been possible without you.
                    </p>
                </div>
            </div>
        </div>
        

    </>
  )
}

export default Contributors;
