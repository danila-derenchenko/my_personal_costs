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
          <div>{{ idx + 1 }}</div>
          <div>{{ item.date }}</div>
          <div>{{ item.category }}</div>
          <div>{{ item.value }}</div>
        </div>
        <hr :class="[$style.hr]" />
      </div>
      <div :class="[$style.number_page]">
        <p id="page" :class="[$style.page]">1</p>
        <p id="page" :class="[$style.page]">2</p>
      </div>
    </div>
  </div>
</template>

<script>
console.log(document.querySelectorAll("#page"));
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

.number_page {
  width: 100%;
  border: 1px solid darkgray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.page {
  font-weight: bold;
}

.page:hover {
  color: blue;
  cursor: pointer;
}
</style>