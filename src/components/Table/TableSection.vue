<template>
  <div :class="['table-section', { 'is-open': isOpen }]">
    <div class="table-section-title" @click="toggle">
      <div>
        <Chevron />{{ title }}
        </div>
    </div>
    <div :class="['table-section-content', { 'is-open': isOpen }]">
      <div class="table-body">
        <TableRow
          v-for="(row, index) in rows"
          :key="index"
          :row="row"
          :headers="headers"
          :last="index === rows.length - 1"
          :padded="hasChildren"
        >
          <template
            v-for="slot in Object.keys($scopedSlots)"
            :slot="slot"
            slot-scope="scope"
          >
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableRow>
      </div>
    </div>
  </div>
</template>

<script>
import TableRow from "./TableRow";
import Chevron from "./icons/Chevron";

export default {
  name: "table-section",
  display: "TableSection",
  components: {
    TableRow,
    Chevron,
  },
  props: {
    title: { type: String, required: true },
    rows: { type: Array, required: true },
    headers: { type: Array, required: false },
    open: { type: Boolean, required: false, default: true },
    hasChildren: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.table-section-title {
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  color: #0b0e1f;
  text-align: left;
  padding: 12px 0;
  position: sticky;
  left: 0;
  cursor: pointer;
  padding-left: 20px;

  > div {
    display: inline-flex;
    align-items: center;
  }

  svg {
    margin-right: 10px;
    transition: all 0.3s ease;
    transform: rotate(-90deg);
    position: absolute;
    left: 0;

    .is-open & {
      transform: rotate(0deg);
    }
  }
}

.table-section-content {
  display: none;
  margin-bottom: 50px;

  &.is-open {
    display: block;
  }
}
</style>