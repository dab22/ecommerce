
// import { useEffect, useState } from "react";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { TrendingUp } from "lucide-react";
// import axios from "axios";
//  import { Colors } from "@/constants/colors";
// const chartConfig = {
//   keyboard: {
//     label: "Keyboard",
//     color: Colors.customYellow,
//   },
//   mouse: {
//     label: "Mouse",
//     color: Colors.customGray,
//   },
//   headset: {
//     label: "Headset",
//     color: Colors.customIsaBelline,
//   },
// };

// // Utility to get last 6 months (current + previous 5)
// const getLastSixMonths = () => {
//   const months = [];
//   const now = new Date();

//   for (let i = 5; i >= 0; i--) {
//     const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const monthName = date.toLocaleString("default", { month: "long" });
//     months.push(monthName);
//   }

//   return months;
// };

// export function Chart1() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const res = await axios.get(import.meta.env.VITE_API_URL + "/get-metrics", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const raw = res.data?.data?.sixMonthsBarChartData || {};
//         const months = getLastSixMonths();

//         // Fill missing months and missing categories with 0
//         const formatted = months.map((month) => {
//           const values =
//             raw[month] || raw[month.toLowerCase()] || raw[month.slice(0, 3)] || {};
//           return {
//             month,
//             keyboard: values.Keyboard || 0,
//             mouse: values.Mouse || 0,
//             headset: values.Headset || 0,
//           };
//         });

//         setChartData(formatted);
//       } catch (err) {
//         console.error("Error loading chart data:", err);
//       }
//     };

//     fetchChartData();
//   }, []);

//   return (
//     <Card className="flex-1 rounded-xl bg-muted/50 md:min-hmin">
//       <CardHeader>
//         <CardTitle>Bar Chart - Multiple</CardTitle>
//         <CardDescription>
//           Last 6 Months (incl. current)
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip content={<ChartTooltipContent />} />
//             <Bar
//               dataKey="keyboard"
//               fill={chartConfig.keyboard.color}
//               radius={4}
//               minPointSize={2}
//             />
//             <Bar
//               dataKey="mouse"
//               fill={chartConfig.mouse.color}
//               radius={4}
//               minPointSize={2}
//             />
//             <Bar
//               dataKey="headset"
//               fill={chartConfig.headset.color}
//               radius={4}
//               minPointSize={2}
//             />
//           </BarChart>
//         </ChartContainer>
//         {/* <CardFooter className="flex-col gap-2 items-start text-sm ">
//           <div className="flex gap-2 font-medium leading-none">
//             Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//           </div>
//           <div className="leading-none text-muted-foreground">
//             Showing total visitors for the last 6 months
//           </div>
//         </CardFooter> */}
//       </CardContent>
//     </Card>
//   );
// }




























import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TrendingUp } from "lucide-react";
import axios from "axios";
 import { Colors } from "@/constants/colors";
const chartConfig = {
  laptop: {
    label: "laptop",
    color: Colors.customYellow,
  },
  earbuds: {
    label: "earbuds",
    color: Colors.customGray,
  },
  mobile: {
    label: "mobile",
    color: Colors.customIsaBelline,
  },
};

// Utility to get last 6 months (current + previous 5)
const getLastSixMonths = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    months.push(monthName);
  }

  return months;
};

export function Chart1() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/get-metrics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const raw = res.data?.data?.sixMonthsBarChartData || {};
        const months = getLastSixMonths();

        // Fill missing months and missing categories with 0
        const formatted = months.map((month) => {
          const values =
            raw[month] || raw[month.toLowerCase()] || raw[month.slice(0, 3)] || {};
          return {
            month,
            laptop: values.laptop || 0,
            earbuds: values.earbuds || 0,
            mobile: values.mobile || 0,
          };
        });

        setChartData(formatted);
      } catch (err) {
        console.error("Error loading chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-hmin">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>
          Last 6 Months (incl. current)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="laptop"
              fill={chartConfig.laptop.color}
              radius={4}
              minPointSize={2}
            />
            <Bar
              dataKey="earbuds"
              fill={chartConfig.earbuds.color}
              radius={4}
              minPointSize={2}
            />
            <Bar
              dataKey="mobile"
              fill={chartConfig.mobile.color}
              radius={4}
              minPointSize={2}
            />
          </BarChart>
        </ChartContainer>
        {/* <CardFooter className="flex-col gap-2 items-start text-sm ">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </CardContent>
    </Card>
  );
}

















