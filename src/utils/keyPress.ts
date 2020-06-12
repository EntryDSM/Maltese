export const keyPressEnter = (
  key: string,
  event: () => void,
  shiftKey: boolean = false
) => {
  if (key === "Enter" && !shiftKey) {
    event();
  }
};
