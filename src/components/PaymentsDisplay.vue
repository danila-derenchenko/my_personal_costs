<template>
  <div class="payments-list">
    <div :class="[$style.my_costs]">
      <div :class="[$style.name_table]">
        <div :class="[$style.text_name]">#</div>
        <div :class="[$style.text_name]">Date</div>
        <div :class="[$style.text_name]">Category</div>
        <div :class="[$style.text_name]">Value</div>
      </div>
      <hr :class="[$style.hr]" />
      <div v-for="(item, idx) in list" :key="idx">
        <div :class="[$style.name_table]">
          <div>{{ item.id }}</div>
          <div>{{ item.date }}</div>
          <div>{{ item.category }}</div>
          <div>{{ item.value }}</div>
        </div>
        <hr :class="[$style.hr]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style module>
.my_costs {
  width: 400px;
  margin-top: 10px;
}

.name_table {
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr 1fr;
}

.hr {
  width: 100%;
}

.text_name {
  font-weight: bold;
  color: black;
  text-align: left;
}

.page:hover {
  color: blue;
  cursor: pointer;
}
</style>