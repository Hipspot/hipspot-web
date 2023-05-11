import styled from '@emotion/styled';
import { BarSizes, BarSizeType } from '@constants/barSizes';
import { TabState } from '@libs/types/infowindow';

export const Layout = styled.div<{ tabState: TabState }>`
  top: 0;
  height: calc(100vh + 30px);
  position: fixed;
  min-width: 300px;
  max-width: 600px;
  height: ${(props) => props.tabState.popUpState === 'full' && `calc(100% + ${BarSizes[BarSizeType.BOTTOM]})`};
  box-sizing: border-box;
  transform: translate(calc(50vw - 50%), 100%);
  width: 100vw;
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  will-change: transform;
`;

export const Wrapper = styled.div`
  position: relative;
  padding-top: 30px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid;
  border-color: #cecacb;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ResizeSide = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  background: transparent;
  height: ${(props: { tabState: { popUpState: string } }) => (props.tabState.popUpState === 'half' ? 80 : 120)}px;
  transform: translateY(-50%);
  transform: ${(props: { tabState: { popUpState: string } }) =>
    props.tabState.popUpState === 'half' && `translateY(0px)`};
  &:hover {
    cursor: row-resize;
  }
`;

export const ResizeSideStyle = styled.div`
  position: absolute;
  top: 0px;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: #e9e7e7;
  border-radius: 4px;
  background-color: white;
`;

export const Icon = styled.div`
  position: absolute;
  top: 46px;
  right: 16px;
  svg {
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
  }
`;
