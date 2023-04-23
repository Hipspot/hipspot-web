import { S3_URL } from '@constants/s3Url';
import styled from '@emotion/styled';
import { ImageList, ImageTabBarState, ImageTabKey } from '@libs/types/imageTabList';
import { activatedCafeIdAtom } from '@states/infoWindow';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ImageSlider from './ImageSlider';

/**
 * @descripton ImageTabKey로 Tab Name을 얻을 수 있는 객체
 */
const imageTabName = { store: '업체제공사진', menu: '메뉴' };
// uitls
/**
 * @example
 *    [
 *      {isSelected: true, name: 'store'},
 *      {isSelected: false, name: 'menu'}
 *    ]
 *
 */
const initTabBar: (imageList: ImageList) => ImageTabBarState = (imageList: ImageList) =>
  Object.keys(imageList).map((key, i) => ({
    isSelected: i === 0,
    key: key as ImageTabKey,
    name: imageTabName[key as ImageTabKey],
  }));

const S3ImageUrl = (cafeId: number, key: string, strList: string[]) =>
  strList ? strList.map((str) => `${S3_URL}/${cafeId}/${key}/${str}`) : [];

interface ImageListTabProps {
  cafeId: number;
  imageList: ImageList;
  wrapperId: string;
}

function ImageListTab({ cafeId, imageList, wrapperId }: ImageListTabProps) {
  const [currentImageList, setCurrenImageList] = useState<string[]>(S3ImageUrl(cafeId, 'store', imageList.store));
  const [imageTabBarState, setImageTabBarState] = useState<ImageTabBarState>(initTabBar(imageList));
  const activeCafeId = useRecoilValue(activatedCafeIdAtom);

  const handleTabChange = (currentTab: ImageTabKey) => {
    const nextUrlList = S3ImageUrl(cafeId, currentTab, imageList[currentTab]);
    setCurrenImageList(nextUrlList);
    setImageTabBarState((prev) =>
      prev.map((imageTab) =>
        imageTab.key === currentTab ? { ...imageTab, isSelected: true } : { ...imageTab, isSelected: false }
      )
    );
  };

  useEffect(() => {
    if (!activeCafeId) return;
    setImageTabBarState(() => initTabBar(imageList));
    setCurrenImageList(() => S3ImageUrl(activeCafeId, 'store', imageList.store));
  }, [activeCafeId]);

  return (
    <Wrapper>
      <ImageSlider imageList={currentImageList} wrapperId={wrapperId} />
      <TabBarWrapper>
        {imageTabBarState.map(({ isSelected, key, name }) => (
          <Tab key={`imageTabBar_${key}`} isSelected={isSelected} onClick={() => handleTabChange(key)}>
            {name}
          </Tab>
        ))}
      </TabBarWrapper>
    </Wrapper>
  );
}

export default ImageListTab;

const Wrapper = styled.div``;

const TabBarWrapper = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 60px;
  display: flex;
  gap: 32px;
  flex-shrink: 0;
  align-items: center;
`;

const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  border-radius: 12px 12px 0px 0px;
  color: #999999;
  filter: brightness(0.99);

  ${(props) =>
    props.isSelected &&
    `
    color: black;
    filter: none;
  `}
`;
