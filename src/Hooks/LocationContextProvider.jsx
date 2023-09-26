import {useState } from "react";
import { LocationContext } from "./LocationContext";
import React from 'react'
import myJson from './cities-to-countries.json'
import nameToCode from './nameToCode.json'
import meta from './meta.json'


const supportedCountryCodes = [
  "AE","AR","AS","AT","AU","BE","BR","CA",
  "CH","CL","CN","CO","DE","DK","ES","FI",
  "FR","GB","GR","HK","HU","ID","IE","IN",
  "IS","IT","JP","KR","MX","MY","NL",
  "NO","NZ","PE","PH","PT","SE","SG","TH","TR",
  "TW","US","VN","ZA"
]

const regionNames = new Intl.DisplayNames(
  ['en'], {type: 'region'}
);

var userCity;
var userCountry;
var userTimeZone;
var userCountryCode;
var currLocation

if (Intl) {
  userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
  userCity = userTimeZone[userTimeZone.length - 1];
  userCountry = myJson[userCity];
  currLocation = userCountry
  console.log(currLocation)
}

function getUserOuntryCode(obj, key) {
  for (const k in obj) {
    if (k === key) {
      return obj[k];
    }
  }
  return null;
}

const theCode = getUserOuntryCode(nameToCode,userCountry)
userCountryCode = theCode == null? "US" : theCode;
const userMeta =  meta[userCountryCode]
const metaInformation = userMeta == null || userMeta == undefined ? meta["US"] : userMeta

let supportedCountries = [] 
supportedCountryCodes.forEach(country=>{
    supportedCountries.push(regionNames.of(country))
})

function LocationContextProvider({children}) {

  const [usrLocation,setLocation] = useState(metaInformation)

  return (
    <LocationContext.Provider value={[usrLocation,setLocation,supportedCountries,currLocation]}>
        {children}
    </LocationContext.Provider>
  )
}


export default LocationContextProvider

