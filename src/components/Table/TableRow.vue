<template>
  <div
    :class="[
      'table-row',
      {
        'has-children': hasChildren,
        last: last,
        padded,
        'is-row-open': isOpen,
      },
      `level-${level}`,
    ]"
  >
    <div class="table-row-cols">
      <div
        class="table-row-cell"
        v-for="(col, index) in Object.keys(row.cols)"
        :key="col"
        :style="getCellWidth(col)"
        :data-cell="col"
      >
        <button
          class="table-row-children-toggle"
          v-if="hasChildren"
          @click="toggle"
        >
          <Chevron />
        </button>

        <div class="guide" v-if="!index">
          <span v-for="(span, index) in getGuides" :key="index" />
        </div>

        <template v-if="!hasSlot(col)">
          <div class="table-row-cell-content">
            {{ row.cols[col] }}
          </div>
        </template>

        <slot :name="`row-${col}`" :item="row.cols" />
      </div>

      <span class="table-row-accessory" v-if="hasAccessory">
          <slot name="row-accessory" :item="row.cols" />
      </span>
    </div>
    <div class="table-row-children" v-if="hasChildren">
      <table-row
        v-for="(childRow, index) in row.children"
        :key="index"
        :row="childRow"
        :headers="headers"
        :last="index === row.children.length - 1"
        :level="level + 1"
      >
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope"
        >
          <slot :name="slot" v-bind="scope" />
        </template>
      </table-row>
    </div>
  </div>
</template>

<script>
import Chevron from "./icons/Chevron";

export default {
  name: "table-row",
  display: "TableRow",
  props: {
    row: { type: Object, required: true },
    headers: { type: Array, required: false },
    last: { type: Boolean, required: true, default: false },
    level: { type: Number, default: 1 },
    padded: { type: Boolean, required: false, default: false },
  },
  components: {
    Chevron,
  },
  data() {
    return {
      isOpen: typeof this.row.open !== "undefined" ? this.row.open : true,
    };
  },
  computed: {
    getGuides: function () {
      return new Array(this.level - 1);
    },
    hasChildren: function () {
      return this.row.children && this.row.children.length > 0;
    },
    hasAccessory() {
      return !!this.$scopedSlots["row-accessory"];
    },
  },
  methods: {
    hasSlot(name) {
      return !!this.$scopedSlots[`row-${name}`];
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    getCellWidth(id) {
        const defaultSize = "200px";

        if (!this.headers || (this.headers && !this.headers.some(header => header.id === id))) {
            return {
                width: defaultSize,
                minWidth: defaultSize,
            };
        }

        const header = this.headers.find(header => header.id === id);

        if (!header || (header && !header.width)) {
            return {
                width: defaultSize,
                minWidth: defaultSize,
            };
        }

        return {
            width: header.width,
            minWidth: header.width,
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.table-row-cell {
  &:first-child {
    position: sticky;
    left: 0;
    width: 300px !important;
    min-width: 300px !important;
    background-color: #fff;
    z-index: 100;
  }
}

.table-row {
  display: flex;
  flex-direction: column;
  position: relative;

  .table-row-children {
    display: none;
  }

  .table-row-children {
    .table-row-cols {
      position: relative;
    }
  }

  .table-row-cols {
    display: flex;
    // justify-content: space-evenly;
    height: 48px;
    align-items: stretch;
    border-bottom: 1px solid #f5f7fa;
    position: relative;

    &:first-child {
      border-top: 1px solid #f5f7fa;
    }
  }

  .table-row-accessory {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      display: none;
  }

  .table-row-cell {
    display: flex;
    align-items: center;
    width: 200px;
    min-width: 200px;
    text-align: left;
    border-right: 1px solid #f5f7fa;
    // padding: 0 15px;
    overflow: auto;

    &:first-child {
      position: sticky;
      left: 0;
    }

    &:last-of-type {
      border-right: none;
    }
  }

  &.padded {
    .table-row-cell {
      &:first-child {
        padding-left: 20px;
      }
    }
  }
}


.table-row {
    > .table-row-cols {
        &:hover {
            .table-row-accessory {
                display: flex;
            }
        }
    }
}

.table-row-children-toggle {
  position: absolute;
  left: 0;
  border: none;
  margin: 0;
  outline: none;
  display: block;
  cursor: pointer;

  svg {
    transform: rotate(-90deg);
    transition: all 0.3s ease;
  }
}

.is-row-open {
  > .table-row-cols {
    > .table-row-cell {
      .table-row-children-toggle {
        svg {
          transform: rotate(0deg);
        }
      }

      .guide {
          &:after {
              display: block;
          }
      }
    }
  }

  > .table-row-children {
    display: block;
  }
}

.table-row-cell-content {
  padding: 0 10px;
}

// GUIDES

.guide {
  position: relative;
  height: 100%;
  display: flex;
  align-items: stretch;

  &:before {
    content: "";
    width: 10px;
    border-bottom: 1px dashed;
    position: absolute;
    bottom: 50%;
    right: 0;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  span {
    width: 10px;
    border-right: 1px dashed;
    margin-right: 10px;
  }
}

.has-children {
  > .table-row-cols {
    .table-row-cell {
      .guide {
        &:after {
          height: 50%;
          border-left: 1px dashed;
          right: -10px;
          bottom: 0;
        }
      }
    }
  }
}

.level-1 {
  > .table-row-cols {
    .guide {
      &:before {
        display: none;
      }
    }
  }
}

.last:not(.has-children) {
  .guide {
    span {
      &:last-child {
        height: 50%;
      }
    }
  }
}
</style>