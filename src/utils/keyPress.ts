export const keyPressEnter = (key: string, event: () => void) => {
  if (key === "Enter") {
    event();
  }
};
