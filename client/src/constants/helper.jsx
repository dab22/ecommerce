// import {Star, StarHalf } from "lucide-react";
// import {Colors} from "./colors";
// export const starsGenerator=({
//     rating, 
//     stroke = "0",
//     size=28,
//     fill = Colors.customYellow
// }) =>{
//     return Array.from({length:5}, (elem, index)=>{
//         const number = index+0.5;
//         return(
//             <span key={index}>
//                 {rating >= index+1 ? (
//                     <Star fill={fill} stroke={stroke} size={size}/>
//                 ) : rating >= number ? (
//                     <StarHalf fill={fill} stroke={stroke} size={size}/>
//                 ) : (
//                     <Star stroke={Colors.customYellow} size={size}/>
//                 )}
//             </span>
//         )
//     })
// }













import { Star, StarHalf } from "lucide-react";
import { Colors } from "./colors";

export const starsGenerator = (
  rating,
  stroke = "0",
  size = 28,
  fill = Colors.customYellow
) => {
  return Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <Star fill={fill} stroke={stroke} size={size} />
        ) : rating >= number ? (
          <StarHalf fill={fill} stroke={stroke} size={size} />
        ) : (
          <Star stroke={fill} size={size} />
        )}
      </span>
    );
  });
};
