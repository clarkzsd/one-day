import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// component
import Tabs from '../../components/UI/Tabs';
import Header from '../../components/UI/Header';

// action
import { openDrawer } from '../../components/action';
import { fetchStatistics } from './action';

import Const from '../../base/constants';
import './style.scss';

const TabsPanel = Tabs.TabsPanel;

const last7DaysList = [];
const today = new Date().getDate();
for (let index = 6; index > -1; index--) {
  last7DaysList.push(moment().date(today - index).date());
}

let todayBarChart, todayPieChart, weekBarChart, weekPieChart;

class StatisticsScreen extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    fetchStatistics: PropTypes.func,
    todayStatistics: PropTypes.object,
    weekStatistics: PropTypes.object
  }

  componentDidMount () {
    todayBarChart = echarts.init(this.todayBarChart);
    todayPieChart = echarts.init(this.todayPieChart);
    weekBarChart = echarts.init(this.weekBarChart);
    weekPieChart = echarts.init(this.weekPieChart);
    const { fetchStatistics } = this.props;
    Promise.all([
      fetchStatistics('today'),
      fetchStatistics('week')
    ]).then(() => {
      const { todayStatistics, weekStatistics } = this.props;
      const todayData = todayStatistics.data;
      const weekData = weekStatistics.data;
      this.setBarChartOption(todayBarChart, Const.date.twentyFourHours, todayData.data.todayStatisticsList);
      this.setPieChartOption(todayPieChart, [
        {value: todayData.data.specificData.unfinished, name: '未完成'},
        {value: todayData.data.specificData.finished, name: '已完成'}
      ]);
      this.setBarChartOption(weekBarChart, last7DaysList, weekData.data.last7DaysStatisticsList);
      this.setPieChartOption(weekPieChart, [
        {value: weekData.data.specificData.unfinished, name: '未完成'},
        {value: weekData.data.specificData.finished, name: '已完成'}
      ]);
    });
  }

  setPieChartOption (chart, data) {
    if (chart.setOption) {
      chart.setOption({
        color: ['#009688'],
        roseType: 'radius',
        series: [
          {
            type: 'pie',
            radius: '45%',
            center: ['50%', '50%'],
            roseType: 'radius',
            data: data.sort(function (a, b) { return a.value - b.value; })
          }
        ]
      });
    }
  }

  setBarChartOption (chart, xAxisData, data) {
    if (chart.setOption) {
      chart.setOption({
        color: ['#03A9F4'],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 35
          }
        ],
        xAxis: {
          name: xAxisData.length === 24 ? '时' : '日',
          data: xAxisData
        },
        yAxis: {
          name: '完成任务/个'
        },
        series: [
          {
            name: '任务个数',
            type: 'bar',
            data: data
          }
        ]
      });
    }
  }

  handleTabClick = (key) => {
    if (key === '1') {
      console.log('trigger');
      weekBarChart.resize({
        width: todayBarChart.getWidth()
      });
      weekPieChart.resize({
        width: todayPieChart.getWidth(),
        height: 250
      });
    }
  }

  renderDataChart (time) {
    const statistics = this.props[`${time}Statistics`];
    const statisticsData = statistics.data.data;
    return (
      <div className='statisticsContainer__content'>
        <div className='statisticsContainer__barChart' ref={(ele) => { this[`${time}BarChart`] = ele; }} />
        <div className='statisticsContainer__percentageData'>
          <div className='statisticsContainer__pieChart' ref={(ele) => { this[`${time}PieChart`] = ele; }} />
          <div className='statisticsContainer__taskData'>
            {Const.task.taskStatisticsStatusList.map((item) => (
              <div className='taskDataItem' key={item.key}>
                <span className={`taskDataItem__number taskDataItem__number--${item.value}`}>
                  {
                    statisticsData ? statisticsData.specificData[item.value] : 'loading'
                  }
                </span>
                <span className='taskDataItem__label'>{item.value.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render () {
    const { openDrawer } = this.props;
    return (
      <div className='statisticsContainer'>
        <Header
          largeTitle='数据统计'
          leftIcon={<i className='material-icons'>menu</i>}
          onLeftPress={openDrawer}
        />
        <Tabs
          onTabClick={this.handleTabClick}
          defaultActiveKey='0'>
          {
            Const.date.statisticDateList.map((item, index) => {
              return (
                <TabsPanel
                  key={index}
                  panelKey={`${index}`}
                  tabTitle={item.value.toUpperCase()}>
                  {this.renderDataChart(item.value)}
                </TabsPanel>
              );
            })
          }
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchStatistics: (type) => dispatch(fetchStatistics(type))
  };
};

const mapStateToProps = ({ statistics }) => {
  return {
    todayStatistics: statistics.today,
    weekStatistics: statistics.week
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
