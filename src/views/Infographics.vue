<template>
  <div id="title">
    <h1>Infographics</h1>
  </div>

  <div id="paragraph">
    All data is from the U.S. Bureau of Labor Statistics. Below, select the
    careers that you would like to inspect and which state.
  </div>

  <div id="selectors">
    <select @change="onCareerSelect($event)">
      <option disabled selected="selected" value="">Select Careers Here</option>
      <option
        v-for="career in careers"
        :key="career.title"
        :value="JSON.stringify(career)"
      >
        {{ career.title }}
      </option>
    </select>
    <br />
    <span>Selected: {{ selectedCareerTitles }}</span>

    <br />

    <select @change="onAreaSelect($event)">
      <option disabled selected="selected" value="">Select States Here</option>
      <option v-for="state in states" :key="state" :value="state">
        {{ state }}
      </option>
    </select>
    <br />
    <span>Selected: {{ selectedAreas }}</span>
  </div>

  <apexchart
    class="chart"
    width="70%"
    type="line"
    :options="chartOptions"
    :series="series"
    v-if="chartOptions !== null"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

export default {
  name: "Infographics",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: null,
      series: null,
      selectedCareers: ["47-2152"],
      selectedCareerTitles: [],
      selectedAreas: ["National"],
      careers: [],
      states: [],
      data: [] // list of data lists (each list being a occ/year query result)
    };
  },
  methods: {
    onCareerSelect(event) {
      var obj = JSON.parse(event.target.value);
      this.selectedCareers.push(obj);
      this.selectedCareerTitles.push(obj.title);

      var queryString = "";
      var i;

      for (i = 0; i < this.selectedCareers.length; i++) {
        queryString += "occ_code=" + this.selectedCareers[i].occ_code + "&";
      }

      for (i = 0; i < this.selectedAreas.length; i++) {
        if (i === this.selectedAreas.length - 1) {
          queryString += "area=" + this.selectedAreas[i];
        } else {
          queryString += "area=" + this.selectedAreas[i] + "&";
        }
      }

      if (this.selectedAreas.length > 0) {
        axios
          .get(`http://localhost:8081/getBlsData?` + queryString, {
            withCredentials: true,
            headers: { "content-type": "application/json" },
          })
          .then((res) => {
            if (res.status === 200) {
                this.data = res.data;
                this.updateChart(); 
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateChart() { 
        this.data.sort(function(a, b) { 
            return a.year - b.year;
        });

        var years = [];
        this.data[0].forEach(item => {
          years.push(item.year);
        });

        var series = []; 
        for(var i = 0; i < this.data.length; i++) { 
          var dataSeries = this.data[i];
          var wageData = []; 
          for (var j = 0; j < dataSeries.length; j++) { 
            var dataPoint = dataSeries[j];
            wageData.push(dataPoint.a_median);
          }

          series.push({
            name: dataSeries[0].area_title,
            data: wageData
          });
        }

        this.chartOptions = {
            chart: {
                type: "line",
                id: "salary-data",
                width: '100%'
            },
            labels: {
              show: true,
              rotate: -45,
              rotateAlways: false,
              hideOverlappingLabels: true,
              showDuplicates: false,
              trim: false,
              minHeight: undefined,
              maxHeight: 120,
              style: {
                  colors: [],
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  cssClass: 'apexcharts-xaxis-label',
              },
            },
            xaxis: {
              categories: years
            },
            legend: {
              position: 'bottom',
              show: true
            },
            markers: { 
              size: 3
            }
        };

        this.series = series;
    }
  },
  beforeMount() {
    axios
      .get(`http://localhost:8081/getAllCareers`, {
        withCredentials: true,
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          this.careers = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Get the default selected career and area (National)
    axios
      .get(`http://localhost:8081/getBlsData?occ_code=` + this.selectedCareers[0] +`&area_title=` + this.selectedAreas[0], {
        withCredentials: true,
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          this.data.push(res.data);
          this.updateChart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() { 
  }
};
</script>

<style scoped>
#title {
  margin-top: 3%;
}

#paragraph {
  margin: 5% 20%;
}

.chart {
  margin-left: 15%;
  margin-top: 5%;
}
</style>


// chartOptions: {
//         chart: {
//           id: "vuechart-example",
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
//         },
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 35, 50, 49, 60, 70, 91],
//         },
//       ],