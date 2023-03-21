/** 지도에서 마커 정보를 필터링 하는 기준 */
export enum FilterId {
  /** 힙 스팟 ⭐️ */
  Hipspot,
  /** 스터디 하기 좋은 카페 */
  Study,
  /** 가성비 좋은 카페 */
  Reasonable,
  /** 디저트가 맛있는 카페 */
  Dessert,
  /** 프렌차이즈 카페 */
  Franchise,
  /** 개인 카페 */
  Personal,
}

/** 필터의 정보 */
export type FilterData = {
  /** 필터의 이름
   * @example '힙스팟'
   */
  label: string;
  /** 필터가 활성화 되었을 떄 아이콘
   * @example '/assets/img/HipspotColoredIcon'
   */
  icon: string;
  /** 필터가 비활성화 되었을 떄 아이콘
   * @example '/assets/img/HipspotGrayIcon'
   */
  iconDisabled: string;
  /** 필터의 색상
   * @example colors.tintColor.pink
   */
  color: string;
};

/** 필터 정보의 리스트 */
export type FilterDataList = Record<FilterId, FilterData>;
