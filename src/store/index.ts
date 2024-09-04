import { create } from 'zustand';

export interface Component {
  id: number;
  name: string;
  props: object;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: object) => void;
}

const resetFns = new Set<() => void>();

export const resetStore = () => {
  resetFns.forEach((resetFn) => {
    resetFn();
  });
};

const initComponent = {
  id: 1,
  name: 'Page',
  props: {},
  desc: '页面',
};

export const useComponetsStore = create<State & Action>((set, get) => {
  resetFns.add(() => set({ components: [{ ...initComponent }] }));
  return {
    components: [{ ...initComponent }],
    addComponent: (component, parentId) =>
      set((state) => {
        if (parentId) {
          const parentComponent = getComponentById(parentId, state.components);

          if (parentComponent) {
            if (parentComponent.children) {
              parentComponent.children.push(component);
            } else {
              parentComponent.children = [component];
            }
          }

          component.parentId = parentId;
          return { components: [...state.components] };
        }
        return { components: [...state.components, component] };
      }),
    deleteComponent: (componentId) => {
      if (!componentId) return;

      const component = getComponentById(componentId, get().components);
      // console.log(component);
      if (component?.parentId) {
        const parentComponent = getComponentById(
          component.parentId,
          get().components,
        );

        if (parentComponent) {
          parentComponent.children = parentComponent?.children?.filter(
            (item) => item.id !== +componentId,
          );

          set({ components: [...get().components] });
        }
      } else {
        set({
          components: [...get().components.filter((c) => c.id !== componentId)],
        });
      }
    },
    updateComponentProps: (componentId, props) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          component.props = { ...component.props, ...props };

          return { components: [...state.components] };
        }

        return { components: [...state.components] };
      }),
  };
});

export function getComponentById(
  id: number | null,
  components: Component[],
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
