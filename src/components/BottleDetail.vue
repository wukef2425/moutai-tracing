<template>
  <div>
    <h1>Bottle Details</h1>
    <input v-model.number="bottleId" placeholder="Enter Bottle ID" />
    <button @click="fetchBottle">Fetch Bottle</button>

    <div v-if="bottle && bottle.parsedDescription">
      <h2>Bottle ID: {{ bottle.id }}</h2>
      <div>
        Name: {{ bottle.parsedDescription.name }},
        Year: {{ bottle.parsedDescription.year }},
        Specification: {{ bottle.parsedDescription.specification }},
        Series: {{ bottle.parsedDescription.series }},
        Production Date: {{ bottle.parsedDescription.productionDate }},
        Batch: {{ bottle.parsedDescription.batch }}
      </div>
      <ul>
        <li v-for="log in bottle.logistics" :key="log.timestamp">
          Status: {{ log.status }} at {{ new Date(log.timestamp * 1000).toLocaleString() }}
        </li>
      </ul>
    </div>
    <div v-else>
      Enter an ID and click "Fetch Bottle" to see details.
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottleDetail',

  data() {
    return {
      bottleId: null,
      bottle: null,
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('fetchBottles');
    },

    fetchBottle() {
      if (this.bottleId) {

        this.bottle = this.$store.getters.getBottles[this.bottleId - 1];
        if (this.bottle) {
          this.parseDescription();
        }
        // 打印获取到的瓶子信息
        console.log("Fetched bottle:", this.bottle);
      } else {
        console.log("No Bottle ID provided or bottle not found");
      }
    },

    parseDescription() {
      if (this.bottle && this.bottle.description) {
        try {
          this.bottle.parsedDescription = JSON.parse(this.bottle.description);
        } catch (e) {
          console.error("Failed to parse bottle description:", e);
          this.bottle.parsedDescription = {
            name: "Unknown",
            year: "Unknown",
            specification: "Unknown",
            series: "Unknown",
            productionDate: "Unknown",
            batch: "Unknown"
          };
        }
      }
    }
  }
};
</script>