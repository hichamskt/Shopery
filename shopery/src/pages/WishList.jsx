import React, { useEffect, useState } from 'react';
import "../styles/Wishlist.css";
import axiosInstance from '../axios/axiosInstance';
import useAuth from '../hooks/useAuth';
import WishlistproductCard from '../components/WishlistproductCard/WishlistproductCard';

function WishList() {
  const [likedPrds, setLikedPrds] = useState([]);
  const [wishedlist,setWishedList]=useState([]);
  const [loading, setLoading] = useState(true); 
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.post("/user/getLikedProducts", {
          email: auth.email
        });
        const products = response.data.likedProducts;
         const productIds = response.data.likedProducts.map(product => product._id);
        setLikedPrds(productIds);
        setWishedList(products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("wishlist:",wishedlist)
  if (loading) {
    return <div className="wishlist-loading">Loading wishlist...</div>; 
  }

  return (
    <div className="wishlist">
      {wishedlist.length > 0 ? (
        wishedlist.map((prd, index) => (
          <WishlistproductCard  product={prd} key={index} likedPrds={likedPrds} setLikedPrds={setLikedPrds} />
        ))
      ) : (
        <div>No liked products yet.</div>
      )}
    </div>
  );
}

export default WishList;





