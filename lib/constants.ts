// Navigation menu items
export const NAV_ITEMS = [
  { label: '회사소개', href: '/about' },
  { label: '다회용기', href: '/ecotree' },
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
  name: 'ECOTREE',
  ceo: '김은화',
  businessNumber: '680-06-04008',
  phone: '1688-8695',
  email: 'donfoorock@naver.com',
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
  { name: '서울대학교', logo: '/images/universities/서울대로고.webp' },
  { name: '고려대학교', logo: '/images/universities/고려대로고.webp' },
  { name: '연세대학교', logo: '/images/universities/연세대로고.webp' },
  { name: '서울시립대학교', logo: '/images/universities/서울시립대로고.webp' },
  { name: '성균관대학교', logo: '/images/universities/성균관대로고.webp' },
  { name: '한양대학교', logo: '/images/universities/한양대로고.webp' },
  { name: '중앙대학교', logo: '/images/universities/중앙대로고.webp' },
  { name: '경희대학교', logo: '/images/universities/경희대로고.webp' },
  { name: '한국외국어대학교', logo: '/images/universities/한국외대로고.webp' },
  { name: '홍익대학교', logo: '/images/universities/홍익대로고.webp' },
  { name: '건국대학교', logo: '/images/universities/건국대로고.webp' },
  { name: '동국대학교', logo: '/images/universities/동국대로고.webp' },
  { name: '단국대학교', logo: '/images/universities/단국대로고.webp' },
  { name: '명지대학교', logo: '/images/universities/명지대로고.webp' },
  { name: '차의과학대학교', logo: '/images/universities/차의과대로고.webp' },
  { name: '숭실대학교', logo: '/images/universities/숭실대로고.webp' },
  { name: '가천대학교', logo: '/images/universities/가천대로고.webp' },
  { name: '서원대학교', logo: '/images/universities/서원대로고.webp' },
  { name: '전북대학교', logo: '/images/universities/전북대로고.webp' },
  { name: '극동대학교', logo: '/images/universities/극동대로고.webp' },
  { name: '국립공주대학교', logo: '/images/universities/국립공주대로고.webp' },
  { name: '공주교육대학교', logo: '/images/universities/공주교육대로고.webp' },
  { name: '한국복지대학교', logo: '/images/universities/한국복지대로고.webp' },
  { name: '남서울대학교', logo: '/images/universities/남서울대로고.webp' },
  { name: '여주대학교', logo: '/images/universities/여주대로고.webp' },
  { name: '한신대학교', logo: '/images/universities/한신대로고.webp' },
  { name: '국제대학교', logo: '/images/universities/국제대로고.webp' },
  { name: '한세대학교', logo: '/images/universities/한세대로고.webp' },
  { name: '용인예술과학대학교', logo: '/images/universities/용인예술과학대로고.webp' },
  { name: '한경국립대학교', logo: '/images/universities/한경국립대로고.webp' },
  { name: '중부대학교', logo: '/images/universities/중부대로고.webp' },
  { name: '호원대학교', logo: '/images/universities/호원대로고.webp' },
  { name: '경기대학교', logo: '/images/universities/경기대로고.webp' },
  { name: '수원대학교', logo: '/images/universities/수원대로고.webp' },
  { name: '강남대학교', logo: '/images/universities/강남대로고.webp' },
  { name: '한국공학대학교', logo: '/images/universities/한국공대로고.webp' },
  { name: '전남대학교', logo: '/images/universities/전남대로고.webp' },
  { name: '목원대학교', logo: '/images/universities/목원대로고.webp' },
  { name: '충남대학교', logo: '/images/universities/충남대로고.webp' },
  { name: '장안대학교', logo: '/images/universities/장안대로고.webp' },
  { name: '한양여자대학교', logo: '/images/universities/한양여대로고.webp' },
  { name: '대전대학교', logo: '/images/universities/대전대로고.webp' },
  { name: '한남대학교', logo: '/images/universities/한남대로고.webp' },
  { name: '한성대학교', logo: '/images/universities/한성대로고.webp' },
  { name: '아주대학교', logo: '/images/universities/아주대로고.webp' },
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
  '대전 효문화 뿌리축제',
  '조치원 연꽃 축제',
  '은하수 공원 가을축제',
  '유구 자카드 섬유 페스티벌',
  '울산 강변에서 놀자',
  '옥천 지용제',
  '싸이 흠뻑쇼',
  '순창세계소스 박람회',
  '세종창업 한마당축제',
  '백제 문화제',
  '세종호수공원 아트페스티벌',
  '세종시 로컬푸드 김장한마당',
  '세종대왕과 초청약수 축제',
  '내포홀릭 사랑나눔',
  '대한민국 무형문화재 대전',
  '세종 논두렁꽃마당 잔치',
  '공군참모총장배 스페이스 첼린지-예선',
  '공군참모총장배 스페이스 첼린지-본선',
  '동물보호문화축제',
  '남원 흥부제',
  '도담-어진 한마음나눔축제',
  '도램마을 15단지 2주년 페스티벌',
  '세종 사랑의 연탄나눔',
  '나누 크로스핏 대회',
  '세종가을문화축제',
  '청소년 사이다 축제',
  '김종서장군 문화제',
  'K-water와 함께하는 행복 페스티벌',
  '익산 별밤아래',
  '익산연탄축제',
  '세종출범 5주년기념행사',
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
    label: 'Problem',
    title: '행사가 끝나면',
    highlight: '쓰레기는 쌓입니다.',
    description: '매년 수백 개의 축제와 행사에서\n수십만 개의 일회용품이 버려집니다.',
    image: '/images/problem-banner.webp',
  },
  {
    id: 2,
    label: 'Solution',
    preTitle: '하지만',
    title: '운영 방식이 바뀌면',
    highlight: '결과도 달라집니다.',
    description: '다회용기로 운영된 행사는\n일회용품 쓰레기를 95% 이상 줄입니다.',
    image: '/images/insight-banner.webp',
  },
] as const;

