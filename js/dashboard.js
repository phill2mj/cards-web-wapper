function generateGauge(value) {
  $("#gaugeContainer").dxCircularGauge({
    scale: {
      startValue: 0,
      endValue: 100,
      majorTick: {
        tickInterval: 10
      }
    },

    rangeContainer: {
      backgroundColor: "none",
      ranges: [
        {
          startValue: 0,
          endValue: 33,
          color: "#A6C567"
        },
        {
          startValue: 33,
          endValue: 66,
          color: "#FCBB69"
        },
        {
          startValue: 66,
          endValue: 100,
          color: "#E19094"
        }
      ]
    },

    needles: [ { value: value } ],

    markers: [ { value: value } ]
  });
}

function generateGauge2(value) {
  $("#gaugeContainer2").dxCircularGauge({
    scale: {
      startValue: 0,
      endValue: 100,
      majorTick: {
        tickInterval: 10
      }
    },

    rangeContainer: {
      backgroundColor: "none",
      ranges: [
        {
          startValue: 0,
          endValue: 33,
          color: "#A6C567"
        },
        {
          startValue: 33,
          endValue: 66,
          color: "#FCBB69"
        },
        {
          startValue: 66,
          endValue: 100,
          color: "#E19094"
        }
      ]
    },

    needles: [ { value: value } ],

    markers: [ { value: value } ]
  });
}

function generateGauge3(value) {
  $("#gaugeContainer3").dxCircularGauge({
    scale: {
      startValue: 0,
      endValue: 100,
      majorTick: {
        tickInterval: 10
      }
    },

    rangeContainer: {
      backgroundColor: "none",
      ranges: [
        {
          startValue: 0,
          endValue: 33,
          color: "#A6C567"
        },
        {
          startValue: 33,
          endValue: 66,
          color: "#FCBB69"
        },
        {
          startValue: 66,
          endValue: 100,
          color: "#E19094"
        }
      ]
    },

    needles: [ { value: value } ],

    markers: [ { value: value } ]
  });
}

function dashboardFunction() {
  //this code will begin executing as soon as BajaScript itself is ready to go.
  var subGauge = new baja.Subscriber();

  var subGauge2 = new baja.Subscriber();

  var subGauge3 = new baja.Subscriber();

  subGauge.attach("subscribed changed", function () {

      generateGauge(this.getOutDisplay());

  });

  subGauge2.attach("subscribed changed", function () {

      generateGauge2(this.getOutDisplay());

  });

  subGauge3.attach("subscribed changed", function () {

      generateGauge3(this.getOutDisplay());

  });

  baja.Ord.make("station:|slot:/Points/StatusNumericToInt").get({subscriber: subGauge});

  baja.Ord.make("station:|slot:/Points/StatusNumericToInt1").get({subscriber: subGauge2});
  
  baja.Ord.make("station:|slot:/Points/StatusNumericToDouble").get({subscriber: subGauge3});

  var zoomingData = [];

  baja.Ord.make("history:/Cards/SineWave").get({
    cursor: {
      each: function () {
        // Add each element to the array
        zoomingData.push({
          arg: Date.parse(this.getDisplay("timestamp"), "t"),
          y2: this.get("value")
        });
      },
      limit: 100, // Specify optional limit on the number of records (defaults to 10)
      offset: 0 // Specify optional record offset (defaults to 0)
    }
  });

  baja.Ord.make("history:/Cards/Random").get({
    cursor: {
      after: function () {
        $(function () {
          var series = [{
              argumentField: "arg",
              valueField: "y1"
            }, {
              argumentField: "arg",
              valueField: "y2"
            }];

          var model = {};
          model.chartOptions = {
            argumentAxis: {
              minValueMargin: 0,
              maxValueMargin: 0
            },
            dataSource: zoomingData,
            series: series,
            legend: {
              visible: true
            }
          };

          model.rangeOptions = {
            size: {
              height: 120
            },
            margin: {
              left: 10
            },
            dataSource: zoomingData,
            chart: {
              series: series
            },
            behavior: {
              callSelectedRangeChanged: "onMoving"
            },
            selectedRangeChanged: function (e) {
              var zoomedChart = $("#chartContainer #zoomedChart").dxChart("instance");
              zoomedChart.zoomArgument(e.startValue, e.endValue);
            }
          };

          var html = [
            '<div id="zoomedChart" data-bind="dxChart: chartOptions" style="height: 350px"></div>',
            '<div data-bind="dxRangeSelector: rangeOptions" style="height: 80px"></div>'
          ].join('');

          $("#chartContainer").append(html);
          ko.applyBindings(model, $("#chartContainer")[0]);
        }
          );
      },
      each: function () {
        // Add each element to the array
        zoomingData.push({
          arg: Date.parse(this.getDisplay("timestamp"), "t"),
          y1: this.get("value")
        });
      },
      limit: 100, // Specify optional limit on the number of records (defaults to 10)
      offset: 300 // Specify optional record offset (defaults to 0)
    }
  });
}