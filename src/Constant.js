import { Component } from "react"

export const AvailablePrizes = [
    { "name": "10% Discount", "count": 25 },
    { "name": "50% Discount on Accessories", "count": 20 },
    { "name": "5.1 Home Theatre", "count": 1 },
    { "name": "NeckBand", "count": 5 },
    { "name": "SmartBand", "count": 7 },
    { "name": "HeadSet", "count": 10 },
    { "name": "BackCase", "count": 15 },
    { "name": "MI powerBank", "count": 3 },
    { "name": "None" },
]

export const Prizes = getPrizesName()
function getPrizesName(){
    var prizeNameDetail = []
    AvailablePrizes.map(prize => {
        prizeNameDetail.push(prize.name)
})
    return prizeNameDetail
}
export const currentPrizes = getPrizesName()

export function updatePrizeList(prizeName){
    console.log("before updatePrizeList "+JSON.stringify(AvailablePrizes))
    AvailablePrizes.filter(x=>{
     if(x.name == prizeName) {
         x.count =x.count-1;
     }  
    })  
    console.log("after updatePrizeList "+JSON.stringify(AvailablePrizes))
return AvailablePrizes
}