// CTA section content
export const CTA_CONTENT = {
  preTitle: '에코트리로',
  title: '행사 운영하기',
  buttonText: '서비스 문의',
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
    image: '/images/vision.webp',
  },
  {
    id: 2,
    label: 'Mission',
    title: '미션',
    description: '공공 행사와 다중 이용 환경에서 다회용기 운영이\n안정적으로 이루어질 수 있도록 전 과정을 직접 관리합니다.',
    image: '/images/mission.webp',
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
    image: '/images/about/purpose-1.webp',
  },
  {
    id: 2,
    title: '지속 가능한 행사 운영',
    description: '반복 가능한 친환경 운영 방식 구축',
    image: '/images/about/purpose-2.webp',
  },
  {
    id: 3,
    title: '일자리 창출',
    description: '취약계층 및 사회초년생 일자리 창출',
    image: '/images/about/purpose-3.webp',
  },
] as const;

// Contact page - Event types for dropdown
export const EVENT_TYPES = [
  { value: '', label: '선택해주세요' },
  { value: 'university', label: '대학교 축제' },
  { value: 'regional', label: '지역 축제' },
  { value: 'corporate', label: '기업 행사' },
  { value: 'other', label: '기타' },
] as const;

// Contact page - Email domains for dropdown
export const EMAIL_DOMAINS = [
  { value: '', label: '직접 입력' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'kakao.com', label: 'kakao.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
] as const;

// Contact page - FAQ categories
export const FAQ_CATEGORIES = [
  { id: 1, label: '다회용기 서비스 이해' },
  { id: 2, label: '운영 & 처리' },
  { id: 3, label: '비용 & 일정' },
  { id: 4, label: 'ESG & 환경' },
  { id: 5, label: '활용 사례' },
  { id: 6, label: '기타' },
] as const;

// Contact page - FAQ data
export const FAQ_DATA = [
  {
    id: 1,
    categoryId: 1,
    question: '다회용기 서비스는 어떤 서비스인가요?',
    answer: '다회용기 대여부터 현장 배포·회수·세척·재공급까지 전 과정을 포함한 운영 서비스입니다. 행사 성격에 따라 현장 운영 인력 지원도 포함해 운영이 가능합니다.',
  },
  {
    id: 2,
    categoryId: 1,
    question: '다회용기는 어떤 행사에 이용할 수 있나요?',
    answer: '대학교 축제, 지역 축제, 기업 행사, 공공기관 행사 등 다양한 유형의 행사에서 서비스를 이용하실 수 있습니다.',
  },
  {
    id: 3,
    categoryId: 1,
    question: '다회용기 시스템의 특징은 무엇인가요?',
    answer: '일회용품 대비 환경 부담을 줄이고, 체계적인 회수·세척 시스템을 통해 위생적이고 지속 가능한 행사 운영이 가능합니다.',
  },
  {
    id: 4,
    categoryId: 2,
    question: '용기 회수는 어떻게 진행되나요?',
    answer: '전문 인력이 현장에 상주하며 체계적으로 회수를 진행합니다. 회수 스테이션 설치 및 안내를 통해 높은 회수율을 유지합니다.',
  },
  {
    id: 5,
    categoryId: 2,
    question: '세척은 어떻게 진행되나요?',
    answer: '6단계 세척 시스템을 통해 위생적으로 살균 처리합니다. 식품위생법 기준을 준수하여 안전하게 관리됩니다.',
  },
  {
    id: 6,
    categoryId: 3,
    question: '서비스 요금은 어떻게 책정되나요?',
    answer: '행사 규모, 기간, 예상 인원 등을 고려하여 맞춤형 견적을 제공합니다. 정확한 요금은 상담을 통해 안내받으실 수 있습니다.',
  },
  {
    id: 7,
    categoryId: 3,
    question: '결제는 어떻게 진행되나요?',
    answer: '계약 체결 후 계약금을 납부하시고, 행사 종료 후 잔금을 정산하는 방식으로 진행됩니다. 세부 사항은 계약 시 안내해 드립니다.',
  },
  {
    id: 8,
    categoryId: 4,
    question: '환경적 효과는 어떻게 되나요?',
    answer: '다회용기 사용으로 일회용품 쓰레기를 95% 이상 줄일 수 있습니다. 탄소 배출량 감소에도 기여합니다.',
  },
  {
    id: 9,
    categoryId: 5,
    question: '어떤 행사에서 서비스를 이용했나요?',
    answer: '서울대, 고려대, 연세대 등 주요 대학 축제와 세종시, 대전시 등 지역 축제에서 서비스를 제공했습니다.',
  },
  {
    id: 10,
    categoryId: 6,
    question: '계약 취소 시 환불 정책은 어떻게 되나요?',
    answer: '행사 14일 전까지 취소 시 전액 환불, 7일 전까지 취소 시 50% 환불, 이후 취소 시 환불이 어렵습니다. 자세한 내용은 계약서를 참고해 주세요.',
  },
] as const;

// Contact page - Resources data
export const RESOURCES_DATA = [
  {
    id: 1,
    title: '에코트리 제안서',
    date: '2025-12-29',
    downloadUrl: 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/documents/ecotree-proposal.pdf',
  },
  {
    id: 2,
    title: '한국 세계음식 푸드트럭 중앙회 제안서',
    date: '2025-12-29',
    downloadUrl: 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/documents/foodtruck-proposal.pdf',
  },
] as const;

// Contact page - Tab items
export const CONTACT_TABS = [
  { id: 'inquiry', label: '1:1 문의' },
  { id: 'faq', label: '자주 묻는 질문' },
  { id: 'resources', label: '자료실' },
] as const;

// Cases page - Process steps
export const CASES_PROCESS_STEPS = [
  {
    id: 1,
    number: '01',
    title: '행사 정보 입력',
    description: '행사 목적과 규모를 알려주세요',
  },
  {
    id: 2,
    number: '02',
    title: '운영 방식 제안',
    description: '행사 규모와 동선에 맞춘 운영안을 제안드립니다.',
  },
  {
    id: 3,
    number: '03',
    title: '운영 확정 및 준비',
    description: '최종 운영안을 확정하고 운영 가이드를 사전 안내드립니다.',
  },
  {
    id: 4,
    number: '04',
    title: '현장 운영 및 결과 공유',
    description: '현장 운영을 지원하고 운영 결과를 리포트로 공유드립니다.',
  },
] as const;

// Cases page - Ecotree cases
export const ECOTREE_CASES = [
  {
    id: 1,
    label: 'S 기업 행사',
    title: '쓰레기 처리 부담이 줄어\n행사 마무리가 수월했습니다.',
    description: '행사 운영에서 큰 부담 중 하나는 행사 종료 후 쓰레기 처리 였습니다. 다회용기 사용을 도입하며 현장 정리와 쓰레기 처리 부담이 눈에 띄게 줄었고 운영팀은 행사 마무리에만 집중할 수 있었습니다.',
    image: '/images/cases/placeholder-1.webp',
    link: '/cases/ecotree-1',
  },
  {
    id: 2,
    label: 'B 지자체 행사',
    title: '행사 내내 공간이 정돈된 상태로\n쾌적하게 유지됐습니다.',
    description: '일회용기를 사용할 때는 식사 후 테이블과 주변 공간에 쓰레기가 빠르게 쌓였지만 다회용기 사용 도입 후 현장 곳곳에서 회수가 가능하면서 행사 공간이 깔끔하게 유지되었습니다.',
    image: '/images/cases/placeholder-2.webp',
    link: '/cases/ecotree-2',
  },
] as const;

// Cases page - Foodtruck cases
export const FOODTRUCK_CASES = [
  {
    id: 1,
    label: 'K 대학 축제',
    title: '행사 규모에 맞춘 구성으로\n현장 혼선이 줄었습니다.',
    description: '행사 운영에서 큰 부담 중 하나는 행사 종료 후 쓰레기 처리 였습니다. 다회용기 사용을 도입하며 현장 정리와 쓰레기 처리 부담이 눈에 띄게 줄었고 운영팀은 행사 마무리에만 집중할 수 있었습니다.',
    image: '/images/cases/placeholder-3.webp',
    link: '/cases/foodtruck-1',
  },
  {
    id: 2,
    label: 'S 지역 행사',
    title: '메뉴가 겹치지 않아서\n선택하기 편했습니다.',
    description: '보통 푸드트럭 여러 대 들어오면 메뉴가 비슷해지는 경우가 많은데 이번에는 메뉴가 잘 나누어졌습니다. 특정 트럭에만 줄이 몰리지 않아 현장에서 메뉴 관련 민원이 거의 없었습니다.',
    image: '/images/cases/placeholder-4.webp',
    link: '/cases/foodtruck-2',
  },
] as const;

// Cases page - Joint cases (동시 운영 사례)
export const JOINT_CASES = [
  {
    id: 1,
    label: 'C 지자체 행사',
    title: '운영이 훨씬\n단순해졌습니다.',
    image: '/images/cases/placeholder-5.webp',
    link: '/cases/joint-1',
  },
  {
    id: 2,
    label: 'R 페스티벌',
    title: '현장에서 신경 쓸 게\n줄어들었습니다.',
    image: '/images/cases/placeholder-6.webp',
    link: '/cases/joint-2',
  },
  {
    id: 3,
    label: 'H 대학축제',
    title: '행사 위생이 확연히\n깔끔해졌습니다.',
    image: '/images/cases/placeholder-7.webp',
    link: '/cases/joint-3',
  },
] as const;

// Joint Case Articles - Full article content
export const JOINT_CASE_ARTICLES: Record<string, {
  id: string;
  label: string;
  date: string;
  title: string;
  heroImage: string;
  cardImage: string;
  cardTitle: string;
  sections: { heading: string; content: string }[];
}> = {
  'joint-1': {
    id: 'joint-1',
    label: 'C 지자체 행사',
    date: '2024.03',
    title: '운영이 훨씬 단순해졌습니다.',
    heroImage: '/images/cases/placeholder-5.webp',
    cardImage: '/images/cases/placeholder-5.webp',
    cardTitle: '운영이 훨씬\n단순해졌습니다.',
    sections: [
      {
        heading: '행사 진행에서 제일 어려운 건 시작 전 준비 단계였습니다.',
        content: '지자체 행사는 준비 단계부터 손이 많이 갑니다. 푸드트럭이 들어가면 더 그렇고요. 트럭을 몇 대로 갈지, 어떤 종류로 구성할지, 줄 서는 방향이랑 이동 동선을 어떻게 잡을지까지 저희가 거의 다 정해야 하거든요. 이걸 대충 잡으면 당일에 바로 티가 납니다. 한쪽에만 줄이 몰리거나, 동선이 겹치면서 현장이 어수선해져요. 그래서 시작 전에 설계를 잘 잡는 게 제일 중요한데, 동시에 제일 부담입니다.',
      },
      {
        heading: '푸드트럭만 제공하는게 아니라 구성과 동선까지 제안해준 덕분에 준비가 훨씬 수월했습니다.',
        content: '이번에는 에코트리로 푸드트럭을 운영했습니다. 좋았던 건 단순히 푸드트럭만 대여하는 수준이 아니라 푸드트럭은 운영하는데 있어 구성과 동선까지 제안해줬다는 점이에요. 행사 규모랑 현장 환경을 보고 이 정도면 트럭은 어느 정도가 적당한지, 메뉴 카테고리는 어떻게 섞는 게 좋은지, 배치는 어떻게 잡아야 덜 꼬이는지 먼저 방향을 주셨어요.\n\n저희는 그 안에서 행사 성격에 맞게 조정만 하면 됐고요. 준비 단계에서 가장 시간을 잡아먹는 부분이 정리되니까 내부에서도 결정이 빨랐습니다. 회의가 길어질 이유가 없더라고요.',
      },
      {
        heading: '현장에서는 쓰레기 걱정이 줄었고, 친환경 행사 취지에도 잘 맞았습니다.',
        content: '행사 운영할 때 늘 신경 쓰이는 게 쓰레기입니다. 사람이 몰리는 시간대에는 일회용품이 쌓이는 속도를 정리가 못 따라가서 현장이 금방 지저분해 보이거든요. 그러면 민원도 늘고, 운영팀은 계속 돌아다니면서 정리 이슈를 잡아야 합니다.\n\n이번에는 다회용기를 같이 운영했고 반납 부스가 따로 있으니까 흐름이 달랐어요. 참가자들이 여기저기 버리는 게 아니라 반납을 하게 되니 쓰레기가 흩어지는 상황이 줄었습니다. 저희 입장에서는 쓰레기 처리 때문에 계속 신경 쓰는 일이 확실히 줄었고요. 운영 중에 눈으로 계속 쫓아야 하는 포인트가 줄어든 게 가장 컸습니다.\n\n이번 행사가 친환경 관련 행사였는데 그 취지랑도 잘 맞았습니다. 말로만 친환경을 이야기하는 게 아니라 현장에서 실제로 그렇게 운영되니까요. 참가자 입장에서도 납득이 되는 방식이었고, 저희도 "이 행사를 제대로 운영했다"는 만족감이 남았습니다. 준비 단계에서는 푸드트럭 구성과 동선 설계를 제안받아서 훨씬 편했고, 행사 당일에는 다회용기 반납 흐름 덕분에 쓰레기 관련 부담이 줄었습니다. 비슷한 성격의 지자체 행사를 또 맡게 되면, 저희는 이번 방식 그대로 가져갈 것 같아요.',
      },
    ],
  },
  'joint-2': {
    id: 'joint-2',
    label: 'R 페스티벌',
    date: '2025.07',
    title: '현장에서 신경 쓸 게 줄어들었습니다.',
    heroImage: '/images/cases/placeholder-6.webp',
    cardImage: '/images/cases/placeholder-6.webp',
    cardTitle: '현장에서 신경 쓸 게\n줄어들었습니다.',
    sections: [
      {
        heading: '페스티벌의 피크 타임',
        content: '페스티벌은 진짜 "몰릴 때 한 번에 몰리는" 현장이에요. 공연 시작 전후로 사람 흐름이 확 바뀌고 그 타이밍에 주문이 같이 터집니다. 줄은 길어지고, 동선은 금방 복잡해지고요. 솔직히 공연 진행만 해도 신경 쓸 게 많은데 먹거리 운영까지 얹히면 챙겨야 할 게 끝이 없습니다. 특히 오후 6시~8시쯤은 운영자가 계속 뛰어다닐 수밖에 없어요.\n\n그리고 이럴 때 제일 먼저 무너지는 게 보통 \'정리\'입니다. 일회용품을 쓰면 쓰레기가 쌓이는 속도가 너무 빨라서 정리가 한 번 밀리기 시작하면 현장이 바로 어수선해 보이거든요. 분위기 좋은 페스티벌이 한순간에 정신없어지는 것도 보통 이때부터입니다.',
      },
      {
        heading: '반신반의했는데, 막상 해보니 다르더라고요',
        content: '이번에는 원래 세계 음식 푸드트럭 중앙회에서 푸드트럭만 대여하려고 했습니다. 그런데 상담할 때 관계자분이 다회용기 운영까지 같이 하면 현장 정리가 훨씬 편해질 수 있다고 먼저 제안을 주셨어요. 저희도 쓰레기나 정리 이슈가 늘 부담이긴 했지만, 처음엔 반신반의했습니다. 다회용기를 쓰면 오히려 챙길 게 더 늘고, 현장이 더 복잡해질 것 같았거든요.\n\n막상 운영해보니 생각이 달라졌습니다. 다회용기를 반납하는 부스가 따로 있으니까, 참가자들이 사용한 용기를 여기저기 두거나 아무 데나 버리는 상황이 확 줄더라고요. "이거 어디에 버려요?" 같은 질문이 여기저기서 터지지 않으니 운영진도 덜 지쳤고요. 무엇보다 정리 때문에 계속 끌려다니는 시간이 줄었습니다. 피크 타임에도 쓰레기가 한꺼번에 쌓이면서 현장이 급격히 어수선해지는 순간이 적었고, 그래서 운영진이 정리만 붙잡고 있지 않아도 됐습니다.',
      },
      {
        heading: '현장 정리보다 축제 진행에 집중할 수 있었습니다.',
        content: '예전에는 피크 타임만 지나면 머릿속이 진짜 \'쓰레기\'로 꽉 찼습니다. 어디가 먼저 지저분해졌는지, 쓰레기통이 터지기 시작한 구역은 어디인지, 테이블 주변이 어수선해 보이진 않는지 계속 훑게 되거든요. 그러다 보면 자연스럽게 다음 고민으로 넘어갑니다. "정리 인력을 더 붙여야 하나?", "지금 치우지 않으면 민원 들어오겠는데?", "쓰레기 봉투 어디 더 가져오지?" 같은 것들요. 결국 운영자가 해야 할 일이 진행 관리인데, 어느 순간부터는 정리 이슈에 계속 끌려가게 됩니다.\n\n그날은 피크 타임이 지나고 현장을 한 바퀴 돌면서도, 늘 하던 걱정을 덜 했어요. "여기 터졌나?" 확인하러 뛰는 대신, 줄이 너무 길게 늘어서진 않는지, 공연 시작 시간에 맞춰 사람 흐름이 어떻게 바뀌는지 같은 \'진짜 운영\' 쪽을 볼 여유가 생겼습니다. 끝나고 나서 남은 감정도 좀 달랐고요. 그냥 "힘들었다"가 아니라, "아, 다음에도 이 방식이면 운영이 덜 흔들리겠다"라는 생각이 들었습니다.',
      },
    ],
  },
  'joint-3': {
    id: 'joint-3',
    label: 'H 대학축제',
    date: '2025.09',
    title: '행사 위생이 확연히 깔끔해졌습니다.',
    heroImage: '/images/cases/placeholder-7.webp',
    cardImage: '/images/cases/placeholder-7.webp',
    cardTitle: '행사 위생이 확연히\n깔끔해졌습니다.',
    sections: [
      {
        heading: '학생회가 맡는 축제 운영, 늘 변수가 많았습니다',
        content: '대학 축제는 기본적으로 학생회가 운영을 맡습니다. 문제는 저희가 \'전문가\'가 아니라는 거예요. 현장 경험이 매번 쌓이는 구조도 아니고 준비 기간은 늘 빠듯하다 보니 축제가 시작되면 예상 못 한 이슈가 꼭 생깁니다. 축제 기간 내내 학생회 친구들은 뛰어다니면서 진행을 맞추고 상황이 터지면 그때그때 막아야 하고요. 그리고 축제가 끝나면 늘 마지막 숙제가 남습니다. 현장 마무리 정리랑 쓰레기 정리요. 축제 진행하는 것만으로도 이미 체력이 바닥나는데 끝나고 마감 정리까지 하면 진짜 녹초가 됩니다. 그때마다 학생회 친구들한테 미안해요. 마지막까지 정리로 붙잡아두는 느낌이니까요.',
      },
      {
        heading: '푸드트럭만 생각했는데, 다회용기 제안을 받고 같이 하게 됐습니다',
        content: '이번 축제도 처음에는 푸드트럭 운영을 어떻게 할지부터 고민했습니다. 학생회가 운영을 맡다 보니 현장 경험이 많지 않고 한 번 잘못 잡으면 당일에 바로 줄이 엉키거나 대기 줄이 한없이 늘어나는 상황이 생기거든요. 에코트리랑 이야기하면서 좋았던 건 단순 푸드트럭 대여가 아니라 대학축제에서 실제로 잘 돌아가는 조합을 먼저 잡아줬다는 점이었어요. 학생들 반응이 좋은 구성이 뭔지 피크 타임에 병목이 덜 생기는 조합이 뭔지 기준이 딱 있더라고요. 저희는 그 제안을 바탕으로 우리 학교 분위기와 운영 상황에 맞게 조정만 하면 됐고, 준비 단계에서 부담이 확 줄었습니다.\n\n다회용기는 사실 처음부터 계획에 있던 건 아니었습니다. 그런데 축제 운영에서 제일 힘든 게 끝나고 마감 정리라는 걸 아니까, 에코트리 쪽에서 "이 부분을 줄이려면 다회용기 운영을 같이 가져가보자"는 방향을 주셨고요. 처음엔 솔직히 "이거 더 복잡해지는 거 아닌가?" 싶었어요. 학생회는 인력이 늘 부족하니까요. 근데 다른 대학 축제 운영 사례들을 보니까 오히려 그쪽이 더 깔끔하게 굴러가더라고요. 그래서 "이건 같이 하는 게 낫겠다" 싶었습니다.',
      },
      {
        heading: '다회용기 쓰니까, \'축제 끝나고 정리\'가 달라졌습니다',
        content: '결과적으로 이 선택이 제일 크게 체감됐습니다. 일회용품을 쓰면 축제 중간에도 쓰레기가 쌓이고 끝나면 그게 한꺼번에 남습니다. 그래서 학생회는 마지막에 체력이 다 빠진 상태로 쓰레기 정리를 붙잡게 되죠.\n\n이번에는 다회용기를 쓰다 보니 상황이 달랐습니다. 현장이 예전처럼 급격하게 지저분해지지 않았고 무엇보다 축제 끝난 뒤에 "이제 쓰레기부터 치워야 한다"는 부담이 확 줄었습니다. 마감 정리가 늘 힘든 숙제였는데 이번에는 그 시간이 훨씬 덜 고되고 정돈된 느낌으로 마무리할 수 있었습니다. 제목 그대로 행사 위생이 확연히 깔끔해졌습니다.',
      },
      {
        heading: '학생 반응이 좋아서, 운영자로서 더 만족스러웠습니다',
        content: '학생들 반응도 좋았습니다. 축제는 재미도 중요하지만 현장이 깔끔하면 분위기 자체가 달라집니다. 줄을 서도 덜 어수선해 보이고 먹고 난 뒤에도 주변이 정돈돼 있으니 "잘 운영된 축제"라는 인상이 남더라고요. 학생회 입장에서도 진행을 챙기느라 바쁜 와중에 정리 이슈까지 끌려가지 않으니까 축제 자체에 더 집중할 수 있었습니다.\n\n이번 축제를 깨끗하고 만족스럽게 마무리할 수 있었던 건 에코트리 덕분에 운영의 방향이 잡혔기 때문이라고 생각합니다. 푸드트럭 구성도 추천해주고 다회용기 운영까지 함께 설계해준 덕분에 학생회가 감당해야 할 부담이 확 줄었습니다. 다음 축제에서도 저희는 이번 방식 그대로 가져갈 것 같습니다. 학생들이 즐기는 축제인 만큼 운영도 끝까지 깔끔하게 마무리되는 게 중요하니까요.',
      },
    ],
  },
};

// Cases page - Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    company: 'B대학교',
    content: '원래 행사가 끝나면 쓰레기로 엉망인데 에코트리와 함께하니 쾌적한 행사가 되었어요',
  },
  {
    id: 2,
    company: 'S지자체',
    content: '다회용기 운영이 처음이라 걱정했는데 체계적인 시스템 덕분에 순조롭게 진행됐습니다',
  },
  {
    id: 3,
    company: 'K기업',
    content: '행사 후 정리 시간이 확연히 줄었어요. 다음에도 꼭 함께하고 싶습니다',
  },
  {
    id: 4,
    company: 'D축제',
    content: '환경도 지키고 운영 효율도 높아져서 일석이조였습니다',
  },
  {
    id: 5,
    company: 'M대학교',
    content: '학생들 반응도 좋았고, 행사장이 깔끔하게 유지되어 만족스러웠습니다',
  },
] as const;

