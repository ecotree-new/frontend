// Navigation menu items
export const NAV_ITEMS = [
  { label: '회사소개', href: '/about' },
  { label: 'Ecotree', href: '/ecotree' },
  { label: '세계음식 한국 푸드트럭 중앙회', href: '/foodtruck' },
  { label: '운영사례 및 성과', href: '/cases' },
] as const;

// Footer links
export const FOOTER_LINKS = {
  services: [
    { label: '문의하기', href: '/contact', hasIcon: true },
    { label: '오시는길', href: '/about#location', hasIcon: true },
  ],
  legal: [
    { label: '이용약관', href: '/terms' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
} as const;

// Company info
export const COMPANY_INFO = {
  name: 'ecotree',
  ceo: '김은화',
  businessNumber: '000-00-00000',
  phone: '대표 전화',
  email: 'abc1234@gmail.com',
  address: '경기도 안성시 대덕면 소현리 10',
} as const;

// Process cards data
export const PROCESS_CARDS = [
  {
    id: 1,
    icon: '/images/icons/process-1.svg',
    title: '대여',
    description: '행사 규모에 맞는\n다회용기를 준비하여\n현장에 공급합니다.',
  },
  {
    id: 2,
    icon: '/images/icons/process-2.svg',
    title: '회수',
    description: '사용된 용기를 체계적으로\n수거하여 세척 시설로\n운반합니다.',
  },
  {
    id: 3,
    icon: '/images/icons/process-3.svg',
    title: '세척',
    description: '6단계 세척 시스템으로\n위생적으로 살균 처리합니다.',
  },
  {
    id: 4,
    icon: '/images/icons/process-4.svg',
    title: '운영',
    description: '전문 인력이 현장에서\n배부부터 관리까지\n책임집니다.',
  },
] as const;

// Strength cards data
export const STRENGTH_CARDS = [
  {
    id: 1,
    label: '강점 01',
    value: '200',
    unit: '개 이상의',
    title: '행사 운영 경험',
    description: '수백 개의 행사를 성공적으로\n운영한 노하우를 가지고 있습니다.',
  },
  {
    id: 2,
    label: '강점 02',
    value: '전국',
    unit: '어디서든',
    title: '서비스 제공 가능',
    description: '전국 어디든 신속하게 서비스를\n제공합니다.',
  },
  {
    id: 3,
    label: '강점 03',
    value: '100%',
    unit: '자체',
    title: '운영 구조',
    description: '용기 공급부터 세척까지 안정적인\n시스템을 구축하고 있습니다.',
  },
] as const;

// University logos (sample data)
export const UNIVERSITY_LOGOS = [
  { name: '서울대학교', logo: '/images/universities/서울대로고.png' },
  { name: '고려대학교', logo: '/images/universities/고려대로고.png' },
  { name: '연세대학교', logo: '/images/universities/연세대로고.png' },
  { name: '서울시립대학교', logo: '/images/universities/서울시립대로고.png' },
  { name: '성균관대학교', logo: '/images/universities/성균관대로고.png' },
  { name: '한양대학교', logo: '/images/universities/한양대로고.png' },
  { name: '중앙대학교', logo: '/images/universities/중앙대로고.png' },
  { name: '경희대학교', logo: '/images/universities/경희대로고.png' },
  { name: '한국외국어대학교', logo: '/images/universities/한국외대로고.png' },
  { name: '홍익대학교', logo: '/images/universities/홍익대로고.png' },
  { name: '건국대학교', logo: '/images/universities/건국대로고.png' },
  { name: '동국대학교', logo: '/images/universities/동국대로고.png' },
  { name: '단국대학교', logo: '/images/universities/단국대로고.png' },
  { name: '명지대학교', logo: '/images/universities/명지대로고.png' },
  { name: '차의과학대학교', logo: '/images/universities/차의과대로고.png' },
  { name: '숭실대학교', logo: '/images/universities/숭실대로고.png' },
  { name: '가천대학교', logo: '/images/universities/가천대로고.png' },
  { name: '서원대학교', logo: '/images/universities/서원대로고.png' },
  { name: '전북대학교', logo: '/images/universities/전북대로고.png' },
  { name: '극동대학교', logo: '/images/universities/극동대로고.png' },
  { name: '국립공주대학교', logo: '/images/universities/국립공주대로고.png' },
  { name: '공주교육대학교', logo: '/images/universities/공주교육대로고.png' },
  { name: '한국복지대학교', logo: '/images/universities/한국복지대로고.png' },
  { name: '남서울대학교', logo: '/images/universities/남서울대로고.png' },
  { name: '여주대학교', logo: '/images/universities/여주대로고.png' },
  { name: '한신대학교', logo: '/images/universities/한신대로고.png' },
  { name: '국제대학교', logo: '/images/universities/국제대로고.png' },
  { name: '한세대학교', logo: '/images/universities/한세대로고.png' },
  { name: '용인예술과학대학교', logo: '/images/universities/용인예술과학대로고.png' },
  { name: '한경국립대학교', logo: '/images/universities/한경국립대로고.png' },
  { name: '중부대학교', logo: '/images/universities/중부대로고.png' },
  { name: '호원대학교', logo: '/images/universities/호원대로고.png' },
  { name: '경기대학교', logo: '/images/universities/경기대로고.png' },
  { name: '수원대학교', logo: '/images/universities/수원대로고.png' },
  { name: '강남대학교', logo: '/images/universities/강남대로고.png' },
  { name: '한국공학대학교', logo: '/images/universities/한국공대로고.png' },
  { name: '전남대학교', logo: '/images/universities/전남대로고.png' },
  { name: '목원대학교', logo: '/images/universities/목원대로고.png' },
  { name: '충남대학교', logo: '/images/universities/충남대로고.png' },
  { name: '장안대학교', logo: '/images/universities/장안대로고.png' },
  { name: '한양여자대학교', logo: '/images/universities/한양여대로고.png' },
  { name: '대전대학교', logo: '/images/universities/대전대로고.png' },
  { name: '한남대학교', logo: '/images/universities/한남대로고.png' },
  { name: '한성대학교', logo: '/images/universities/한성대로고.png' },
  { name: '아주대학교', logo: '/images/universities/아주대로고.png' },
] as const;


// Regional festivals
export const REGIONAL_FESTIVALS = [
  '부여 롯데아울렛',
  '세종 프로방스',
  '전주 NC웨이브',
  '대전 서구 힐링아트페스티벌',
  '대전 온천문화 축제',
  '세종 유채꽃 축제',
  '조치원 벚꽃 축제',
  '울산 건강박람회',
  '괴산 고추축제',
  '힐스테이트 썸버 페스티벌',
  '청소년 사이다 축제',
  '조치원 연꽃 축제',
  '은하수 공원 가을축제',
  '유구 자카드 섬유 페스티벌',
  '울산 강변에서 놀자',
  '옥천 지용제',
  '싸이 흠뻑쇼',
  '순창세계소스 박람회',
  '세종창업 한마당축제',
  '세종호수공원 아트페스티벌',
  '세종시 로컬푸드 김장한마당',
  '세종대왕과 초청약수 축제',
  '세종 논두렁꽃마당 잔치',
  '세종 사랑의 연탄나눔',
  '세종출범 5주년기념행사',
  '공군참모총장배 스페이스 첼린지-예선',
  '공군참모총장배 스페이스 첼린지-본선',
  '나누 크로스핏 대회',
  '남원 흥부제',
  '내포홀릭 사랑나눔',
  '도담-어진 한마음나눔축제',
  '도램마을 15단지 2주년 페스티벌',
  '김종서장군 문화제',
  '세종가을문화축제',
  '대한민국 무형문화재 대전',
  '백제 문화제',
  '대전 효문화 뿌리축제',
  '동물보호문화축제',
  'K-water와 함께하는 행복 페스티벌',
  '익산 별밤아래',
  '익산연탄축제',
] as const;

// Hero section content
export const HERO_CONTENT = {
  title: '행사를 바꾸는 친환경, 에코트리',
  subtitle: '대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다.',
  ctaText: '서비스 문의',
  ctaLink: '/contact',
} as const;

// Banner section content
export const BANNER_CONTENT = [
  {
    id: 1,
    title: '행사가 끝나면',
    highlight: '쓰레기는 쌓입니다.',
    description: '매년 수백 개의 축제와 행사에서 수십만 개의 일회용품이 버려집니다.',
    image: '/images/problem-banner.jpg',
  },
  {
    id: 2,
    preTitle: '하지만',
    title: '운영 방식이 바뀌면',
    highlight: '결과도 달라집니다.',
    description: '다회용기로 운영된 행사는 일회용품 쓰레기를 95% 이상 줄입니다.',
    image: '/images/insight-banner.jpg',
  },
] as const;

// CTA section content
export const CTA_CONTENT = {
  preTitle: '에코트리로',
  title: '행사 운영하기',
  buttonText: '운영 상담하기',
  buttonLink: '/contact',
} as const;

// Festival counts
export const FESTIVAL_COUNTS = {
  university: 105,
  regional: 46,
} as const;

// About page - Vision & Mission
export const ABOUT_VISION_MISSION = [
  {
    id: 1,
    label: 'Vision',
    title: '기업비전',
    description: '친환경을 \'캠페인\'이 아닌 실제 현장에서 작동하는 운영 체계로 구현합니다.\n공급, 회수, 세척, 재사용이 끊기지 않는 순환 구조를 현장 중심으로 설계합니다.',
    image: '/images/vision.jpeg',
  },
  {
    id: 2,
    label: 'Mission',
    title: '미션',
    description: '공공 행사와 다중 이용 환경에서 다회용기 운영이\n안정적으로 이루어질 수 있도록 전 과정을 직접 관리합니다.',
    image: '/images/mission.jpeg',
  },
] as const;

// About page - Core Values
export const ABOUT_CORE_VALUES = [
  {
    id: 1,
    icon: '/images/icons/core-value-1.svg',
    title: '운영 중심',
    titleEn: 'Operation First',
    description: '현장에서 작동하지 않는 친환경은 의미가 없다고 생각합니다.\n실제 행사 환경, 인력 동선, 회수율을 기준으로 운영 방식을 설계합니다',
  },
  {
    id: 2,
    icon: '/images/icons/core-value-2.svg',
    title: '책임 있는 관리',
    titleEn: 'Accountability',
    description: '용기의 사용부터 회수까지, 책임의 주체를 명확히 합니다.\n위탁이 아닌 직접 운영을 원칙으로 합니다.',
  },
  {
    id: 3,
    icon: '/images/icons/core-value-3.svg',
    title: '신뢰 가능한 프로세스',
    titleEn: 'Reliability',
    description: '행사 규모와 관계없이 동일한 기준으로 운영합니다.\n지자체·공공기관 기준에 맞춘 안정적인 프로세스를 유지합니다.',
  },
  {
    id: 4,
    icon: '/images/icons/core-value-4.svg',
    title: '확장 가능성',
    titleEn: 'Scalability',
    description: '지역과 행사 유형에 제한 없이 적용 가능한 구조를 만듭니다.\n단발성 운영이 아닌, 반복 가능한 시스템을 지향합니다.',
  },
] as const;

// About page - Business Purpose
export const ABOUT_BUSINESS_PURPOSE = [
  {
    id: 1,
    title: '환경 개선',
    description: '탄소 배출 및 쓰레기 반출량 절감',
    image: '/images/about/purpose-1.jpeg',
  },
  {
    id: 2,
    title: '지속 가능한 행사 운영',
    description: '반복 가능한 친환경 운영 방식 구축',
    image: '/images/about/purpose-2.jpeg',
  },
  {
    id: 3,
    title: '일자리 창출',
    description: '취약계층 및 사회초년생 일자리 창출',
    image: '/images/about/purpose-3.jpeg',
  },
] as const;
