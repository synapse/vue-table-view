<template>
  <div class="table-header" v-resizable-columns>
    <div
      :class="[
        'table-header-cell',
        {
          'has-sorting': col.sorting,
          'table-header-cell-resizable': col.resizable,
        },
      ]"
      v-for="col in cols"
      :key="col.id"
      :style="{ width: col.width || '200px', minWidth: col.width || '200px' }"
      :data-column="col.id"
    >
      <div
        class="table-header-cell-title"
        v-if="!hasSlot(col.id)"
        @click="col.sorting ? onSort(col.id, !sortDesc) : null"
      >
        <span>{{ col.title }}</span>
      </div>

      <div
        class="table-header-cell-title"
        v-if="hasSlot(col.id)"
        @click="col.sorting ? onSort(col.id, !sortDesc) : null"
      >
        <slot :name="`header-${col.id}`" :item="col" />
      </div>

      <div
        :class="['table-header-sort', { 'order-desc': sortDesc }]"
        v-if="col.sorting && sortCol === col.id"
      >
        <SortArrow />
      </div>
    </div>

    <span class="table-header-accessory" v-if="hasAccessory">
      <slot name="header-accessory" :item="cols" />
    </span>
  </div>
</template>

<script>
import Vue from "vue";
import SortArrow from "./icons/SortArrow";
import TableResize from "./TableResize";

Vue.use(TableResize);

export default {
  name: "table-header",
  display: "TableHeader",
  props: {
    cols: { type: Array, required: true },
    onSort: { type: Function, required: false },
    sortCol: { type: String, required: false },
    sortDesc: { type: Boolean, required: false },
  },
  components: {
    SortArrow,
  },
  computed: {
    hasAccessory() {
      return !!this.$scopedSlots["header-accessory"];
    },
  },
  methods: {
    hasSlot(name) {
      return !!this.$scopedSlots[`header-${name}`];
    }
  },
};
</script>

<style lang="scss" scoped>
$row-height: 40px;

.table-header {
  height: $row-height;
  display: flex;
}

.table-header-accessory {
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  // display: none;
}

.table-header-cell {
  text-align: left;
  width: 200px;
  min-width: 200px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f7fa;
  overflow: auto;

  &:first-child {
    position: sticky;
    left: 0;
    width: 300px !important;
    min-width: 300px !important;
    background-color: #fff;
    z-index: 100;
  }

  &.has-sorting {
    cursor: pointer;
  }
}

.table-header-cell-resizable {
    border-right: 1px dashed rgba(0,0,0, 0.05);
}

.table-header-cell-title {
  padding: 0 10px;
}

.table-header-sort {
  border: none;
  outline: none;
  margin: none;
  padding: 0px 5px;
  transition: all 0.3s ease;

  &.order-desc {
    transform: rotate(180deg);
  }
}
</style>