// ============================================
// Foodtruck Page Data
// ============================================

// Foodtruck page - Hero tiles
export const FOODTRUCK_HERO_TILES = [
  { id: 1, title: '축제', image: '/images/foodtruck/festival.webp', objectPosition: 'center bottom' },
  { id: 2, title: '기업 행사', image: '/images/foodtruck/corporate.webp', objectPosition: 'center center' },
  { id: 3, title: '연예인 서포트', image: '/images/foodtruck/celebrity.webp', objectPosition: 'center center' },
] as const;

export const FOODTRUCK_HERO_MAIN_COPY = {
  title: '에코트리는 다양한 행사 현장에서 함께합니다.',
  // subtitle: '다양한 행사 경험을 바탕으로 최적의 운영을 제안합니다.',
} as const;

// Foodtruck page - Service cards
export const FOODTRUCK_SERVICE_CARDS = [
  {
    id: 1,
    title: '케이터링',
    subtitle: '주최자 측 단체 구매 방식',
    items: ['주최자가 메뉴를 미리 구매', '행사 참여자에게 무료 제공', '정확한 수량 예측 가능'],
    tag: '기업 행사, 워크샵에 최적',
  },
  {
    id: 2,
    title: '푸드트럭',
    subtitle: '개별 판매 방식',
    items: ['중앙회가 입점료 지불', '행사 참여자가 개별 구매', '다양한 선택권 제공'],
    tag: '축제, 대규모 행사에 최적',
  },
] as const;

