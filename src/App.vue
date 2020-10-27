<template>
  <v-app id="app">
    <div class="table-example">
      <Table
        :headers="headers"
        :items="items"
        :custom-sort="customSorter"
        :loading="loading"
        :on-resize="onResize"
      >
        <template v-slot:header-priority="{ item }">
          <v-chip color="primary" dark>
            {{ item.title }}
          </v-chip>
        </template>

        <template v-slot:row-taskName="{ item }">
          <div class="checkbox" />
          {{ item.taskName }}
        </template>

        <template v-slot:row-due="{ item }">
          <input type="text" :value="item.due" />
        </template>

        <template v-slot:row-assignee="{ item }">
          <v-avatar
            color="primary"
            size="24"
            v-for="(user, index) in item.assignee.split(',')"
            :key="index"
            style="margin-left: 10px"
          >
            <img
              :src="`https://eu.ui-avatars.com/api/?name=${user}`"
              :alt="user"
            />
          </v-avatar>
        </template>
        <template v-slot:row-priority="{ item }">
          <div :class="['priority', priorityText(item.priority)]">
            {{ priorityText(item.priority) }}
          </div>
        </template>

        <template v-slot:row-board="{ item }">
          <div :class="['board', item.board.toLowerCase()]">
            {{ item.board }}
          </div>
        </template>

        <template v-slot:row-tags="{ item }">
          <div :class="['tag', item.tags.toLowerCase()]">
            {{ item.tags }}
          </div>
        </template>

        <template #header-accessory>
          <button class="accessorry-header-button">+</button>
        </template>

        <template #row-accessory>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <button class="accessorry-button" v-bind="attrs" v-on="on">
                &#183;&#183;&#183;
              </button>
            </template>
            <v-list>
              <v-list-item>Row Action 1</v-list-item>
              <v-list-item>Row Action 2</v-list-item>
              <v-list-item>Row Action 3</v-list-item>
              <v-list-item>Row Action 4</v-list-item>
              <v-list-item>Row Action 5</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </Table>
    </div>
  </v-app>
</template>

<script>
import { tableData } from "./data";
import Table from "./components/Table/Table";

export default {
  name: "App",
  components: { Table },
  data() {
    return {
      headers: tableData.headers,
      items: tableData.items,
      sortBy: "due",
      sortDesc: true,
      loading: false,
    };
  },
  methods: {
    onSort (sortBy, sortDesc) {
      console.log("Sort table externally by:", sortBy, sortDesc);
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    priorityText(number) {
      switch (number) {
        case 1:
          return "low";
        case 2:
          return "medium";
        case 3:
          return "high";
      }

      return "none";
    },
    onResize(id, size) {
        console.log("Column resized", id, size);
    }
  },
  computed: {
    customSorter() {
      return {
        assignee: (a, b, desc) => {
          if (
            a.cols.assignee.split(",").length >
            b.cols.assignee.split(",").length
          ) {
            return desc ? -1 : 1;
          }
          if (
            a.cols.assignee.split(",").length <
            b.cols.assignee.split(",").length
          ) {
            return desc ? 1 : -1;
          }
          return 0;
        },
      };
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

$row-height: 40px;

.table-example {
  padding: 0 50px;
}

.checkbox {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #c5cada;
  border-radius: 10px;
  margin-right: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "\2713 ";
    font-size: 12px;
  }
}

.priority {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;

  &.low {
    background-color: #52c945;
  }
  &.medium {
    background-color: #fdac3d;
  }
  &.high {
    background-color: #e64d4d;
  }
}

.board {
  padding-left: 15px;
  position: relative;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;

  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &.review {
    &:before {
      background-color: #52c945;
    }
  }
  &.completed {
    &:before {
      background-color: #fdac3d;
    }
  }
  &.to-do {
    &:before {
      background-color: #e64d4d;
    }
  }
}

.tag {
  margin-left: 10px;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  color: #fff;

  &.design {
    background-color: #f7b500;
  }
  &.ui {
    background-color: #52c945;
  }
  &.research {
    background-color: #308de5;
  }
}

.accessorry-header-button {
  font-size: 22px;
  font-weight: bold;
  outline: none;
  margin: 0;
  padding: 0;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
}

.accessorry-button {
  margin: 0;
  padding: 0;
  height: 24px;
  width: 24px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid #e1e6ee;
  outline: none;
}
</style>
