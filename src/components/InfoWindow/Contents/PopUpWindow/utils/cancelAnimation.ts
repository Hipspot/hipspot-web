export const cancelAnimation = (idRef: { id: number }) => {
  if (idRef.id) {
    cancelAnimationFrame(idRef.id);
  }
};
