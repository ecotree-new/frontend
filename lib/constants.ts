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
    downloadUrl: '/downloads/ecotree_proposal.pdf',
  },
  {
    id: 2,
    title: '한국 세계음식 푸드트럭 중앙회 제안서',
    date: '2025-12-29',
    downloadUrl: '/downloads/foodtruck_proposal.pdf',
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
    description: '행사 목적과 규모를 알려주세요',
  },
  {
    id: 3,
    number: '03',
    title: '운영 확정 및 준비',
    description: '행사 목적과 규모를 알려주세요',
  },
  {
    id: 4,
    number: '04',
    title: '현장 운영 및 결과 공유',
    description: '행사 목적과 규모를 알려주세요',
  },
] as const;

// Cases page - Ecotree cases
export const ECOTREE_CASES = [
  {
    id: 1,
    label: 'S 기업 행사',
    title: '쓰레기 처리 부담이 줄어\n행사 마무리가 수월했습니다.',
    description: '행사 운영에서 큰 부담 중 하나는 행사 종료 후 쓰레기 처리 였습니다. 다회용기 사용을 도입하며 현장 정리와 쓰레기 처리 부담이 눈에 띄게 줄었고 운영팀은 행사 마무리에만 집중할 수 있었습니다.',
    image: '/images/cases/placeholder-1.jpeg',
    link: '/cases/ecotree-1',
  },
  {
    id: 2,
    label: 'B 지자체 행사',
    title: '행사 내내 공간이 정돈된 상태로\n쾌적하게 유지됐습니다.',
    description: '일회용기를 사용할 때는 식사 후 테이블과 주변 공간에 쓰레기가 빠르게 쌓였지만 다회용기 사용 도입 후 현장 곳곳에서 회수가 가능하면서 행사 공간이 깔끔하게 유지되었습니다.',
    image: '/images/cases/placeholder-2.jpeg',
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
    image: '/images/cases/placeholder-3.jpeg',
    link: '/cases/foodtruck-1',
  },
  {
    id: 2,
    label: 'S 지역 행사',
    title: '메뉴가 겹치지 않아서\n선택하기 편했습니다.',
    description: '보통 푸드트럭 여러 대 들어오면 메뉴가 비슷해지는 경우가 많은데 이번에는 메뉴가 잘 나누어졌습니다. 특정 트럭에만 줄이 몰리지 않아 현장에서 메뉴 관련 민원이 거의 없었습니다.',
    image: '/images/cases/placeholder-4.jpeg',
    link: '/cases/foodtruck-2',
  },
] as const;

// Cases page - Joint cases (동시 운영 사례)
export const JOINT_CASES = [
  {
    id: 1,
    label: 'C 지자체 행사',
    title: '운영이 훨씬\n단순해졌습니다.',
    image: '/images/cases/placeholder-5.jpeg',
    link: '/cases/joint-1',
  },
  {
    id: 2,
    label: 'R 페스티벌',
    title: '현장에서 신경 쓸 게\n줄어들었습니다.',
    image: '/images/cases/placeholder-6.jpeg',
    link: '/cases/joint-2',
  },
  {
    id: 3,
    label: 'H 대학축제',
    title: '행사 위생이 확연히\n깔끔해졌습니다.',
    image: '/images/cases/placeholder-7.jpeg',
    link: '/cases/joint-3',
  },
] as const;

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
  { id: 1, title: '축제', image: '/images/foodtruck/festival.jpeg', objectPosition: 'center bottom' },
  { id: 2, title: '기업 행사', image: '/images/foodtruck/corporate.jpeg', objectPosition: 'center center' },
  { id: 3, title: '연예인 서포트', image: '/images/foodtruck/celebrity.jpeg', objectPosition: 'center center' },
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
  { id: 1, image: '/images/foodtruck/menu-1.jpg', alt: '메뉴 1' },
  { id: 2, image: '/images/foodtruck/menu-2.jpg', alt: '메뉴 2' },
  { id: 3, image: '/images/foodtruck/menu-3.jpg', alt: '메뉴 3' },
  { id: 4, image: '/images/foodtruck/menu-4.jpg', alt: '메뉴 4' },
  { id: 5, image: '/images/foodtruck/menu-5.jpg', alt: '메뉴 5' },
  { id: 6, image: '/images/foodtruck/menu-6.jpg', alt: '메뉴 6' },
] as const;

