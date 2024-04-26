import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import * as echarts from "echarts";

interface LineChartProps {
  data?: { value: number[]; categories: string[] };
  title: string;
  id: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, id }) => {
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
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: data?.categories,
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          type: "line",
          smooth: true,
          itemStyle: {
            color: "#009C9C",
          },
          data: data?.value || [],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: "#13C2C2" },
              { offset: 0.7, color: "#44D6D6" },
              { offset: 0, color: "#B5EEEE" },
            ]),
          },
        },
      ],
    };

    // Resize chart with window
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

export default LineChart;
