import entity from "./organization"
import people from "./auth"

const graphResolver = {
  ...entity,
  ...people
};



export default graphResolver