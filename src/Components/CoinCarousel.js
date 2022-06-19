import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { TrendingCoins } from '../Config/api'
import { CryptoState } from '../CryptoContext'
// import {Link} from 'react-router-dom'
import './Style.css'


function CoinCarousel() {
    const [trending,setTrending] = useState([]);
    const {currency,symbol} = CryptoState();
    const apiUrl = TrendingCoins(currency);

    const getTrandingCoins = async () =>{
        const data = await axios.get(apiUrl);
        setTrending(data.data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getTrandingCoins()},[currency]);

    // console.log(trending);

    const items = trending.map((coin)=>{

        return(
            <div
            // to={`/coin/${coin.id}`}
            style={{
                display:'flex', flexDirection:'column',alignItems:'center', textTransform:'uppercase',color:'white'
            }}>
            
                <img src={coin?.image} alt={coin.id} height="80" style={{marginBottom:10}}/>
                <span>{coin?.symbol} &nbsp;
                    <span>{coin.price_change_percentage_24h}</span>
                </span>
                <span>{symbol}&nbsp;{coin.current_price}</span>
            
            </div>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
      }

  return (
    <div style={{height:"50%", display:'flex',alignItems:'center', paddingBottom:'15px'}}>
        <AliceCarousel 
            items={items}
            mouseTracking
            infinite
            disableButtonsControls
            disableDotsControls
            autoPlay
            animationDuration={1500}
            autoPlayInterval={1000}
            responsive={responsive}
        />
    </div>
    
  )
}

export default CoinCarousel