import React from 'react'
import '../NewsCard/NewsCard.css'
import { CiShoppingTag } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaArrowRightLong } from 'react-icons/fa6'

function NewsCard({news}) {
  return (
    <div className='newscard'>
        <div style={{position:'relative'}}>
            
        <img src={news.images} alt="" />
        <span className='newscarddate'>
        <p >{news.createdAt}</p>
        <p>Nev</p>
        </span>
        </div>
        <div className='newstextsection'>
            
        <div className='newtopsection'>
        <span>
        <CiShoppingTag />
        <p>{news.topic}</p>
        </span>
        <span>
        <IoPersonOutline />
        <p>By Admin</p>
        </span>
        <span>
        <FaRegCommentAlt />
        <p>{news.comments} comments</p>
        </span>
        </div>
        <p className='newstitle'>{news.title}</p>
        <p className='readmore'>Read More <FaArrowRightLong/></p>
        </div>
    </div>
  )
}

export default NewsCard