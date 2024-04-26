// Trong file PieChart.tsx

import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import * as echarts from "echarts";

interface PieChartProps {
  data: { value: number; name: string }[];
  title: string;
  id: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, id }) => {
  const { theme } = useSelector((state: RootState) => state.global);
  useEffect(() => {
    const chartDom = document.getElementById(id)!;
    const myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          color: theme === "dark" ? "#fff" : "#000",
        },
        backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          padAngle: 2,
          top: 20,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderWidth: 2,
          },
          label: {
            color: theme === "dark" ? "#fff" : "#000",
          },
          data: data,
        },
      ],
    };

    window.addEventListener("resize", () => {
      myChart.resize();
    });

    myChart.setOption(option);

    return () => {
      window.removeEventListener("resize", () => {
        myChart.resize();
      });
      myChart.dispose();
    };
  }, [data, title, id, theme]);

  return <div id={id} style={{ width: "100%", height: "43vh" }}></div>;
};

export default PieChart;
