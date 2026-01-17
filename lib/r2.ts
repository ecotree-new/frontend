// Cloudflare R2 Storage URL
export const R2_BASE_URL = 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev';

// Helper function to get R2 URL
export const getR2Url = (path: string) => `${R2_BASE_URL}${path}`;

// R2 Images (큰 이미지들 - 1MB 이상)
export const R2_IMAGES = {
  // Banner images
  problemBanner: getR2Url('/images/problem-banner.jpg'),
  insightBanner: getR2Url('/images/insight-banner.jpg'),
  visionImage: getR2Url('/images/vision.jpeg'),
  missionImage: getR2Url('/images/mission.jpeg'),

  // About images
  aboutPurpose1: getR2Url('/images/about/purpose-1.jpeg'),
  aboutPurpose2: getR2Url('/images/about/purpose-2.jpeg'),
  aboutPurpose3: getR2Url('/images/about/purpose-3.jpeg'),

  // Cases images
  casePlaceholder1: getR2Url('/images/cases/placeholder-1.jpeg'),
  casePlaceholder2: getR2Url('/images/cases/placeholder-2.jpeg'),
  casePlaceholder3: getR2Url('/images/cases/placeholder-3.jpeg'),
  casePlaceholder4: getR2Url('/images/cases/placeholder-4.jpeg'),
  casePlaceholder5: getR2Url('/images/cases/placeholder-5.jpeg'),
  casePlaceholder6: getR2Url('/images/cases/placeholder-6.jpeg'),
  casePlaceholder7: getR2Url('/images/cases/placeholder-7.jpeg'),

  // Foodtruck images
  foodtruckFestival: getR2Url('/images/foodtruck/festival.jpeg'),
  foodtruckCorporate: getR2Url('/images/foodtruck/corporate.jpeg'),
  foodtruckCelebrity: getR2Url('/images/foodtruck/celebrity.jpeg'),
  foodtruckTruck1: getR2Url('/images/foodtruck/truck-1.png'),
  foodtruckTruck2: getR2Url('/images/foodtruck/truck-2.png'),
  foodtruckTruck3: getR2Url('/images/foodtruck/truck-3.png'),
  foodtruckFoodtruck: getR2Url('/images/foodtruck/foodtruck.png'),
  foodtruckOperation1: getR2Url('/images/foodtruck/operation-1.jpg'),
  foodtruckOperation2: getR2Url('/images/foodtruck/operation-2.jpeg'),
  foodtruckOperation3: getR2Url('/images/foodtruck/operation-3.jpg'),
  foodtruckOperation4: getR2Url('/images/foodtruck/operation-4.png'),
  foodtruckOperation5: getR2Url('/images/foodtruck/operation-5.jpg'),
  foodtruckOperation6: getR2Url('/images/foodtruck/operation-6.jpeg'),
  foodtruckOperation7: getR2Url('/images/foodtruck/operation-7.jpg'),
  foodtruckOperation8: getR2Url('/images/foodtruck/operation-8.jpg'),
  foodtruckOperation9: getR2Url('/images/foodtruck/operation-9.jpeg'),
  foodtruckOperation10: getR2Url('/images/foodtruck/operation-10.jpg'),
  foodtruckMenu1: getR2Url('/images/foodtruck/menu-1.jpg'),
  foodtruckMenu2: getR2Url('/images/foodtruck/menu-2.jpg'),
  foodtruckMenu3: getR2Url('/images/foodtruck/menu-3.jpg'),
  foodtruckMenu4: getR2Url('/images/foodtruck/menu-4.jpg'),
  foodtruckMenu5: getR2Url('/images/foodtruck/menu-5.jpg'),
  foodtruckMenu6: getR2Url('/images/foodtruck/menu-6.jpg'),
  foodtruckMenu7: getR2Url('/images/foodtruck/menu-7.jpg'),
  foodtruckMenu8: getR2Url('/images/foodtruck/menu-8.jpg'),
  foodtruckMenu9: getR2Url('/images/foodtruck/menu-9.jpg'),
  foodtruckMenu10: getR2Url('/images/foodtruck/menu-10.jpg'),
  foodtruckMenu11: getR2Url('/images/foodtruck/menu-11.jpg'),
  foodtruckMenu12: getR2Url('/images/foodtruck/menu-12.jpg'),

  // Ecotree images
  ecotreeStatsBg: getR2Url('/images/ecotree/stats-bg.png'),
  ecotreeBrandItems: getR2Url('/images/ecotree/products/brand-items.png'),
  ecotreeEverywhere: getR2Url('/images/ecotree/products/everywhere.png'),
  ecotreeVarious: getR2Url('/images/ecotree/products/various.png'),
  ecotreeEasy: getR2Url('/images/ecotree/products/easy.png'),

  // Ecotree business range
  ecotreeLocalEvent: getR2Url('/images/ecotree/business-range/local-event.jpeg'),
  ecotreeCorporateEvent: getR2Url('/images/ecotree/business-range/corporate-event.jpeg'),
  ecotreeSports: getR2Url('/images/ecotree/business-range/sports.jpeg'),
  ecotreeFestival: getR2Url('/images/ecotree/business-range/festival.jpeg'),
  ecotreeFuneral: getR2Url('/images/ecotree/business-range/funeral.jpeg'),

  // Ecotree rental flow
  ecotreeRentalStep1: getR2Url('/images/ecotree/rental-flow/step-01.jpeg'),
  ecotreeRentalStep2: getR2Url('/images/ecotree/rental-flow/step-02.jpg'),
  ecotreeRentalStep3: getR2Url('/images/ecotree/rental-flow/step-03.jpg'),
  ecotreeRentalStep4: getR2Url('/images/ecotree/rental-flow/step-04.png'),

  // Ecotree washing facility
  ecotreeWashingFacility1: getR2Url('/images/ecotree/washing-facility/facility-01.jpg'),
  ecotreeWashingFacility2: getR2Url('/images/ecotree/washing-facility/facility-02.jpg'),
  ecotreeWashingFacility3: getR2Url('/images/ecotree/washing-facility/facility-03.jpg'),
  ecotreeWashingFacility4: getR2Url('/images/ecotree/washing-facility/facility-04.jpg'),

  // Ecotree post washing
  ecotreeDryingRoom: getR2Url('/images/ecotree/post-washing/drying-room.png'),
  ecotreeVacuumPacker: getR2Url('/images/ecotree/post-washing/vacuum-packer.jpg'),

  // Ecotree icons
  ecotreeEcoIcon: getR2Url('/images/ecotree/products/eco-icon.png'),

  // Foodtruck icons
  foodtruckMenuBg: getR2Url('/images/foodtruck/menu-bg-globe.png'),
  foodtruckIconKitchen: getR2Url('/images/foodtruck/icon-kitchen.png'),
  foodtruckIconHygiene: getR2Url('/images/foodtruck/icon-hygiene.png'),
  foodtruckIconSafety: getR2Url('/images/foodtruck/icon-safety.png'),

  // Posters
  heroPoster: getR2Url('/images/posters/hero-poster.webp'),
  ecotreeHeroPoster: getR2Url('/images/posters/ecotree-hero-poster.webp'),
  productVideoPoster: getR2Url('/images/posters/product-video-poster.webp'),

  // Process icons
  processIcon1: getR2Url('/images/icons/process-1.svg'),
  processIcon2: getR2Url('/images/icons/process-2.svg'),
  processIcon3: getR2Url('/images/icons/process-3.svg'),
  processIcon4: getR2Url('/images/icons/process-4.svg'),

  // Core value icons
  coreValueIcon1: getR2Url('/images/icons/core-value-1.svg'),
  coreValueIcon2: getR2Url('/images/icons/core-value-2.svg'),
  coreValueIcon3: getR2Url('/images/icons/core-value-3.svg'),
  coreValueIcon4: getR2Url('/images/icons/core-value-4.svg'),

  // University logos
  univSeoul: getR2Url('/images/universities/서울대로고.png'),
  univKorea: getR2Url('/images/universities/고려대로고.png'),
  univYonsei: getR2Url('/images/universities/연세대로고.png'),
  univSeoulCity: getR2Url('/images/universities/서울시립대로고.png'),
  univSungkyunkwan: getR2Url('/images/universities/성균관대로고.png'),
  univHanyang: getR2Url('/images/universities/한양대로고.png'),
  univChungang: getR2Url('/images/universities/중앙대로고.png'),
  univKyunghee: getR2Url('/images/universities/경희대로고.png'),
  univHufs: getR2Url('/images/universities/한국외대로고.png'),
  univHongik: getR2Url('/images/universities/홍익대로고.png'),
  univKonkuk: getR2Url('/images/universities/건국대로고.png'),
  univDongguk: getR2Url('/images/universities/동국대로고.png'),
  univDankook: getR2Url('/images/universities/단국대로고.png'),
  univMyongji: getR2Url('/images/universities/명지대로고.png'),
  univCha: getR2Url('/images/universities/차의과대로고.png'),
  univSoongsil: getR2Url('/images/universities/숭실대로고.png'),
  univGachon: getR2Url('/images/universities/가천대로고.png'),
  univSeowon: getR2Url('/images/universities/서원대로고.png'),
  univJeonbuk: getR2Url('/images/universities/전북대로고.png'),
  univFarEast: getR2Url('/images/universities/극동대로고.png'),
  univGongju: getR2Url('/images/universities/국립공주대로고.png'),
  univGongjuEdu: getR2Url('/images/universities/공주교육대로고.png'),
  univKoreaWelfare: getR2Url('/images/universities/한국복지대로고.png'),
  univNamseoul: getR2Url('/images/universities/남서울대로고.png'),
  univYeoju: getR2Url('/images/universities/여주대로고.png'),
  univHanshin: getR2Url('/images/universities/한신대로고.png'),
  univKukje: getR2Url('/images/universities/국제대로고.png'),
  univHanse: getR2Url('/images/universities/한세대로고.png'),
  univYonginArts: getR2Url('/images/universities/용인예술과학대로고.png'),
  univHankyong: getR2Url('/images/universities/한경국립대로고.png'),
  univJoongbu: getR2Url('/images/universities/중부대로고.png'),
  univHowon: getR2Url('/images/universities/호원대로고.png'),
  univKyonggi: getR2Url('/images/universities/경기대로고.png'),
  univSuwon: getR2Url('/images/universities/수원대로고.png'),
  univKangnam: getR2Url('/images/universities/강남대로고.png'),
  univKoreatech: getR2Url('/images/universities/한국공대로고.png'),
  univJeonnam: getR2Url('/images/universities/전남대로고.png'),
  univMokwon: getR2Url('/images/universities/목원대로고.png'),
  univChungnam: getR2Url('/images/universities/충남대로고.png'),
  univJangan: getR2Url('/images/universities/장안대로고.png'),
  univHanyangWomen: getR2Url('/images/universities/한양여대로고.png'),
  univDaejeon: getR2Url('/images/universities/대전대로고.png'),
  univHannam: getR2Url('/images/universities/한남대로고.png'),
  univHansung: getR2Url('/images/universities/한성대로고.png'),
  univAjou: getR2Url('/images/universities/아주대로고.png'),
};

