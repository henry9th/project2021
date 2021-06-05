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
    width="500"
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
      selectedCareers: [],
      selectedCareerTitles: [],
      selectedAreas: ["National"],
      careers: [],
      states: [],
      data: null
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
        this.data.forEach(item => years.push(item.year));

        var occCodes = []; 
        this.selectedCareers.forEach(item => occCodes.push(item.occ_code));

        var separatedData = []; 

        occCodes.forEach(occCode => separatedData.push(this.data.filter(element => { 
            return element.occ_code === occCode;
        })));

        this.chartOptions = {
            chart: {
                id: "salary-data",
            },
            xaxis: {
                categories: years,
            },
        };

        console.log(separatedData);
        this.series = [{
            name: "series-1",
            data: separatedData[0].map(item => item.a_median)
        }];
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
  },
};
</script>

<style scoped>
#title {
  margin-top: 3%;
}

#paragraph {
  margin: 5% 20%;
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