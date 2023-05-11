/**
 * touch, mouse 이벤트 시작 시 DOM 변경사항
 *
 * @param target 변경 대상
 */
const touchMouseStart = (target: HTMLDivElement) => {
  target.style.setProperty('padding', 'calc(var(--vh,1vh) * 100) 0');
  target.style.setProperty('transform', 'translateY(-50%)');
  target.style.setProperty('z-index', '2');
};

/**
 * touch, mouse 이벤트 종료 시 DOM 변경사항
 * 마우스 인식 범위 0px로 줄임
 *
 *
 * @param target 변경 대상
 */
const touchMouseEnd = (target: HTMLDivElement) => {
  target.style.setProperty('padding', '0px');
  target.style.setProperty('z-index', '0');
};

const domUpdater = {
  touchMouseStart,
  touchMouseEnd,
};

export default domUpdater;
