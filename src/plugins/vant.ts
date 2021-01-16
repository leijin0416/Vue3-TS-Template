import { App as VM } from "vue"
import { Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Field,
  CellGroup,
  Search, Swipe, SwipeItem } from "vant"

const plugins = [ Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Field,
  CellGroup,
  Search, Swipe, SwipeItem ]

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item);
    })
  }
}
