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
  { name: '서울대학교', logo: '/images/universities/seoul.png' },
  { name: '고려대학교', logo: '/images/universities/korea.png' },
  { name: '연세대학교', logo: '/images/universities/yonsei.png' },
  { name: '한양대학교', logo: '/images/universities/hanyang.png' },
  { name: '성균관대학교', logo: '/images/universities/skku.png' },
  { name: '경희대학교', logo: '/images/universities/khu.png' },
  { name: '중앙대학교', logo: '/images/universities/cau.png' },
  { name: '건국대학교', logo: '/images/universities/konkuk.png' },
  { name: '동국대학교', logo: '/images/universities/dongguk.png' },
  { name: '홍익대학교', logo: '/images/universities/hongik.png' },
] as const;

// Regional festivals (sample data)
export const REGIONAL_FESTIVALS = [
  '서울세계불꽃축제',
  '부산 자갈치축제',
  '전주비빔밥축제',
  '강릉커피축제',
  '보령머드축제',
  '춘천마임축제',
  '안동탈춤축제',
  '진주남강유등축제',
  '화천산천어축제',
  '함평나비축제',
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
