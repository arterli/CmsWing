/** Graphs : Flot
	graphs-flot.html


		<!-- PAGE LEVEL SCRIPTS -->
		loadScript(plugin_path + "chart.flot/jquery.flot.min.js", function(){
			loadScript(plugin_path + "chart.flot/jquery.flot.resize.min.js", function(){
				loadScript(plugin_path + "chart.flot/jquery.flot.time.min.js", function(){
					loadScript(plugin_path + "chart.flot/jquery.flot.fillbetween.min.js", function(){
						loadScript(plugin_path + "chart.flot/jquery.flot.orderBars.min.js", function(){
							loadScript(plugin_path + "chart.flot/jquery.flot.pie.min.js", function(){
								loadScript(plugin_path + "chart.flot/jquery.flot.tooltip.min.js", function(){
								
									// demo js script
									loadScript("assets/js/view/demo.graphs.flot.js");

								});
							});
						});
					});
				});
			});
		});

		------------------------------------------------------------------------------------------

		01. SALES CHART
		02. SIN CHART
		03. BAR CHART
		04. BAR CHART HORIZONTAL
		05. PIE CHART
		06. STATS CHART
		07. REALTIME CHART
		http://www.flotcharts.org/flot/examples/

 ************************************************* **/
	jQuery(window).ready(function() {
		_flot();
	});


	function _flot() {

		/* DEFAULTS FLOT COLORS */
		var $color_border_color = "#eaeaea";		/* light gray 	*/
			$color_grid_color 	= "#dddddd"			/* silver	 	*/
			$color_main 		= "#E24913";		/* red       	*/
			$color_second 		= "#6595b4";		/* blue      	*/
			$color_third 		= "#FF9F01";		/* orange   	*/
			$color_fourth 		= "#7e9d3a";		/* green     	*/
			$color_fifth 		= "#BD362F";		/* dark red  	*/
			$color_mono 		= "#000000";		/* black 	 	*/



		/** 01. SALES CHART
		******************************************* **/
		if (jQuery("#flot-sales").length > 0) {

			var d = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 77], [1196809200000, 3636], [1196895600000, 3575], [1196982000000, 2736], [1197068400000, 1086], [1197154800000, 676], [1197241200000, 1205], [1197327600000, 906], [1197414000000, 710], [1197500400000, 639], [1197586800000, 540], [1197673200000, 435], [1197759600000, 301], [1197846000000, 575], [1197932400000, 481], [1198018800000, 591], [1198105200000, 608], [1198191600000, 459], [1198278000000, 234], [1198364400000, 1352], [1198450800000, 686], [1198537200000, 279], [1198623600000, 449], [1198710000000, 468], [1198796400000, 392], [1198882800000, 282], [1198969200000, 208], [1199055600000, 229], [1199142000000, 177], [1199228400000, 374], [1199314800000, 436], [1199401200000, 404], [1199487600000, 253], [1199574000000, 218], [1199660400000, 476], [1199746800000, 462], [1199833200000, 500], [1199919600000, 700], [1200006000000, 750], [1200092400000, 600], [1200178800000, 500], [1200265200000, 900], [1200351600000, 930], [1200438000000, 1200], [1200524400000, 980], [1200610800000, 950], [1200697200000, 900], [1200783600000, 1000], [1200870000000, 1050], [1200956400000, 1150], [1201042800000, 1100], [1201129200000, 1200], [1201215600000, 1300], [1201302000000, 1700], [1201388400000, 1450], [1201474800000, 1500], [1201561200000, 546], [1201647600000, 614], [1201734000000, 954], [1201820400000, 1700], [1201906800000, 1800], [1201993200000, 1900], [1202079600000, 2000], [1202166000000, 2100], [1202252400000, 2200], [1202338800000, 2300], [1202425200000, 2400], [1202511600000, 2550], [1202598000000, 2600], [1202684400000, 2500], [1202770800000, 2700], [1202857200000, 2750], [1202943600000, 2800], [1203030000000, 3245], [1203116400000, 3345], [1203202800000, 3000], [1203289200000, 3200], [1203375600000, 3300], [1203462000000, 3400], [1203548400000, 3600], [1203634800000, 3700], [1203721200000, 3800], [1203807600000, 4000], [1203894000000, 4500]];
		
			for (var i = 0; i < d.length; ++i) {
				d[i][0] += 60 * 60 * 1000;
			}
		
			function weekendAreas(axes) {
				var markings = [];
				var d = new Date(axes.xaxis.min);
				// go to the first Saturday
				d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
				d.setUTCSeconds(0);
				d.setUTCMinutes(0);
				d.setUTCHours(0);
				var i = d.getTime();
				do {
					// when we don't set yaxis, the rectangle automatically
					// extends to infinity upwards and downwards
					markings.push({
						xaxis : {
							from : i,
							to : i + 2 * 24 * 60 * 60 * 1000
						}
					});
					i += 7 * 24 * 60 * 60 * 1000;
				} while (i < axes.xaxis.max);
		
				return markings;
			}
		
			var options = {

				xaxis : {
					mode : "time",
					tickLength : 5
				},

				series : {
					lines : {
						show : true,
						lineWidth : 1,
						fill : true,
						fillColor : {
							colors : [{
								opacity : 0.1
							}, {
								opacity : 0.15
							}]
						}
					},
                   //points: { show: true },
					shadowSize : 0
				},

				selection : {
					mode : "x"
				},

				grid : {
					hoverable : true,
					clickable : true,
					tickColor : $color_border_color,
					borderWidth : 0,
					borderColor : $color_border_color,
				},

				tooltip : true,

				tooltipOpts : {
					content : "Your sales for <b>%x</b> was <span>$%y</span>",
					dateFormat : "%y-%0m-%0d",
					defaultTheme : false
				},

				colors : [$color_second],
		
			};
		
			var plot = jQuery.plot(jQuery("#flot-sales"), [d], options);
		}

		/** 02. SIN CHART
		******************************************* **/
		if (jQuery("#flot-sin").length > 0) {
			var sin = [], cos = [];
			for (var i = 0; i < 16; i += 0.5) {
				sin.push([i, Math.sin(i)]);
				cos.push([i, Math.cos(i)]);
			}
	
			var plot = jQuery.plot(jQuery("#flot-sin"), [{
				data : sin,
				label : "sin(x)"
			}, {
				data : cos,
				label : "cos(x)"
			}], {
				series : {
					lines : {
						show : true
					},
					points : {
						show : true
					}
				},
				grid : {
					hoverable : true,
					clickable : true,
					tickColor : $color_border_color,
					borderWidth : 0,
					borderColor : $color_border_color,
				},
				tooltip : true,
				tooltipOpts : {
					//content : "Value <b>$x</b> Value <span>$y</span>",
					defaultTheme : false
				},
				colors : [$color_second, $color_fourth],
				yaxis : {
					min : -1.1,
					max : 1.1
				},
				xaxis : {
					min : 0,
					max : 15
				}
			});
	
			jQuery("#flot-sin").bind("plotclick", function(event, pos, item) {
				if (item) {
					jQuery("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
					plot.highlight(item.series, item.datapoint);
				}
			});
		}
		
		/** 03. BAR CHART
		******************************************* **/
		if (jQuery("#flot-bar").length > 0) {

			var data1 = [];
			for (var i = 0; i <= 12; i += 1)
				data1.push([i, parseInt(Math.random() * 30)]);
	
			var data2 = [];
			for (var i = 0; i <= 12; i += 1)
				data2.push([i, parseInt(Math.random() * 30)]);
	
			var data3 = [];
			for (var i = 0; i <= 12; i += 1)
				data3.push([i, parseInt(Math.random() * 30)]);
	
			var ds = new Array();
	
			ds.push({
				data : data1,
				bars : {
					show : true,
					barWidth : 0.2,
					order : 1,
				}
			});
			ds.push({
				data : data2,
				bars : {
					show : true,
					barWidth : 0.2,
					order : 2
				}
			});
			ds.push({
				data : data3,
				bars : {
					show : true,
					barWidth : 0.2,
					order : 3
				}
			});
	
			//Display graph
			jQuery.plot(jQuery("#flot-bar"), ds, {
				colors : [$color_second, $color_fourth, "#666", "#BBB"],
				grid : {
					show : true,
					hoverable : true,
					clickable : true,
					tickColor : $color_border_color,
					borderWidth : 0,
					borderColor : $color_border_color,
				},
				legend : true,
				tooltip : true,
				tooltipOpts : {
					content : "<b>%x</b> = <span>%y</span>",
					defaultTheme : false
				}
	
			});
	
		}

		/** 04. BAR CHART HORIZONTAL
		******************************************* **/
		if (jQuery("#flot-bar-horizontal").length > 0) {
			//Display horizontal graph
			var d1_h = [];
			for (var i = 0; i <= 3; i += 1)
				d1_h.push([parseInt(Math.random() * 30), i]);
	
			var d2_h = [];
			for (var i = 0; i <= 3; i += 1)
				d2_h.push([parseInt(Math.random() * 30), i]);
	
			var d3_h = [];
			for (var i = 0; i <= 3; i += 1)
				d3_h.push([parseInt(Math.random() * 30), i]);
	
			var ds_h = new Array();
			ds_h.push({
				data : d1_h,
				bars : {
					horizontal : true,
					show : true,
					barWidth : 0.2,
					order : 1,
				}
			});
			ds_h.push({
				data : d2_h,
				bars : {
					horizontal : true,
					show : true,
					barWidth : 0.2,
					order : 2
				}
			});
			ds_h.push({
				data : d3_h,
				bars : {
					horizontal : true,
					show : true,
					barWidth : 0.2,
					order : 3
				}
			});
	
			// display graph
			jQuery.plot(jQuery("#flot-bar-horizontal"), ds_h, {
				colors : [$color_second, $color_fourth, "#666", "#BBB"],
				grid : {
					show : true,
					hoverable : true,
					clickable : true,
					tickColor : $color_border_color,
					borderWidth : 0,
					borderColor : $color_border_color,
				},
				legend : true,
				tooltip : true,
				tooltipOpts : {
					content : "<b>%x</b> = <span>%y</span>",
					defaultTheme : false
				}
			});
	
		} 

		/** 05. PIE CHART
		******************************************* **/
		if (jQuery("#flot-pie").length > 0) {

				var data_pie = [];
				var series = Math.floor(Math.random() * 10) + 1;
				for (var i = 0; i < series; i++) {
					data_pie[i] = {
						label : "Series" + (i + 1),
						data : Math.floor(Math.random() * 100) + 1
					}
				}
	
				jQuery.plot(jQuery("#flot-pie"), data_pie, {
					series : {
						pie : {
							show : true,
							innerRadius : 0.5,
							radius : 1,
							label : {
								show : false,
								radius : 2 / 3,
								formatter : function(label, series) {
									return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
								},
								threshold : 0.1
							}
						}
					},
					legend : {
						show : true,
						noColumns : 1, // number of colums in legend table
						labelFormatter : null, // fn: string -> string
						labelBoxBorderColor : "#000", // border color for the little label boxes
						container : null, // container (as jQuery object) to put legend in, null means default on top of graph
						position : "ne", // position of default legend container within plot
						margin : [5, 10], // distance from grid edge to default legend container within plot
						backgroundColor : "#efefef", // null means auto-detect
						backgroundOpacity : 1 // set to 0 to avoid background
					},
					grid : {
						hoverable : true,
						clickable : true
					},
				});
	
		}

		/** 06. STATS CHART
		******************************************* **/
		if (jQuery("#flot-stats").length) {
	
			var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
			var visitors = [[1, 65], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];

			var plot = jQuery.plot(jQuery("#flot-stats"), [{
				data : pageviews,
				label : "Your pageviews"
			}, {
				data : visitors,
				label : "Site visitors"
			}], {
				series : {
					lines : {
						show : true,
						lineWidth : 1,
						fill : true,
						fillColor : {
							colors : [{
								opacity : 0.1
							}, {
								opacity : 0.15
							}]
						}
					},
					points : {
						show : true
					},
					shadowSize : 0
				},
				xaxis : {
					mode : "time",
					tickLength : 10
				},
	
				yaxes : [{
					min : 20,
					tickLength : 5
				}],
				grid : {
					hoverable : true,
					clickable : true,
					tickColor : $color_border_color,
					borderWidth : 0,
					borderColor : $color_border_color,
				},
				tooltip : true,
				tooltipOpts : {
					content : "%s for <b>%x:00 hrs</b> was %y",
					dateFormat : "%y-%0m-%0d",
					defaultTheme : false
				},
				colors : [$color_main, $color_second],
				xaxis : {
					ticks : 15,
					tickDecimals : 2
				},
				yaxis : {
					ticks : 15,
					tickDecimals : 0
				},
			});
	
		}

		/** 07. REALTIME CHART
		******************************************* **/
		if (jQuery("#flot-realtime").length) {
	
			// For the demo we use generated data, but normally it would be coming from the server
			var data = [], totalPoints = 200;
			function getRandomData() {
				if (data.length > 0)
					data = data.slice(1);
	
				// do a random walk
				while (data.length < totalPoints) {
					var prev = data.length > 0 ? data[data.length - 1] : 50;
					var y = prev + Math.random() * 10 - 5;
					if (y < 0)
						y = 0;
					if (y > 100)
						y = 100;
					data.push(y);
				}
	
				// zip the generated y values with the x values
				var res = [];
				for (var i = 0; i < data.length; ++i)
					res.push([i, data[i]])
				return res;
			}
	
			// setup control widget
			var updateInterval = 1000;
			jQuery("#flot-realtime").val(updateInterval).change(function() {
				var v = jQuery(this).val();
				if (v && !isNaN(+v)) {
					updateInterval = +v;
					if (updateInterval < 1)
						updateInterval = 1;
					if (updateInterval > 2000)
						updateInterval = 2000;
					jQuery(this).val("" + updateInterval);
				}
			});
	
			// setup plot
			var options = {
				yaxis : {
					min : 0,
					max : 100
				},
				xaxis : {
					min : 0,
					max : 100
				},
				colors : [$color_fourth],
				series : {
					lines : {
						lineWidth : 1,
						fill : true,
						fillColor : {
							colors : [{
								opacity : 0.4
							}, {
								opacity : 0
							}]
						},
						steps : false
	
					}
				}
			};
			var plot = jQuery.plot(jQuery("#flot-realtime"), [getRandomData()], options);
	
			function update() {
				plot.setData([getRandomData()]);
				// since the axes don't change, we don't need to call plot.setupGrid()
				plot.draw();
	
				setTimeout(update, updateInterval);
			}
	
			update();
	
		}

	}
