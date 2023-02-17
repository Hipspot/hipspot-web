import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import checkStringComposedOnlyLetter from './checkStringComposedOnlyLetter';

/**
 * @description 키값 하나당 스타일 cache 하나만을 저장하기 위해서 선언한 객체입니다.
 *
 */
const cache: { [id: string]: EmotionCache } = {};

/**
 * @description 리액트 엘리먼트를 html + css 로 만들고 dom에 직접 랜더링 할 수 있는 함수입니다, Emotion을 통해서 스타일이 입혀집니다 파라미터는 객체 프로퍼티로 넘겨주세요
 * @param elem 변환할 리액트 엘리먼트입니다
 * @param cssDatakey Head > Style 의 data-emotion에 담기는 Key값입니다. 한 종류 스타일에 하나의 키값을 넣어주세요
 * @return HTMLDivElement
 */
export const renderEmotionElementToHtml = ({
  elem,
  cssDataKey,
}: {
  elem: EmotionJSX.Element | React.ReactElement;
  cssDataKey: string;
  render?: boolean;
}) => {
  if (!checkStringComposedOnlyLetter(cssDataKey))
    throw new Error(
      `cssDataKey 값을 확인해주세요, cssDataKey 값은 오직 알파벳 소문자만 가능합니다. cssDataKey: ${cssDataKey}`
    );
  if (!cache[cssDataKey]) cache[cssDataKey] = createCache({ key: cssDataKey });
  const container = document.createElement(`div`);
  const component = createRoot(container);
  component.render(<CacheProvider value={cache[cssDataKey]}>{elem}</CacheProvider>);

  return container;
};
