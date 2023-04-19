import useMarkerClickAction from '@components/MapComp/hooks/useMarkerClickAction';
import { S3_URL } from '@constants/s3Url';
import styled from '@emotion/styled';
import { clusterListAtom, openClusterListAtom } from '@states/clusterList';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ItemList from './ItemList';

export default function ClusterList() {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useRecoilState(openClusterListAtom);
  const clusterList = useRecoilValue(clusterListAtom);

  const { pointMarkerClickAction } = useMarkerClickAction();

  const handleCloseModal: EventListener = useCallback(
    (e) => {
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
        <ItemList.Wrapper>
          {clusterList.map((cluster) => (
            <ItemList.Item key={cluster.cafeId} onClick={() => pointMarkerClickAction(cluster.cafeId)}>
              <ItemList.ItemImg src={`${S3_URL}/${cluster.cafeId}/store/${cluster.thumbNail}`} alt={cluster.cafeName} />
              <ItemList.ItemName>{cluster.cafeName}</ItemList.ItemName>
            </ItemList.Item>
          ))}
        </ItemList.Wrapper>
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
    `transform: translateX(0);
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
