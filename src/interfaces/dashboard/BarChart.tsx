import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import * as echarts from "echarts";

interface BarChartProps {
  data: { categories: string[]; data: number[] };
  title: string;
  id: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, id }) => {
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
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b}: {c}",
        textStyle: {
          color: theme === "dark" ? "#fff" : "#000",
        },
        backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: data.categories,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: false,
        },
      ],
      series: [
        {
          name: "Status",
          type: "bar",
          barWidth: "60%",
          data: data.data,
          label: {
            show: true,
            position: "top",
            color: theme === "dark" ? "#fff" : "#000",
          },
          // Làm tròn cột
          itemStyle: {
            borderRadius: [15, 15, 0, 0],
          },
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "#13C2C2" },
            { offset: 0.7, color: "#44D6D6" },
            { offset: 0, color: "#B5EEEE" },
          ]),
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

  return <div id={id} style={{ width: "100%", height: "43vh" }} />;
};

export default BarChart;
