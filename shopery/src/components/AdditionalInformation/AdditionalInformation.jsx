import React from 'react'
import { useOutletContext } from 'react-router-dom';
import '../AdditionalInformation/AdditionalInformation.css';


function AdditionalInformation() {
  const Product=useOutletContext();
  

  return (
    <div className='AdditionalInformation'>
      <table>
        <tbody>
          <tr>
            <td>Weight:</td>
            <td>{Product.weigth}</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>{Product.color}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{Product.type}</td>
          </tr>
          <tr>
            <td>Category:</td>
            <td>{Product.category.name}</td>
          </tr>
          <tr>
            <td>Stock Status:</td>
            <td>{Product.status}({Product.stock})</td>
          </tr>
          <tr>
            <td>Tags:</td>
            <td>{Product.tags}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdditionalInformation