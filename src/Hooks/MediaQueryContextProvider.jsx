import React from 'react'
import { MediaQueryContext } from "./MediaQueryContext";
import { useMediaQuery } from "react-responsive";


function MediaQueryContextProvider({children}) {

// DT = isDesktopOrLaptop :  1024 and above - desktop (default grid)
// TB = isTablet : 1024-768 - tablet landscape
// BP = isBigPhone : 768-480 - tablet 
// SM = isSmallPhone : 480-less - phone landscape & smaller

  const DT = useMediaQuery({ minWidth: 1024})
  const TB = useMediaQuery({ minWidth: 768, maxWidth:1024 })
  const BP = useMediaQuery({ maxWidth: 768, minWidth:480  })
  const SM = useMediaQuery({ maxWidth: 480, minWidth:0    })

  return (
    <MediaQueryContext.Provider value={{DT,TB,BP,SM}}>
        {children}
    </MediaQueryContext.Provider>
  )
}


export default MediaQueryContextProvider

