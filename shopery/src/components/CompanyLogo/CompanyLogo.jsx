import React from 'react'
import '../CompanyLogo/CompanyLogo.css'

import company1 from "../../assets/line0.png"
import company2 from "../../assets/line1.png"
import company3 from "../../assets/line3.png"
import company4 from "../../assets/line4.png"
import company5 from "../../assets/line5.png"
import company6 from "../../assets/line2.png"



function CompanyLogo() {
  return (
    <div className='container'>
<div className='companylogo'>
<img src={company1} alt='logo'/>
<span></span>
<img src={company2} alt='logo'/>
<span></span>
<img src={company3} alt='logo'/>
<span></span>
<img src={company4} alt='logo'/>
<span></span>
<img src={company5} alt='logo'/>
<span></span>
<img src={company6} alt='logo'/>

</div>
  </div>
  )
}

export default CompanyLogo