// Foodtruck page - Menu section
export const FOODTRUCK_MENU_SECTION = {
  title: '한 도시에서 만나는 세계의 맛',
  subtitle: '한국 세계 음식 푸드트럭 중앙회를 통해 다양한 국가의 음식을 경험할 수 있습니다.',
} as const;

// Foodtruck page - Menu images (12장 - 위 6개, 아래 6개)
export const FOODTRUCK_MENU_IMAGES_ROW1 = [
  { id: 1, image: '/images/foodtruck/menu-1.webp', alt: '메뉴 1' },
  { id: 2, image: '/images/foodtruck/menu-2.webp', alt: '메뉴 2' },
  { id: 3, image: '/images/foodtruck/menu-3.webp', alt: '메뉴 3' },
  { id: 4, image: '/images/foodtruck/menu-4.webp', alt: '메뉴 4' },
  { id: 5, image: '/images/foodtruck/menu-5.webp', alt: '메뉴 5' },
  { id: 6, image: '/images/foodtruck/menu-6.webp', alt: '메뉴 6' },
] as const;

export const FOODTRUCK_MENU_IMAGES_ROW2 = [
  { id: 7, image: '/images/foodtruck/menu-7.webp', alt: '메뉴 7' },
  { id: 8, image: '/images/foodtruck/menu-8.webp', alt: '메뉴 8' },
  { id: 9, image: '/images/foodtruck/menu-9.webp', alt: '메뉴 9' },
  { id: 10, image: '/images/foodtruck/menu-10.webp', alt: '메뉴 10' },
  { id: 11, image: '/images/foodtruck/menu-11.webp', alt: '메뉴 11' },
  { id: 12, image: '/images/foodtruck/menu-12.webp', alt: '메뉴 12' },
] as const;

