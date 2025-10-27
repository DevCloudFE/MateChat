import { reactive, readonly } from 'vue';

const state = reactive({
  isCameraPage: false
});

export const usePageState = () => {
  const setIsCameraPage = (value: boolean) => {
    state.isCameraPage = value;
  };

  return {
    state: readonly(state),
    setIsCameraPage
  };
}