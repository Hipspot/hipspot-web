import styled from '@emotion/styled';
import { clusterListAtom, openClusterListAtom } from '@recoil/ui';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function ClusterList() {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useRecoilState(openClusterListAtom);
  const clusterList = useRecoilValue(clusterListAtom);

  const handleCloseModal: EventListener = useCallback(
    (e) => {
      if (e.target === document.getElementById('marker')) return;
      if (open && (!ref.current || !ref.current.contains(e.target as Node))) setOpen(false);
    },
    [open, setOpen]
  );

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);

    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  }, [handleCloseModal]);

  return (
    <Wrapper ref={ref} open={open}>
      <ShadowFrame>
        <ItemList>
          {clusterList.map((cluster) => (
            <Item key={cluster.id}>
              <img src={cluster.imageList[0]} alt={cluster.placeName} />
              <p>{cluster.placeName}</p>
            </Item>
          ))}
        </ItemList>
      </ShadowFrame>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ open: boolean }>`
  width: 140px;
  height: 75vh;

  padding: 2px;

  position: absolute;
  top: 132px;
  right: 8px;

  background: #f2f2f2;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
  border-radius: 6px;

  box-sizing: border-box;

  transition: all 0.3s ease-in-out;
  transform: translateX(150px);

  ${(props) =>
    props.open &&
    `
    transform: translateX(0);
  `}
`;

const ShadowFrame = styled.div`
  width: 136px;
  height: 100%;

  padding: 4px;

  background: #f2f2f2;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  box-sizing: border-box;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  gap: 21px;

  width: 128px;
  height: 100%;

  background: #f2f2f2;
  box-shadow: 1px -1px 2px rgba(255, 255, 255, 0.9), -1px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;

  box-sizing: border-box;

  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  img {
    width: 96px;
    height: 96px;
    border-radius: 4px;
  }

  p {
    font-family: 'Pretendard';
    font-weight: 600;
    line-height: 24px;

    text-align: center;

    color: #181818;
  }
`;