// Foodtruck page - Menu background image
export const FOODTRUCK_MENU_BG = '/images/foodtruck/menu-bg-globe.webp';

// Foodtruck page - Truck selection section
export const FOODTRUCK_TRUCK_SECTION = {
  title: '행사 규모에 맞게 선택 가능한 트럭',
  subtitle: '소규모 행사부터 대형 축제까지, 행사 환경에 맞는 트럭 구성과 운영 방식을 제공합니다.',
} as const;

// Foodtruck page - Truck cards
export const FOODTRUCK_TRUCK_CARDS = [
  { id: 1, title: '공공·기관 행사', description: '격식을 갖춘 공식 행사', tags: ['#차분', '#단정'], image: '/images/foodtruck/truck-1.webp' },
  { id: 2, title: '기업·사내 행사', description: '사내 복지/브랜딩 행사', tags: ['#모던', '#미니멀'], image: '/images/foodtruck/truck-2.webp' },
  { id: 3, title: '지역·축제 행사', description: '현장 분위기가 활기찬 행사', tags: ['#화려', '#활기'], image: '/images/foodtruck/truck-3.webp' },
] as const;

// Foodtruck page - Banner features
export const FOODTRUCK_BANNER_FEATURES = [
  { id: 1, icon: '/images/foodtruck/icon-kitchen.webp', title: '완벽한 주방 시설', description: '조리에 필요한 모든 장비 완비' },
  { id: 2, icon: '/images/foodtruck/icon-hygiene.webp', title: '위생 인증', description: '식품 위생 기준 충족' },
  { id: 3, icon: '/images/foodtruck/icon-safety.webp', title: '안전 관리', description: '소방 및 안전 설비 구비' },
] as const;

