
import React from 'react'

const BannerImage = ({image}) => {
  return (
    <div style={{width:'100%'}}>
        <img style={{width:'100%'}} src={image} alt="banner" />
    </div>
  )
}


export default BannerImage;