export const FOODTRUCK_MENU_IMAGES_ROW2 = [
  { id: 7, image: '/images/foodtruck/menu-7.jpg', alt: '메뉴 7' },
  { id: 8, image: '/images/foodtruck/menu-8.jpg', alt: '메뉴 8' },
  { id: 9, image: '/images/foodtruck/menu-9.jpg', alt: '메뉴 9' },
  { id: 10, image: '/images/foodtruck/menu-10.jpg', alt: '메뉴 10' },
  { id: 11, image: '/images/foodtruck/menu-11.jpg', alt: '메뉴 11' },
  { id: 12, image: '/images/foodtruck/menu-12.jpg', alt: '메뉴 12' },
] as const;

// Foodtruck page - Menu background image
export const FOODTRUCK_MENU_BG = '/images/foodtruck/menu-bg-globe.png';

// Foodtruck page - Truck selection section
export const FOODTRUCK_TRUCK_SECTION = {
  title: '다양한 행사에 맞게 선택 가능한 트럭',
  subtitle: '소규모 행사부터 대형 축제까지, 행사 환경에 맞는 트럭 구성과 운영 방식을 제공합니다.',
} as const;

// Foodtruck page - Truck cards
export const FOODTRUCK_TRUCK_CARDS = [
  { id: 1, title: '공공·기관 행사', description: '격식을 갖춘 공식 행사', tags: ['#차분', '#단정'], image: '/images/foodtruck/truck-1.png' },
  { id: 2, title: '기업·사내 행사', description: '사내 복지/브랜딩 행사', tags: ['#모던', '#미니멀'], image: '/images/foodtruck/truck-2.png' },
  { id: 3, title: '지역·축제 행사', description: '현장 분위기가 활기찬 행사', tags: ['#화려', '#활기'], image: '/images/foodtruck/truck-3.png' },
] as const;

// Foodtruck page - Banner features
export const FOODTRUCK_BANNER_FEATURES = [
  { id: 1, icon: '/images/foodtruck/icon-kitchen.png', title: '완벽한 주방 시설', description: '조리에 필요한 모든 장비 완비' },
  { id: 2, icon: '/images/foodtruck/icon-hygiene.png', title: '위생 인증', description: '식품 위생 기준 충족' },
  { id: 3, icon: '/images/foodtruck/icon-safety.png', title: '안전 관리', description: '소방 및 안전 설비 구비' },
] as const;

// Foodtruck page - Operation examples section
export const FOODTRUCK_OPERATION_SECTION = {
  title: '실제 운영 예시',
  subtitle: '한국 세계 음식 푸드트럭 중앙회는 다양한 행사 현장에서 함께합니다.',
} as const;

// Foodtruck page - Operation example cards - Row 1 (푸드트럭 5개)
export const FOODTRUCK_OPERATION_ROW1 = [
  { id: 1, title: '큐브 스테이크 푸드트럭', image: '/images/foodtruck/operation-1.jpg' },
  { id: 2, title: '감자튀김 푸드트럭', image: '/images/foodtruck/operation-2.jpeg' },
  { id: 3, title: '타코 푸드트럭', image: '/images/foodtruck/operation-3.jpg' },
  { id: 4, title: '버거 푸드트럭', image: '/images/foodtruck/operation-4.png' },
  { id: 5, title: '핫도그 푸드트럭', image: '/images/foodtruck/operation-5.jpg' },
] as const;

// Foodtruck page - Operation example cards - Row 2 (케이터링 5개)
export const FOODTRUCK_OPERATION_ROW2 = [
  { id: 6, title: '카페 케이터링', image: '/images/foodtruck/operation-6.jpeg' },
  { id: 7, title: '디저트 케이터링', image: '/images/foodtruck/operation-7.jpg' },
  { id: 8, title: '한식 케이터링', image: '/images/foodtruck/operation-8.jpg' },
  { id: 9, title: '양식 케이터링', image: '/images/foodtruck/operation-9.jpeg' },
  { id: 10, title: '뷔페 케이터링', image: '/images/foodtruck/operation-10.jpg' },
] as const;

// Foodtruck page - CTA section
export const FOODTRUCK_CTA = {
  title: '한국 세계 음식 푸드트럭 중앙회',
  subtitle: '더 알아보기',
  buttonText: '사이트 이동',
  buttonLink: '#', // 외부 URL로 교체 예정
} as const;
