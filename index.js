
am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX:true
  }));
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 10
  });
  
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  // added for white fonts 
    xAxis.get("renderer").labels.template.setAll({
      fill: root.interfaceColors.get("alternativeText")
    });
    xAxis.setAll({
      background: am5.Rectangle.new(root, {
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0.7,
        color:"ffffff"
      })
    });
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  // added for white fonts 
    yAxis.get("renderer").labels.template.setAll({
      fill: root.interfaceColors.get("alternativeText")
    });
    yAxis.setAll({
      background: am5.Rectangle.new(root, {
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0.7
      })
    });
  
  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelText:"{valueY}"
    })
  }));
  
  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  series.columns.template.adapters.add("fill", function(fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  series.columns.template.adapters.add("stroke", function(stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  series.set("fill", am5.color(0xff0000));
  // Set data
  var data = [{ country: "INDIA",value: 2025}, {
    country: "China",
    value: 1882
  }, {
    country: "Japan",
    value: 1809
  }, {
    country: "Germany",
    value: 1322
  }, {
    country: "UK",
    value: 1122
  }, {
    country: "France",
    value: 1114
  }, {
    country: "India",
    value: 984
  }, {
    country: "Spain",
    value: 711
  }, {
    country: "Netherlands",
    value: 665
  }, {
    country: "South Korea",
    value: 443
  }, {
    country: "Canada",
    value: 441
  }];
  
  function insert_random_values()
  {
    data.forEach((element, index) => {
      data[index]["value"] = Math.ceil(Math.random()*10000);
    });
  }
  
  // timer of 5 minutes to auto update 
    setInterval(() => {
      clearInterval(insert_values);
    }, 300000);
  
  // TO STOP TIMER 
    var stop_timer=document.getElementById("stop_timer")
    stop_timer.addEventListener('click', e => {
      clearInterval(insert_values);
      startTimer(0,document.querySelector('#time'));
      delete window.setInterval;
    });
  
  // insertion of random values for x minutes 
    var insert_values =  setInterval(() => { 
        insert_random_values()  
      }, 2000);
  
  // data fed into the table timer 
    setInterval(() => { 
      series.data.setAll(data) 
    }, 0000);
   
  xAxis.data.setAll(data);
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
  
  }); // end am5.ready()
  // timer function 
    function startTimer(duration, display,v) {
      var timer = duration, minutes, seconds;
         setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          display.textContent = minutes + ":" + seconds;
  
          if (--timer < 0) {
              timer = duration;
          }
      }, 1000);
    }
  
      window.onload = function () {
        var fiveMinutes = 60 * 5,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
      };
  