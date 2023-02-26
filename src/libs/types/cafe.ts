/** 카페 정보 타입 */
export type CafeInfo = {
  /**
   * 카페 아이디
   * @example 1
   */
  id: number;
  /**
   * 카페 상호명
   * @example '카페 힙스팟'
   */
  placeName: string;
  /**
   * 카페 주소
   * @example '서울특별시 강남구 역삼동 824-1'
   */
  address: string;
  /**
   * 카페 영업일
   * @example ['월', '화', '수', '목', '금', '토', '일']
   */
  businessDay: string[];
  /**
   * 카페 영업시간
   * @example '10:00 ~ 22:00'
   */
  businessTime: string | null;
  /**
   * 카페 전화번호
   * @example '02-1234-5678'
   */
  contactNum: string;
  /**
   * 카페 인스타그램 아이디
   * @example 'cafehipspot'
   */
  instaId: string;
  /**
   * 카페 대표 이미지 리스트
   * @example ['https://cafehipspot.com/images/1.jpg', 'https://cafehipspot.com/images/2.jpg']
   */
  imageList: string[];
  /**
   * 네이버 지도 주소
   * @example 'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%ED%9E%99%EC%8A%A4%ED%8C%9F/place/1234567890'
   */
  naverMapUrl: string | null;
  /**
   * 카카오 지도 주소
   * @example 'https://map.kakao.com/link/map/카페 힙스팟,37.5446694,127.051352'
   */
  kakaoMapUrl: string | null;
  /**
   * 카페 즐겨찾기 여부
   * @description null일 경우 로그인하지 않은 상태 / true일 경우 즐겨찾기 등록 / false일 경우 즐겨찾기 해제
   * @example true | false | null
   */
  isBookmarked: null | boolean;
};
