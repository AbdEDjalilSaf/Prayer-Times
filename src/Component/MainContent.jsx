import React, { useEffect, useState } from 'react'
import isha from '../assets/isha.jpg'
import magreb from '../assets/magreb.jpg'
import aser from '../assets/aser.jpeg'
import duher from '../assets/duher.jpg'
import fajr from '../assets/fajr.jpeg'
// import Prayer from './Prayer'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css'
import axios from "axios"
import moment from "moment"
import "moment/dist/locale/ar-dz"

moment.locale("ar");

export default function MainContent() {


const [prayerNameIndex,setPrayerNameIndex] = useState(1);


const [timings,setTimings] = useState({
  "Fajr" : "04:21",
  "Dhuhr" : "12:21",
  "Asr" : "15:21",
  "Maghrib" : "17:21",
  "Isha" : "18:21",
  
});



const [selectedCity,setSelectedCity] = useState( {
  displayName : "الجزائر العاصمة",
  apiName : "alger"
});

const [reminingTime,setReminingTime] = useState("");

const [momente,setMomente] = useState("ماي  2024");



const avalibleCites = [
  {
    displayName : "الجزائر العاصمة",
    apiName : "alger"
  },
  {
    displayName : "ورقلة",
    apiName : "ourgla"
  },
  {
    displayName : "وهران",
    apiName : "oran"
  }
  
]

const praryArray = [
  {key:"Fajr",displayName:"الفجر"},
  {key:"Dhuhr",displayName:"الظهر"},
  {key:"Asr",displayName:"العصر"},
  {key:"Maghrib",displayName:"المغرب"},
  {key:"Isha",displayName:"العشاء"}
]


// get Prary Api's -------------------------------------------------------------- */
const getTimings = async ()=>{

 const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity/:date?country=DZ&city=${selectedCity.apiName}`);
 console.log(response.data.data.timings);
 console.log("get Api Complete");
 setTimings(response.data.data.timings);
}
 

// First use Effect -------------------------------------------------------------- */
useEffect(()=>{

  getTimings();

},[selectedCity]);


// Second use Effect -------------------------------------------------------------- */
useEffect(()=>{

const Interval = setInterval(()=>{

  setupConterDownTimer();

},1000);


return (()=>{

  clearInterval(Interval);
})

},[timings]);


// Third use Effect -------------------------------------------------------------- */
useEffect(()=>{
 
const t = moment();
setMomente(t.format('MMMM Do YYYY | h:mm'));

},[]);


// setupConterDownTimer -------------------------------------------------------------- */
const setupConterDownTimer = ()=>{

const momentNow = moment();
let nextPrayer  = null;



if(momentNow.isAfter(moment(timings["Fajr"],"hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
  nextPrayer = 1;
}else if(momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm")) && momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
  nextPrayer = 2;
}else if(momentNow.isAfter(moment(timings["Asr"],"hh:mm")) && momentNow.isBefore(moment(timings["Maghrib"],"hh:mm"))){
  nextPrayer = 3;
}else if(momentNow.isAfter(moment(timings["Maghrib"],"hh:mm")) && momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
  nextPrayer = 4;
}else {
  console.log("fajr yes");
  nextPrayer = 0;
}

setPrayerNameIndex(nextPrayer);

//reminingMountTime ------------------------------------------------------------- */
const nextPrayerObject = praryArray[nextPrayer];
const nextPrayerTime = timings[nextPrayerObject.key];
const nextPrayerTimeMoment = moment(nextPrayerTime,"hh:mm");
let reminingMount = moment(nextPrayerTime,"hh:mm").diff(momentNow);

if(reminingMount < 0){
  const midNightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow);
  const FajrMidNightDiff = nextPrayerTimeMoment.diff(moment("00:00:00","hh:mm:ss"));
  console.log("Fajr time ",FajrMidNightDiff);
  const totalTimeToFajr = midNightDiff + FajrMidNightDiff;
  reminingMount = totalTimeToFajr;
  // console.log(totalTimeToFajr);
}


const reminingMountDown = moment.duration(reminingMount);

setReminingTime(`${reminingMountDown.hours()} : ${reminingMountDown.minutes()} : ${reminingMountDown.seconds()}  `);


console.log("time issus is :",
reminingMountDown.hours(),
reminingMountDown.minutes(),
reminingMountDown.seconds()
);

}




const hindelCityChange = (event)=>{
  const objectCity = avalibleCites.find((city)=>{
    return city.apiName == event.target.value;
  })
    console.log("new city is ",event.target.value);
    setSelectedCity(objectCity);
}




return (
  <>
  <div className='relative w-full '>
  <div className='container justify-evenly  flex-wrap mb-3 sm:gap-5 lg:gap-48 flex xl:gap-60'>
  <div className='font-semibold flex flex-col items-end  mb-6'>

<h2>متبقي حتى صلاة {praryArray[prayerNameIndex].displayName}</h2>
<h3 className='font-bold text-4xl mt-4'>{reminingTime}</h3>
  </div>
  <div className='font-semibold flex flex-col items-end '>

<h2>{momente}</h2>
<h3 className='font-bold text-4xl mt-4'>{selectedCity.displayName}</h3>
  </div>
</div>
<span className='w-full absolute left-0 h-[1px] bg-[#777] rounded '></span>

  <div className='mb-16'>
<div className='grid  lo:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ml:grid-cols-5  mt-16 '>


<div className='m-3 lo:mb-20 lg:mb-9 ml:mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={isha} />
<div className='bg-white flex flex-col justify-end items-end px-5  py-5  text-black'>
<h4 className='font-bold'>العشاء</h4>
<h1 className='mt-7 text-7xl font-thin'>{timings.Isha}</h1>
</div>
</div>
{/* <Prayer name="العشاء" time="04:21"  image={isha} /> */}
<div className='m-3 lo:mb-20 lg:mb-9 ml:mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={magreb} />
<div className='bg-white flex flex-col justify-end items-end px-5  pt-11 pb-5  text-black'>
<h4 className='font-bold'>المغرب</h4>
<h1 className='mt-7 text-7xl font-thin'>{timings.Maghrib}</h1>
</div>
</div>
{/* <Prayer name="المغرب" time="04:21"  image={magreb}/> */}
<div className='m-3 lo:mb-20 lg:mb-9 ml:mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={aser} />
<div className='bg-white flex flex-col justify-end items-end px-5  pt-16 pb-4  text-black'>
<h4 className='font-bold'>العصر</h4>
<h1 className='mt-7 text-7xl font-thin'>{timings.Asr}</h1>
</div>
</div>
{/* <Prayer name="العصر" time="04:21"  image={aser}/> */}
<div className='m-3 lo:mb-20 lg:mb-9 ml:mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={duher} />
<div className='bg-white flex flex-col justify-end items-end px-5  pt-16 pb-5  text-black'>
<h4 className='font-bold'>الظهر</h4>
<h1 className='mt-7 text-7xl font-thin'>{timings.Dhuhr}</h1>
</div>
</div>
{/* <Prayer name="الظهر" time="04:21"  image={duher}/> */}
<div className='m-3 lo:mb-20 lg:mb-9 ml:mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={fajr} />
<div className='bg-white flex flex-col justify-end items-end px-5  py-[22px]  text-black'>
<h4 className='font-bold'>الفجر</h4>
<h1 className='mt-7 text-7xl font-thin'>{timings.Fajr}</h1>
</div>
</div>
{/* <Prayer name="الفجر" time="04:21"  image={fajr}/> */}

</div>
    </div>
    {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}

    <FormControl className='w-[20%] mt-44 border-white'>
        <InputLabel id="demo-simple-select-label" >المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          className='border-white text-red-600  select-none'
          onChange={hindelCityChange}
        >
        {avalibleCites.map((city)=>{
            return (
            <MenuItem value={city.apiName} key={city.apiName}>
            {city.displayName}
            </MenuItem>
            )
        })}
          
        </Select>
      </FormControl>

    </div>
    </>
  )
}


// https://api.aladhan.com/v1/timingsByCity/:date?country=DZ&city=ourgla