// Foodtruck page - Operation examples section
export const FOODTRUCK_OPERATION_SECTION = {
  title: '실제 운영 예시',
  subtitle: '한국 세계 음식 푸드트럭 중앙회는 다양한 행사 현장에서 함께합니다.',
} as const;

// Foodtruck page - Operation example cards - Row 1 (푸드트럭 5개)
export const FOODTRUCK_OPERATION_ROW1 = [
  { id: 1, title: '큐브 스테이크 푸드트럭', image: '/images/foodtruck/operation-1.webp' },
  { id: 2, title: '감자튀김 푸드트럭', image: '/images/foodtruck/operation-2.webp' },
  { id: 3, title: '분식 푸드트럭', image: '/images/foodtruck/operation-3.webp' },
  { id: 4, title: '오꼬노미야끼 푸드트럭', image: '/images/foodtruck/operation-4.webp' },
  { id: 5, title: '칵테일 푸드트럭', image: '/images/foodtruck/operation-5.webp' },
] as const;

// Foodtruck page - Operation example cards - Row 2 (케이터링 5개)
export const FOODTRUCK_OPERATION_ROW2 = [
  { id: 6, title: '카페 케이터링', image: '/images/foodtruck/operation-6.webp' },
  { id: 7, title: '디저트 케이터링', image: '/images/foodtruck/operation-7.webp' },
  { id: 8, title: '닭강정 케이터링', image: '/images/foodtruck/operation-8.webp' },
  { id: 9, title: '일식 케이터링', image: '/images/foodtruck/operation-9.webp' },
  { id: 10, title: '츄러스 케이터링', image: '/images/foodtruck/operation-10.webp' },
] as const;

