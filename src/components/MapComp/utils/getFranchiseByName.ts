import { Franchise } from '@libs/types/marker';

const getFranchiseByName = (cafeName: string): Franchise | undefined => {
  if (cafeName.includes('스타벅스')) return 'Starbucks';
  if (cafeName.includes('투썸플레이스')) return 'TwosomePlace';
  if (cafeName.includes('할리스')) return 'Hollys';
  if (cafeName.includes('이디야')) return 'EdiyaCoffee';
  if (cafeName.includes('메가')) return 'MegaMGCCoffee';
  if (cafeName.includes('탐앤탐스')) return 'TomNToms';
  if (cafeName.includes('컴포즈커피')) return 'ComposeCoffee';
  if (cafeName.includes('빽다방')) return 'PaiksCoffee';
  if (cafeName.includes('파스쿠찌')) return 'Pascucci';
  if (cafeName.includes('텐퍼센트커피')) return 'TenpercentCoffee';
  if (cafeName.includes('매머드익스프레스')) return 'MammothExpress';
  if (cafeName.includes('디저트39')) return 'Dessert39';
  if (cafeName.includes('더벤티')) return 'TheVenti';
  if (cafeName.includes('아마스빈')) return 'Amasvin';
  if (cafeName.includes('공차')) return 'Gongcha';
  if (cafeName.includes('떼루와')) return 'Teruwa';
  if (cafeName.includes('쥬씨&차얌')) return 'JuicyChayam';
  if (cafeName.includes('요거프레소')) return 'Yogerpresso';
};

export default getFranchiseByName;
