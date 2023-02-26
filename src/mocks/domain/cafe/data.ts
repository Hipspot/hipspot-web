import { CafeInfo } from '@libs/types/cafe';

export const cafeData: CafeInfo[] = [
  {
    cafeId: 1,
    cafeName: 'Honor',
    address: '서울 노원구 공릉동 12길34',
    contactNum: '010-1234-5678',
    openingHours: {
      annotation: '공휴일 영업',
      timeBlock: [{ day: ['월', '화', '수', '목', '금', '토', '일'], time: '9:00~23:00' }],
    },
    imageList: [
      'https://user-images.githubusercontent.com/108210492/212647596-3a2cf836-69e8-485a-b93d-4fb4642b935a.png',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
      'https://www.gyeongju.go.kr/upload/content/thumb/20200409/069148D14AFC4BE799F223B16967BF37.jpg',
    ],
    kakaoMapUrl: 'https://map.kakao.com/link/map/카페 힙스팟,37.5446694,127.051352',
    naverMapUrl: 'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%ED%9E%99%EC%8A%A4%ED%8C%9F/place/1234567890',
  },
];
