<template>
  <div :class="['table', { loading }]">
    <div class="table-scroll">
      <template v-if="headers.length">
        <TableHeader
          :cols="headers"
          :sort-col="sortByColumn"
          :sort-desc="sortByDesc"
          :onSort="onSorting"
        >
          <template
            v-for="slot in Object.keys($scopedSlots)"
            :slot="slot"
            slot-scope="scope"
          >
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableHeader>
      </template>

      <template v-if="items.sections && items.sections.length">
        <TableSection
          v-for="section in sortedItems.sections"
          :key="section.id"
          :title="section.title"
          :rows="section.rows"
          :headers="headers"
          :has-children="hasChildren"
        >
          <template
            v-for="slot in Object.keys($scopedSlots)"
            :slot="slot"
            slot-scope="scope"
          >
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableSection>
      </template>

      <template v-if="items.rows && items.rows.length">
        <TableRow
          v-for="(row, index) in sortedItems.rows"
          :key="index"
          :row="row"
          :headers="headers"
          :last="index === items.rows.length - 1"
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
      </template>
    </div>
    <div class="table-loading-slot" v-if="loading">
      Super fancy loading animation here
    </div>
  </div>
</template>

<script>
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";

export default {
  name: "vtable",
  display: "Table",
  props: {
    loading: { type: Boolean, required: false, default: false },
    headers: { type: Array, required: false },
    items: { type: Object, required: true },
    sortBy: { type: String, required: false, default: null },
    sortDesc: { type: Boolean, required: false, default: false },
    onSort: { type: Function, required: false },
    customSort: { type: Object, required: false },
  },
  components: {
    TableHeader,
    TableRow,
    TableSection,
  },
  data() {
    return {
      column: null,
      desc: null,
    };
  },
  methods: {
    onSorting(col, desc) {
      if (this.onSort) {
        this.onSort(col, desc);
      } else {
        this.column = col;
        this.desc = desc;
      }
    },
    sortCompare(a, b) {
      if (!this.sortByColumn) {
        return 0;
      }

      if (this.customSort && this.customSort[this.sortByColumn]) {
        return this.customSort[this.sortByColumn](a, b, this.sortByDesc);
      }

      if (a.cols[this.sortByColumn] < b.cols[this.sortByColumn]) {
        return this.sortByDesc ? -1 : 1;
      }

      if (a.cols[this.sortByColumn] > b.cols[this.sortByColumn]) {
        return this.sortByDesc ? 1 : -1;
      }

      return 0;
    },
    sortRecursive(rows) {
      return rows.sort(this.sortCompare).map((row) => {
        if (row.children) {
          row.children = this.sortRecursive(row.children);
        }

        return row;
      });
    },
  },
  computed: {
    sortedItems() {
      if (!this.sortByColumn || this.onSort) {
        return this.items;
      }

      const items = { ...this.items };

      if (items.rows) {
        items.rows = this.sortRecursive(items.rows);
      }

      if (items.sections) {
        items.sections = items.sections.map((section) => {
          section.rows = this.sortRecursive(section.rows);
          return section;
        });
      }

      return items;
    },
    hasChildren() {
      return (
        !!this.items.sections ||
        (this.items.rows &&
          this.items.rows.some((item) => item.children && item.children.length))
      );
    },
    sortByColumn() {
      return this.column || this.sortBy;
    },
    sortByDesc() {
      return this.desc || this.sortDesc;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-scroll {
  overflow-x: auto;
  position: relative;

  .loading & {
    opacity: 0.5;
  }
}

.table-loading-slot {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.table {
  display: flex;
  flex-direction: column;
}

.table-body {
}
</style>