// Foodtruck page - CTA section
export const FOODTRUCK_CTA = {
  title: '한국 세계 음식 푸드트럭 중앙회',
  subtitle: '더 알아보기',
  buttonText: '사이트 이동',
  buttonLink: '#', // 외부 URL로 교체 예정
} as const;

// ============================================
// Ecotree Page Data
// ============================================

// Ecotree page - Hero section
export const ECOTREE_HERO = {
  title: '다회용기 운영의 기준을 만들다.',
  subtitle: '에코트리는 다회용기 운영의 전 과정을 직접 설계하고 관리합니다.',
  video: 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/images/ecotree/hero/hero-video.mp4',
} as const;

// Ecotree page - Rental flow steps
export const ECOTREE_RENTAL_FLOW = {
  label: '대여 플로우',
  title: '필요한 만큼 빌리고, 사용 후까지 책임집니다',
  steps: [
    {
      id: 1,
      number: '01',
      title: '대여',
      description: '행사 일정과 규모에 맞춰 필요한 수량의 다회용기를 대여합니다. 옵션과 수량 확정 후 대여를 진행합니다.',
      image: '/images/ecotree/rental-flow/step-01.webp',
    },
    {
      id: 2,
      number: '02',
      title: '세척',
      description: '에코트리만의 전용 세척 공정으로 위생적으로 세척을 진행합니다.',
      image: '/images/ecotree/rental-flow/step-02.webp',
    },
    {
      id: 3,
      number: '03',
      title: '살균 및 소독',
      description: '세척이 끝난 용기는 살균·소독 공정을 한 번 더 거칩니다. 건조 및 정리 후 포장을 합니다.',
      image: '/images/ecotree/rental-flow/step-03.webp',
    },
    {
      id: 4,
      number: '04',
      title: '수거 및 배송',
      description: '사용한 다회용기는 수거 후 다시 에코트리로 반납됩니다.',
      image: '/images/ecotree/rental-flow/step-04.webp',
    },
  ],
} as const;

