import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '../medical.css'
export const OurPharmacy =()=>{
  const [isLoaded , setLoaded] = useState(false);
  const [error , setError] = useState(null);
  const [OurPharmacy , setOurPharmacy] = useState();

  useEffect(()=>{
    axios({
        method:'GET',
        url: "http://localhost:3000/Pharmacy"
    }).then(response =>{
       console.log(response.data)
        setOurPharmacy(response.data)
        setLoaded(true) 
   })
   .catch(error =>{
    setLoaded(true)
    setError(error)
 })
  }, [])

  if(error){//handling error
    return <div>Error: {error.message}</div>

    }else if(!isLoaded){//handling loading
        return <div className='fw-bold text-center shadow-lg m-4 p-5 border'>Loading...</div>

    }else{
    return (//maping to show our data
        <div className="row row-cols-1 row-cols-md-4 ">
            {OurPharmacy.map(pharmacyItem =>{
                return(//maping to show our data
                        <div className="col mt-5 col-lg-3 col-md-4 col-sm-6" key={pharmacyItem.pharmacy_id}>
                            <div className="card h-100 shadow bg-body rounded border-0 pharmacy-card">
                                <div className='card-pharmacyImage h-50'>
                                <img src={pharmacyItem.pharmacy_icon} className="card-img-top h-100 " alt="pharmacy shop"/>
                                </div>
                                <div className="card-body">
                                  <h5 className="card-title">{pharmacyItem.pharmacy_title}</h5>
                                  <p className="card-text text-black-50 mb-2 ">{pharmacyItem.pharmacy_description}</p>
                                {/**buttom to learn more about pharmacy*/}
                                  <button id='medical-more' className='btn mt-2'>
                                       Learn more...
                                  </button>
                                </div>
                            </div>
                        </div>
                    
                
                )
            })}
        </div>
      );
}
}
