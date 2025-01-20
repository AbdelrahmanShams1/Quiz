
import ClipLoader from "react-spinners/ClipLoader";

const over = {
    display : "block",
    margin : '100px auto '
}

const ReactSpinner = ({loading}) => {
  
 
    return (
    <ClipLoader 
    color= '#4338ca'
    loading = {loading}
    cssOverride={over}
    size={150}
    />
  )
  
}

export default ReactSpinner