// Ecotree page - Business range cards
export const ECOTREE_BUSINESS_RANGE = {
  label: '사업 범위',
  title: '다양한 공간과 행사에서 함께합니다.',
  cards: [
    { id: 1, title: '지자체 행사', image: '/images/ecotree/business-range/local-event.webp' },
    { id: 2, title: '기업 행사', image: '/images/ecotree/business-range/corporate-event.webp' },
    { id: 3, title: '스포츠 경기', image: '/images/ecotree/business-range/sports.webp' },
    { id: 4, title: '페스티벌', image: '/images/ecotree/business-range/festival.webp' },
    { id: 5, title: '장례식장', image: '/images/ecotree/business-range/funeral.webp' },
  ],
} as const;

// Ecotree page - Brand transition section
export const ECOTREE_BRAND_TRANSITION = {
  title: '다회용기의 새로운 기준',
  brandName: 'ECOTREE',
  brandIcon: '/images/ecotree/products/eco-icon.webp',
  productImages: '/images/ecotree/products/brand-items.webp',
} as const;

// Ecotree page - Product showcase slides
export const ECOTREE_PRODUCT_SHOWCASE = [
  {
    id: 1,
    englishTitle: 'EVERY\nWHERE',
    koreanTitle: '언제 어디서나',
    image: '/images/ecotree/products/everywhere.webp',
  },
  {
    id: 2,
    englishTitle: 'VARIOUS',
    koreanTitle: '다양한 종류의 다회용기를',
    image: '/images/ecotree/products/various.webp',
  },
  {
    id: 3,
    englishTitle: 'EASY',
    koreanTitle: '간편하고 쉽게\n대여하세요',
    image: '/images/ecotree/products/easy.webp',
  },
] as const;

// Ecotree page - Product video
export const ECOTREE_PRODUCT_VIDEO = {
  video: 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/images/ecotree/products/product-video.mp4',
} as const;

// Ecotree page - Washing process steps (circles)
export const ECOTREE_WASHING_PROCESS = {
  title: '세척 순서',
  subtitle: '위생 기준에 따라 단계별로 관리됩니다.',
  steps: [
    { id: 1, title: '불림', description: '세척물을 예열로 불려\n다음 세척 효율을 높임' },
    { id: 2, title: '수류 초음파\n버블 세척', description: '물 흐름으로 큰 이물질을\n털어내 1차 오염 제거' },
    { id: 3, title: '고온·고압세척', description: '초음파·버블로 미세 오염을\n분해해 틈새까지 세척' },
    { id: 4, title: 'UV살균', description: 'UV로 살균 처리해 위생 강화' },
    { id: 5, title: '고온 열풍 소독', description: '고온 열풍으로 소독 후 빠르게\n건조해 물기 남김 없이 마무리' },
    { id: 6, title: '전수검사', description: '모든 제품 상태를 전수 확인해\n불량·오염 재유입 차단' },
    { id: 7, title: '포장', description: '재오염을 방지하도록\n밀봉 포장해 출고/보관' },
  ],
} as const;

// Ecotree page - Washing facility cards
export const ECOTREE_WASHING_FACILITY = {
  title: '세척 시설 안내',
  subtitle: '전용 세척 시설에서 위생적으로 관리됩니다.',
  cards: [
    {
      id: 1,
      number: '01',
      title: '애벌 세척대',
      description: '음식물 잔여물·기름때 등 굵은 오염 1차 제거',
      image: '/images/ecotree/washing-facility/facility-01.webp',
      overlayHeight: 350,
    },
    {
      id: 2,
      number: '02',
      title: '초음파 세척대',
      description: '미세 오염을 진동으로 분해해 틈새까지 깨끗하게 세척',
      image: '/images/ecotree/washing-facility/facility-02.webp',
      overlayHeight: 300,
    },
    {
      id: 3,
      number: '03',
      title: '외류형 세척대',
      description: '세척 중 발생한 이물 및 거품을 외부로 배출하며 순환 세척',
      image: '/images/ecotree/washing-facility/facility-03.webp',
      overlayHeight: 300,
    },
    {
      id: 4,
      number: '04',
      title: '고압살균세척대',
      description: '고압 살균으로 마무리 단계 청결도 향상',
      image: '/images/ecotree/washing-facility/facility-04.webp',
      overlayHeight: 250,
    },
  ],
} as const;

// Ecotree page - Post washing section
export const ECOTREE_POST_WASHING = {
  title: '세척 후 마무리까지 완벽하게',
  subtitle: '안심하고 다시 사용할 수 있도록 관리됩니다.',
  cards: [
    {
      id: 1,
      title: '살균 건조실',
      description: '세척 후 살균 건조로 수분을 제거',
      image: '/images/ecotree/post-washing/drying-room.webp',
    },
    {
      id: 2,
      title: '진공 포장기',
      description: '진공 포장으로 상태 유지',
      image: '/images/ecotree/post-washing/vacuum-packer.webp',
    },
  ],
} as const;

// Ecotree page - Stats section
export const ECOTREE_STATS = {
  title: '데이터로 확인되는 친환경 성과',
  subtitle: '에코트리의 행사 운영은 환경 개선으로 이어진 실제 성과를 만들어냅니다.',
  backgroundImage: '/images/ecotree/stats-bg.webp',
  stats: [
    { id: 1, label: '탄소 절감 수', value: 1250, unit: '톤' },
    { id: 2, label: '플라스틱 감소', value: 85, unit: '%' },
    { id: 3, label: '일회용품 대체', value: 500000, unit: '개' },
    { id: 4, label: '운영 행사 수', value: 200, unit: '+' },
  ],
} as const;