// R2 Videos
export const R2_VIDEOS = {
  heroBackground: getR2Url('/videos/hero-background.mp4'),
  ecotreeHero: getR2Url('/images/ecotree/hero/hero-video.mp4'),
  productVideo: getR2Url('/images/ecotree/products/product-video.mp4'),
};

// R2 Documents
export const R2_DOCUMENTS = {
  ecotreeProposal: getR2Url('/documents/ecotree-proposal.pdf'),
};

// R2 Image path mapping (for dynamic usage with constants)
export const R2_IMAGE_MAP: Record<string, string> = {
  // Banner images
  '/images/problem-banner.jpg': R2_IMAGES.problemBanner,
  '/images/insight-banner.jpg': R2_IMAGES.insightBanner,
  '/images/vision.jpeg': R2_IMAGES.visionImage,
  '/images/mission.jpeg': R2_IMAGES.missionImage,

  // About images
  '/images/about/purpose-1.jpeg': R2_IMAGES.aboutPurpose1,
  '/images/about/purpose-2.jpeg': R2_IMAGES.aboutPurpose2,
  '/images/about/purpose-3.jpeg': R2_IMAGES.aboutPurpose3,

  // Cases images
  '/images/cases/placeholder-1.jpeg': R2_IMAGES.casePlaceholder1,
  '/images/cases/placeholder-2.jpeg': R2_IMAGES.casePlaceholder2,
  '/images/cases/placeholder-3.jpeg': R2_IMAGES.casePlaceholder3,
  '/images/cases/placeholder-4.jpeg': R2_IMAGES.casePlaceholder4,
  '/images/cases/placeholder-5.jpeg': R2_IMAGES.casePlaceholder5,
  '/images/cases/placeholder-6.jpeg': R2_IMAGES.casePlaceholder6,
  '/images/cases/placeholder-7.jpeg': R2_IMAGES.casePlaceholder7,

  // Foodtruck images
  '/images/foodtruck/festival.jpeg': R2_IMAGES.foodtruckFestival,
  '/images/foodtruck/corporate.jpeg': R2_IMAGES.foodtruckCorporate,
  '/images/foodtruck/celebrity.jpeg': R2_IMAGES.foodtruckCelebrity,
  '/images/foodtruck/truck-1.png': R2_IMAGES.foodtruckTruck1,
  '/images/foodtruck/truck-2.png': R2_IMAGES.foodtruckTruck2,
  '/images/foodtruck/truck-3.png': R2_IMAGES.foodtruckTruck3,
  '/images/foodtruck/operation-1.jpg': R2_IMAGES.foodtruckOperation1,
  '/images/foodtruck/operation-2.jpeg': R2_IMAGES.foodtruckOperation2,
  '/images/foodtruck/operation-3.jpg': R2_IMAGES.foodtruckOperation3,
  '/images/foodtruck/operation-4.png': R2_IMAGES.foodtruckOperation4,
  '/images/foodtruck/operation-5.jpg': R2_IMAGES.foodtruckOperation5,
  '/images/foodtruck/operation-6.jpeg': R2_IMAGES.foodtruckOperation6,
  '/images/foodtruck/operation-7.jpg': R2_IMAGES.foodtruckOperation7,
  '/images/foodtruck/operation-8.jpg': R2_IMAGES.foodtruckOperation8,
  '/images/foodtruck/operation-9.jpeg': R2_IMAGES.foodtruckOperation9,
  '/images/foodtruck/operation-10.jpg': R2_IMAGES.foodtruckOperation10,
  '/images/foodtruck/menu-1.jpg': R2_IMAGES.foodtruckMenu1,
  '/images/foodtruck/menu-2.jpg': R2_IMAGES.foodtruckMenu2,
  '/images/foodtruck/menu-3.jpg': R2_IMAGES.foodtruckMenu3,
  '/images/foodtruck/menu-4.jpg': R2_IMAGES.foodtruckMenu4,
  '/images/foodtruck/menu-5.jpg': R2_IMAGES.foodtruckMenu5,
  '/images/foodtruck/menu-6.jpg': R2_IMAGES.foodtruckMenu6,
  '/images/foodtruck/menu-7.jpg': R2_IMAGES.foodtruckMenu7,
  '/images/foodtruck/menu-8.jpg': R2_IMAGES.foodtruckMenu8,
  '/images/foodtruck/menu-9.jpg': R2_IMAGES.foodtruckMenu9,
  '/images/foodtruck/menu-10.jpg': R2_IMAGES.foodtruckMenu10,
  '/images/foodtruck/menu-11.jpg': R2_IMAGES.foodtruckMenu11,
  '/images/foodtruck/menu-12.jpg': R2_IMAGES.foodtruckMenu12,

  // Ecotree images
  '/images/ecotree/stats-bg.png': R2_IMAGES.ecotreeStatsBg,
  '/images/ecotree/products/brand-items.png': R2_IMAGES.ecotreeBrandItems,
  '/images/ecotree/products/everywhere.png': R2_IMAGES.ecotreeEverywhere,
  '/images/ecotree/products/various.png': R2_IMAGES.ecotreeVarious,
  '/images/ecotree/products/easy.png': R2_IMAGES.ecotreeEasy,

  // Ecotree business range
  '/images/ecotree/business-range/local-event.jpeg': R2_IMAGES.ecotreeLocalEvent,
  '/images/ecotree/business-range/corporate-event.jpeg': R2_IMAGES.ecotreeCorporateEvent,
  '/images/ecotree/business-range/sports.jpeg': R2_IMAGES.ecotreeSports,
  '/images/ecotree/business-range/festival.jpeg': R2_IMAGES.ecotreeFestival,
  '/images/ecotree/business-range/funeral.jpeg': R2_IMAGES.ecotreeFuneral,

  // Ecotree rental flow
  '/images/ecotree/rental-flow/step-01.jpeg': R2_IMAGES.ecotreeRentalStep1,
  '/images/ecotree/rental-flow/step-02.jpg': R2_IMAGES.ecotreeRentalStep2,
  '/images/ecotree/rental-flow/step-03.jpg': R2_IMAGES.ecotreeRentalStep3,
  '/images/ecotree/rental-flow/step-04.png': R2_IMAGES.ecotreeRentalStep4,

  // Ecotree washing facility
  '/images/ecotree/washing-facility/facility-01.jpg': R2_IMAGES.ecotreeWashingFacility1,
  '/images/ecotree/washing-facility/facility-02.jpg': R2_IMAGES.ecotreeWashingFacility2,
  '/images/ecotree/washing-facility/facility-03.jpg': R2_IMAGES.ecotreeWashingFacility3,
  '/images/ecotree/washing-facility/facility-04.jpg': R2_IMAGES.ecotreeWashingFacility4,

  // Ecotree post washing
  '/images/ecotree/post-washing/drying-room.png': R2_IMAGES.ecotreeDryingRoom,
  '/images/ecotree/post-washing/vacuum-packer.jpg': R2_IMAGES.ecotreeVacuumPacker,

  // Ecotree icons
  '/images/ecotree/products/eco-icon.png': R2_IMAGES.ecotreeEcoIcon,

  // Foodtruck icons
  '/images/foodtruck/menu-bg-globe.png': R2_IMAGES.foodtruckMenuBg,
  '/images/foodtruck/icon-kitchen.png': R2_IMAGES.foodtruckIconKitchen,
  '/images/foodtruck/icon-hygiene.png': R2_IMAGES.foodtruckIconHygiene,
  '/images/foodtruck/icon-safety.png': R2_IMAGES.foodtruckIconSafety,

  // Posters
  '/images/posters/hero-poster.webp': R2_IMAGES.heroPoster,
  '/images/posters/ecotree-hero-poster.webp': R2_IMAGES.ecotreeHeroPoster,
  '/images/posters/product-video-poster.webp': R2_IMAGES.productVideoPoster,

  // Process icons
  '/images/icons/process-1.svg': R2_IMAGES.processIcon1,
  '/images/icons/process-2.svg': R2_IMAGES.processIcon2,
  '/images/icons/process-3.svg': R2_IMAGES.processIcon3,
  '/images/icons/process-4.svg': R2_IMAGES.processIcon4,

  // Core value icons
  '/images/icons/core-value-1.svg': R2_IMAGES.coreValueIcon1,
  '/images/icons/core-value-2.svg': R2_IMAGES.coreValueIcon2,
  '/images/icons/core-value-3.svg': R2_IMAGES.coreValueIcon3,
  '/images/icons/core-value-4.svg': R2_IMAGES.coreValueIcon4,

  // University logos
  '/images/universities/서울대로고.png': R2_IMAGES.univSeoul,
  '/images/universities/고려대로고.png': R2_IMAGES.univKorea,
  '/images/universities/연세대로고.png': R2_IMAGES.univYonsei,
  '/images/universities/서울시립대로고.png': R2_IMAGES.univSeoulCity,
  '/images/universities/성균관대로고.png': R2_IMAGES.univSungkyunkwan,
  '/images/universities/한양대로고.png': R2_IMAGES.univHanyang,
  '/images/universities/중앙대로고.png': R2_IMAGES.univChungang,
  '/images/universities/경희대로고.png': R2_IMAGES.univKyunghee,
  '/images/universities/한국외대로고.png': R2_IMAGES.univHufs,
  '/images/universities/홍익대로고.png': R2_IMAGES.univHongik,
  '/images/universities/건국대로고.png': R2_IMAGES.univKonkuk,
  '/images/universities/동국대로고.png': R2_IMAGES.univDongguk,
  '/images/universities/단국대로고.png': R2_IMAGES.univDankook,
  '/images/universities/명지대로고.png': R2_IMAGES.univMyongji,
  '/images/universities/차의과대로고.png': R2_IMAGES.univCha,
  '/images/universities/숭실대로고.png': R2_IMAGES.univSoongsil,
  '/images/universities/가천대로고.png': R2_IMAGES.univGachon,
  '/images/universities/서원대로고.png': R2_IMAGES.univSeowon,
  '/images/universities/전북대로고.png': R2_IMAGES.univJeonbuk,
  '/images/universities/극동대로고.png': R2_IMAGES.univFarEast,
  '/images/universities/국립공주대로고.png': R2_IMAGES.univGongju,
  '/images/universities/공주교육대로고.png': R2_IMAGES.univGongjuEdu,
  '/images/universities/한국복지대로고.png': R2_IMAGES.univKoreaWelfare,
  '/images/universities/남서울대로고.png': R2_IMAGES.univNamseoul,
  '/images/universities/여주대로고.png': R2_IMAGES.univYeoju,
  '/images/universities/한신대로고.png': R2_IMAGES.univHanshin,
  '/images/universities/국제대로고.png': R2_IMAGES.univKukje,
  '/images/universities/한세대로고.png': R2_IMAGES.univHanse,
  '/images/universities/용인예술과학대로고.png': R2_IMAGES.univYonginArts,
  '/images/universities/한경국립대로고.png': R2_IMAGES.univHankyong,
  '/images/universities/중부대로고.png': R2_IMAGES.univJoongbu,
  '/images/universities/호원대로고.png': R2_IMAGES.univHowon,
  '/images/universities/경기대로고.png': R2_IMAGES.univKyonggi,
  '/images/universities/수원대로고.png': R2_IMAGES.univSuwon,
  '/images/universities/강남대로고.png': R2_IMAGES.univKangnam,
  '/images/universities/한국공대로고.png': R2_IMAGES.univKoreatech,
  '/images/universities/전남대로고.png': R2_IMAGES.univJeonnam,
  '/images/universities/목원대로고.png': R2_IMAGES.univMokwon,
  '/images/universities/충남대로고.png': R2_IMAGES.univChungnam,
  '/images/universities/장안대로고.png': R2_IMAGES.univJangan,
  '/images/universities/한양여대로고.png': R2_IMAGES.univHanyangWomen,
  '/images/universities/대전대로고.png': R2_IMAGES.univDaejeon,
  '/images/universities/한남대로고.png': R2_IMAGES.univHannam,
  '/images/universities/한성대로고.png': R2_IMAGES.univHansung,
  '/images/universities/아주대로고.png': R2_IMAGES.univAjou,
};
