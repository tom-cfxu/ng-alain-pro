import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-leakage-analysis',
  templateUrl: './leakage-analysis.component.html',
  styleUrls: ['./leakage-analysis.component.less']
})
export class LeakageAnalysisComponent implements OnInit {
  //漏损率设置
  LeakageRateOption = {
    backgroundColor: '#fff',
    tooltip: {
      formatter: '{a} <br/>{c}%'
    },
    grid: {
      left: "5%",
      top: "5%",
      bottom: "5%",
      right: "5%"
    },
    toolbox: {
      show: true,
      feature: {
        // mark: {show: true},
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '漏损率(%)',
        type: 'gauge',
        min: 0,
        max: 100,
        // splitNumber: 11,
        radius: '100%',
        color1: [[0.2, '#13c2c2'], [0.8, '#58afff'], [1, '#f47e92']],
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, '#13c2c2'], [0.8, '#58afff'], [1, '#f47e92']],
            width: 5,
            shadowColor: '#fff', //默认透明
            shadowBlur: 10
          }
        },
        axisLabel: {            // 坐标轴小标记
          fontWeight: 'bolder',
          color: '#333',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        },
        axisTick: {            // 坐标轴小标记
          length: 15,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor: '#fff', //默认透明
            shadowBlur: 10
          }
        },
        splitLine: {           // 分隔线
          length: 25,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            width: 1,
            color: [[0.2, '#13c2c2'], [0.8, '#58afff'], [1, '#f94141']],
            shadowColor: '#fff', //默认透明
            shadowBlur: 10,
            z: 1
          }
        },
        pointer: {           // 分隔线
          shadowColor: '#fff', //默认透明
          shadowBlur: 5
        },
        title: {
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 20,
            // fontStyle: 'italic',
            color: '#333',
            shadowColor: '#fff', //默认透明
            shadowBlur: 10
          }
        },
        detail: {
          backgroundColor: '#58afff',
          borderWidth: 0,
          // borderColor: '#fff',
          borderRadius: 4,
          shadowColor: '#fff', //默认透明
          shadowBlur: 5,
          lineHeight: 30,
          fontSize: 30,
          formatter: (value) => value.toFixed(0) + "%",
          // offsetCenter: [0, '55%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            color: '#fff'
          }
        },
        data: [{ value: 40, name: "漏损率(%)" }]
      },
    ]
  };
  //用水漏水量设置
  option2 = {
    color: ['#FFB070', '#58afff'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}吨 ({d}%)',

    },
    toolbox: {
      show: true,
      feature: {
        // mark: {show: true},
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['漏水量', '用水量'],
      // icon: [
      //   'path://M86.5,30.5C213.58,191.17,110,198.58,89.75,198.58c-2.06,0-3.25-.08-3.25-.08-138-6,0-168,0-168m.26-14.18-7.11,8.34A416.6,416.6,0,0,0,42,78.09c-24.18,41.19-31.44,73.55-21.58,96.18,8.94,20.52,31,31.7,65.61,33.22.4,0,1.72.09,3.71.09a101.07,101.07,0,0,0,29.69-4.43c15.71-5,27.19-14.26,33.21-26.7,7.22-14.92,6.71-34.19-1.53-57.28-9.25-25.95-28.62-57.66-57.56-94.25l-6.8-8.6Z',
      //   'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
      // ],
    },
    series: [
      {
        name: '用水漏水量',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '80%'],

        label: {
          position: 'inner',
          formatter: '{b}\n\n{d}%',
          fontSize: 15,
          // color: "#fff",
          borderWidth: 0
        },
        labelLine: {
          show: true
        },

        data: [
          { value: 1, name: '漏水量', selected: true },
          { value: 8, name: '用水量' },
        ]
      },
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
