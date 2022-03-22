import React from 'react'
import { jsx, Global, css } from "@emotion/core";
 
const Main = () => {
    return (
        <>
        <Global
        styles={css`
           .main {
               display: grid;
               grid-template-columns: 3fr 1fr;
               margin-bottom: 3rem;
               .main_left {

                   .main_left_articles{
                       display:grid;
                       grid-template-columns: 1fr 1fr 1fr;
                       grid-gap: 1rem;
                       .main_left_cards {
                           height: 300px;
                           background: whitesmoke;
                           background: #EBEBEB;
                           border-radius: 8px;
                       }
                   }
               }
               .main_right{
                   background: #EBEBEB;
                   margin-left: 2rem;
                   margin-top: 5rem;
                   border-radius: 8px;
               }
           }
        `}
        />
        <div className='main'>
           <div className='main_left'>
              <h1>Latest Articles</h1>
              <div className='main_left_articles'>
                 <div className='main_left_cards'>

                 </div>
                 <div className='main_left_cards'>

                 </div>
                 <div className='main_left_cards'>

                 </div>
                 <div className='main_left_cards'>

                 </div>
                 <div className='main_left_cards'>

                 </div>
                 <div className='main_left_cards'>

                 </div>

              </div>
           </div>
           <div className='main_right'>
              
           </div>
        </div>
        </>
    )
}

export default Main
