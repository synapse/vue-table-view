export default {
  install(Vue) {
    Vue.directive('resizable-columns', {
      inserted(el) {
        const nodeClass = el.className;

        if (['table-header'].indexOf(nodeClass) < 0) {
          return;
        }

        const table = el.parentElement;
        const thead = table.querySelector('.table-header');
        const ths = el.querySelectorAll('.table-header-cell-resizable');
        const barHeight = thead.offsetHeight;

        const resizeContainer = document.createElement('div');
        resizeContainer.style.position = 'relative';
        resizeContainer.style.width = table.offsetWidth + 'px';
        resizeContainer.className = 'vue-columns-resizable';
        table.parentElement.insertBefore(resizeContainer, table);

        let moving = false;
        let movingIndex = 0;
        let colSize = 0;
        let colID = '';

        ths.forEach((th, index) => {
          th.style.width = th.offsetWidth + 'px';
          if (index >= ths.length) return;

          const nextTh = ths[index];
          const bar = document.createElement('div');

          bar.style.position = 'absolute';
          bar.style.left = nextTh.offsetLeft + nextTh.offsetWidth - 2 + 'px';
          bar.style.top = 0;
          bar.style.height = barHeight + 'px';
          bar.style.width = '4px';
          bar.style.cursor = 'col-resize';
          bar.style.zIndex = 1;
          bar.className = 'columns-resize-bar';

          bar.addEventListener('mousedown', () => {
            moving = true;
            movingIndex = index;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
          });
          resizeContainer.appendChild(bar);
        });

        const bars = resizeContainer.querySelectorAll('.columns-resize-bar');

        document.addEventListener('mouseup', () => {
          if (!moving) return;

          moving = false;
          document.body.style.cursor = '';
          document.body.style.userSelect = '';

          bars.forEach((bar, index) => {
            const th = ths[index];
            th.style.width = th.offsetWidth + 'px';
            bar.style.left = th.offsetLeft + th.offsetWidth - 2 + 'px';
          });

          const event = new CustomEvent('on-resize', {
            detail: { size: colSize, id: colID },
          });
          el.dispatchEvent(event);
          colSize = 0;
          colID = '';
        });

        const cutPx = (str) => +str.replace('px', '');

        const handleResize = (e) => {
          if (moving) {
            const th = ths[movingIndex];
            const columnName = th.dataset.column;
            const bar = bars[movingIndex];
            const size = cutPx(th.style.width) + e.movementX + 'px';
            th.style.width = size;
            th.style.minWidth = size;

            if (columnName) {
              const cells = table.querySelectorAll(
                "[data-cell='" + columnName + "']"
              );
              if (cells.length) {
                cells.forEach((cell) => {
                  cell.style.width = size;
                  cell.style.minWidth = size;
                });
              }
            }

            bar.style.left =
              th.offsetLeft + th.offsetWidth - 2 + e.movementX + 'px';
            colSize = size;
            colID = columnName;
          }
        };

        resizeContainer.addEventListener('mousemove', handleResize);
        table.addEventListener('mousemove', handleResize);
      },
      bind(el, binding, vnode) {
        el.addEventListener('on-resize', (event) => {
          if (typeof vnode.context.onResize === 'function' && event.detail) {
            const { size, id } = event.detail;
            vnode.context.onResize(id, size);
          }
        });
      },
    });
  },
};
