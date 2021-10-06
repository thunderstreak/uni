import { getMockDecorator } from '@/decorator/apply'

export const getMockSensorData = getMockDecorator(() => {
  return Promise.resolve([
    {
      "sensorData": 19,
      "sensorName": "温度"
    },
    {
      "sensorData": 3,
      "sensorName": "湿度"
    },
    {
      "sensorData": 1346,
      "sensorName": "二氧化碳浓度"
    },
    {
      "sensorData": 1.813,
      "sensorName": "挥发有机物浓度"
    },
    {
      "sensorData": 219,
      "sensorName": "PM2.5"
    },
    {
      "sensorData": 934,
      "sensorName": "PM10"
    },
    {
      "sensorData": 0.258,
      "sensorName": "甲醛"
    }
  ])
})

export const getMockLightState = getMockDecorator(() => {
  return Promise.resolve([
	{
		"ioIndex": 0,
		"lightName": "主卧灯",
		"lightState": 0
	},
	{
		"ioIndex": 1,
		"lightName": "次卧灯",
		"lightState": 0
	},
	{
		"ioIndex": 2,
		"lightName": "客厅灯",
		"lightState": 0
	},
	{
		"ioIndex": 3,
		"lightName": "玄关灯",
		"lightState": 0
	},
	{
		"ioIndex": 4,
		"lightName": "厨房灯",
		"lightState": 0
	},
	{
		"ioIndex": 5,
		"lightName": "楼梯灯",
		"lightState": 0
	},
	{
		"ioIndex": 6,
		"lightName": "二楼灯",
		"lightState": 0
	},
	{
		"ioIndex": 7,
		"lightName": "备用",
		"lightState": 0
	}
])
})

