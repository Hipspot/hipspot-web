const detectDevice = () => {
  const { userAgent } = navigator;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  }

  return 'desktop';
};
export default detectDevice;
