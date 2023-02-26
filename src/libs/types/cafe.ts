/** 카페 정보 타입 */
export type CafeInfo = {
  /**
   * 카페 아이디
   * @example 1
   */
  cafeId: number;
  /**
   * 카페 상호명
   * @example '카페 힙스팟'
   */
  cafeName: string;
  /**
   * 카페 주소
   * @example '서울특별시 강남구 역삼동 824-1'
   */
  address: string;
  /**
   * 카페 운영시간
   * @example "annotation": "매주 5째주 휴무",
      "timeBlock": [
	        {
	          "day": ["화","수","목","금","토","일" ],
	          "time": "11:00 ~ 23:00"
	        },
	        {
	          "day": ["월" ],
	          "time": "11:00 ~ 20:00"
	        }
      ]
   */
  openingHours: OpeningHours;
  /**
   * 카페 전화번호
   * @example '02-1234-5678'
   */
  contactNum: string;

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
};

export type Days = '월' | '화' | '수' | '목' | '금' | '토' | '일' | '매일';

export type OpeningHours = {
  annotation: string;
  timeBlock: [{ day: Days[]; time: string }];
};
