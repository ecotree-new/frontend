// Cloudflare R2 Storage URL
export const R2_BASE_URL = 'https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev';

// Helper function to get R2 URL
export const getR2Url = (path: string) => `${R2_BASE_URL}${path}`;

// R2 Images (큰 이미지들 - 1MB 이상)
export const R2_IMAGES = {
  // Banner images
  problemBanner: getR2Url('/images/problem-banner.webp'),
  insightBanner: getR2Url('/images/insight-banner.webp'),
  visionImage: getR2Url('/images/vision.webp'),
  missionImage: getR2Url('/images/mission.webp'),

  // About images
  aboutPurpose1: getR2Url('/images/about/purpose-1.webp'),
  aboutPurpose2: getR2Url('/images/about/purpose-2.webp'),
  aboutPurpose3: getR2Url('/images/about/purpose-3.webp'),

  // Cases images
  casePlaceholder1: getR2Url('/images/cases/placeholder-1.webp'),
  casePlaceholder2: getR2Url('/images/cases/placeholder-2.webp'),
  casePlaceholder3: getR2Url('/images/cases/placeholder-3.webp'),
  casePlaceholder4: getR2Url('/images/cases/placeholder-4.webp'),
  casePlaceholder5: getR2Url('/images/cases/placeholder-5.webp'),
  casePlaceholder6: getR2Url('/images/cases/placeholder-6.webp'),
  casePlaceholder7: getR2Url('/images/cases/placeholder-7.webp'),

  // Foodtruck images
  foodtruckFestival: getR2Url('/images/foodtruck/festival.webp'),
  foodtruckCorporate: getR2Url('/images/foodtruck/corporate.webp'),
  foodtruckCelebrity: getR2Url('/images/foodtruck/celebrity.webp'),
  foodtruckTruck1: getR2Url('/images/foodtruck/truck-1.webp'),
  foodtruckTruck2: getR2Url('/images/foodtruck/truck-2.webp'),
  foodtruckTruck3: getR2Url('/images/foodtruck/truck-3.webp'),
  foodtruckFoodtruck: getR2Url('/images/foodtruck/foodtruck.webp'),
  foodtruckOperation1: getR2Url('/images/foodtruck/operation-1.webp'),
  foodtruckOperation2: getR2Url('/images/foodtruck/operation-2.webp'),
  foodtruckOperation3: getR2Url('/images/foodtruck/operation-3.webp'),
  foodtruckOperation4: getR2Url('/images/foodtruck/operation-4.webp'),
  foodtruckOperation5: getR2Url('/images/foodtruck/operation-5.webp'),
  foodtruckOperation6: getR2Url('/images/foodtruck/operation-6.webp'),
  foodtruckOperation7: getR2Url('/images/foodtruck/operation-7.webp'),
  foodtruckOperation8: getR2Url('/images/foodtruck/operation-8.webp'),
  foodtruckOperation9: getR2Url('/images/foodtruck/operation-9.webp'),
  foodtruckOperation10: getR2Url('/images/foodtruck/operation-10.webp'),
  foodtruckMenu1: getR2Url('/images/foodtruck/menu-1.webp'),
  foodtruckMenu2: getR2Url('/images/foodtruck/menu-2.webp'),
  foodtruckMenu3: getR2Url('/images/foodtruck/menu-3.webp'),
  foodtruckMenu4: getR2Url('/images/foodtruck/menu-4.webp'),
  foodtruckMenu5: getR2Url('/images/foodtruck/menu-5.webp'),
  foodtruckMenu6: getR2Url('/images/foodtruck/menu-6.webp'),
  foodtruckMenu7: getR2Url('/images/foodtruck/menu-7.webp'),
  foodtruckMenu8: getR2Url('/images/foodtruck/menu-8.webp'),
  foodtruckMenu9: getR2Url('/images/foodtruck/menu-9.webp'),
  foodtruckMenu10: getR2Url('/images/foodtruck/menu-10.webp'),
  foodtruckMenu11: getR2Url('/images/foodtruck/menu-11.webp'),
  foodtruckMenu12: getR2Url('/images/foodtruck/menu-12.webp'),

  // Ecotree images
  ecotreeStatsBg: getR2Url('/images/ecotree/stats-bg.webp'),
  ecotreeBrandItems: getR2Url('/images/ecotree/products/brand-items.webp'),
  ecotreeEverywhere: getR2Url('/images/ecotree/products/everywhere.webp'),
  ecotreeVarious: getR2Url('/images/ecotree/products/various.webp'),
  ecotreeEasy: getR2Url('/images/ecotree/products/easy.webp'),

  // Ecotree business range
  ecotreeLocalEvent: getR2Url('/images/ecotree/business-range/local-event.webp'),
  ecotreeCorporateEvent: getR2Url('/images/ecotree/business-range/corporate-event.webp'),
  ecotreeSports: getR2Url('/images/ecotree/business-range/sports.webp'),
  ecotreeFestival: getR2Url('/images/ecotree/business-range/festival.webp'),
  ecotreeFuneral: getR2Url('/images/ecotree/business-range/funeral.webp'),

  // Ecotree rental flow
  ecotreeRentalStep1: getR2Url('/images/ecotree/rental-flow/step-01.webp'),
  ecotreeRentalStep2: getR2Url('/images/ecotree/rental-flow/step-02.webp'),
  ecotreeRentalStep3: getR2Url('/images/ecotree/rental-flow/step-03.webp'),
  ecotreeRentalStep4: getR2Url('/images/ecotree/rental-flow/step-04.webp'),

  // Ecotree washing facility
  ecotreeWashingFacility1: getR2Url('/images/ecotree/washing-facility/facility-01.webp'),
  ecotreeWashingFacility2: getR2Url('/images/ecotree/washing-facility/facility-02.webp'),
  ecotreeWashingFacility3: getR2Url('/images/ecotree/washing-facility/facility-03.webp'),
  ecotreeWashingFacility4: getR2Url('/images/ecotree/washing-facility/facility-04.webp'),

  // Ecotree post washing
  ecotreeDryingRoom: getR2Url('/images/ecotree/post-washing/drying-room.webp'),
  ecotreeVacuumPacker: getR2Url('/images/ecotree/post-washing/vacuum-packer.webp'),

  // Ecotree icons
  ecotreeEcoIcon: getR2Url('/images/ecotree/products/eco-icon.webp'),

  // Foodtruck icons
  foodtruckMenuBg: getR2Url('/images/foodtruck/menu-bg-globe.webp'),
  foodtruckIconKitchen: getR2Url('/images/foodtruck/icon-kitchen.webp'),
  foodtruckIconHygiene: getR2Url('/images/foodtruck/icon-hygiene.webp'),
  foodtruckIconSafety: getR2Url('/images/foodtruck/icon-safety.webp'),

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
  univSeoul: getR2Url('/images/universities/서울대로고.webp'),
  univKorea: getR2Url('/images/universities/고려대로고.webp'),
  univYonsei: getR2Url('/images/universities/연세대로고.webp'),
  univSeoulCity: getR2Url('/images/universities/서울시립대로고.webp'),
  univSungkyunkwan: getR2Url('/images/universities/성균관대로고.webp'),
  univHanyang: getR2Url('/images/universities/한양대로고.webp'),
  univChungang: getR2Url('/images/universities/중앙대로고.webp'),
  univKyunghee: getR2Url('/images/universities/경희대로고.webp'),
  univHufs: getR2Url('/images/universities/한국외대로고.webp'),
  univHongik: getR2Url('/images/universities/홍익대로고.webp'),
  univKonkuk: getR2Url('/images/universities/건국대로고.webp'),
  univDongguk: getR2Url('/images/universities/동국대로고.webp'),
  univDankook: getR2Url('/images/universities/단국대로고.webp'),
  univMyongji: getR2Url('/images/universities/명지대로고.webp'),
  univCha: getR2Url('/images/universities/차의과대로고.webp'),
  univSoongsil: getR2Url('/images/universities/숭실대로고.webp'),
  univGachon: getR2Url('/images/universities/가천대로고.webp'),
  univSeowon: getR2Url('/images/universities/서원대로고.webp'),
  univJeonbuk: getR2Url('/images/universities/전북대로고.webp'),
  univFarEast: getR2Url('/images/universities/극동대로고.webp'),
  univGongju: getR2Url('/images/universities/국립공주대로고.webp'),
  univGongjuEdu: getR2Url('/images/universities/공주교육대로고.webp'),
  univKoreaWelfare: getR2Url('/images/universities/한국복지대로고.webp'),
  univNamseoul: getR2Url('/images/universities/남서울대로고.webp'),
  univYeoju: getR2Url('/images/universities/여주대로고.webp'),
  univHanshin: getR2Url('/images/universities/한신대로고.webp'),
  univKukje: getR2Url('/images/universities/국제대로고.webp'),
  univHanse: getR2Url('/images/universities/한세대로고.webp'),
  univYonginArts: getR2Url('/images/universities/용인예술과학대로고.webp'),
  univHankyong: getR2Url('/images/universities/한경국립대로고.webp'),
  univJoongbu: getR2Url('/images/universities/중부대로고.webp'),
  univHowon: getR2Url('/images/universities/호원대로고.webp'),
  univKyonggi: getR2Url('/images/universities/경기대로고.webp'),
  univSuwon: getR2Url('/images/universities/수원대로고.webp'),
  univKangnam: getR2Url('/images/universities/강남대로고.webp'),
  univKoreatech: getR2Url('/images/universities/한국공대로고.webp'),
  univJeonnam: getR2Url('/images/universities/전남대로고.webp'),
  univMokwon: getR2Url('/images/universities/목원대로고.webp'),
  univChungnam: getR2Url('/images/universities/충남대로고.webp'),
  univJangan: getR2Url('/images/universities/장안대로고.webp'),
  univHanyangWomen: getR2Url('/images/universities/한양여대로고.webp'),
  univDaejeon: getR2Url('/images/universities/대전대로고.webp'),
  univHannam: getR2Url('/images/universities/한남대로고.webp'),
  univHansung: getR2Url('/images/universities/한성대로고.webp'),
  univAjou: getR2Url('/images/universities/아주대로고.webp'),
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
  '/images/problem-banner.webp': R2_IMAGES.problemBanner,
  '/images/insight-banner.webp': R2_IMAGES.insightBanner,
  '/images/vision.webp': R2_IMAGES.visionImage,
  '/images/mission.webp': R2_IMAGES.missionImage,

  // About images
  '/images/about/purpose-1.webp': R2_IMAGES.aboutPurpose1,
  '/images/about/purpose-2.webp': R2_IMAGES.aboutPurpose2,
  '/images/about/purpose-3.webp': R2_IMAGES.aboutPurpose3,

  // Cases images
  '/images/cases/placeholder-1.webp': R2_IMAGES.casePlaceholder1,
  '/images/cases/placeholder-2.webp': R2_IMAGES.casePlaceholder2,
  '/images/cases/placeholder-3.webp': R2_IMAGES.casePlaceholder3,
  '/images/cases/placeholder-4.webp': R2_IMAGES.casePlaceholder4,
  '/images/cases/placeholder-5.webp': R2_IMAGES.casePlaceholder5,
  '/images/cases/placeholder-6.webp': R2_IMAGES.casePlaceholder6,
  '/images/cases/placeholder-7.webp': R2_IMAGES.casePlaceholder7,

  // Foodtruck images
  '/images/foodtruck/festival.webp': R2_IMAGES.foodtruckFestival,
  '/images/foodtruck/corporate.webp': R2_IMAGES.foodtruckCorporate,
  '/images/foodtruck/celebrity.webp': R2_IMAGES.foodtruckCelebrity,
  '/images/foodtruck/truck-1.webp': R2_IMAGES.foodtruckTruck1,
  '/images/foodtruck/truck-2.webp': R2_IMAGES.foodtruckTruck2,
  '/images/foodtruck/truck-3.webp': R2_IMAGES.foodtruckTruck3,
  '/images/foodtruck/operation-1.webp': R2_IMAGES.foodtruckOperation1,
  '/images/foodtruck/operation-2.webp': R2_IMAGES.foodtruckOperation2,
  '/images/foodtruck/operation-3.webp': R2_IMAGES.foodtruckOperation3,
  '/images/foodtruck/operation-4.webp': R2_IMAGES.foodtruckOperation4,
  '/images/foodtruck/operation-5.webp': R2_IMAGES.foodtruckOperation5,
  '/images/foodtruck/operation-6.webp': R2_IMAGES.foodtruckOperation6,
  '/images/foodtruck/operation-7.webp': R2_IMAGES.foodtruckOperation7,
  '/images/foodtruck/operation-8.webp': R2_IMAGES.foodtruckOperation8,
  '/images/foodtruck/operation-9.webp': R2_IMAGES.foodtruckOperation9,
  '/images/foodtruck/operation-10.webp': R2_IMAGES.foodtruckOperation10,
  '/images/foodtruck/menu-1.webp': R2_IMAGES.foodtruckMenu1,
  '/images/foodtruck/menu-2.webp': R2_IMAGES.foodtruckMenu2,
  '/images/foodtruck/menu-3.webp': R2_IMAGES.foodtruckMenu3,
  '/images/foodtruck/menu-4.webp': R2_IMAGES.foodtruckMenu4,
  '/images/foodtruck/menu-5.webp': R2_IMAGES.foodtruckMenu5,
  '/images/foodtruck/menu-6.webp': R2_IMAGES.foodtruckMenu6,
  '/images/foodtruck/menu-7.webp': R2_IMAGES.foodtruckMenu7,
  '/images/foodtruck/menu-8.webp': R2_IMAGES.foodtruckMenu8,
  '/images/foodtruck/menu-9.webp': R2_IMAGES.foodtruckMenu9,
  '/images/foodtruck/menu-10.webp': R2_IMAGES.foodtruckMenu10,
  '/images/foodtruck/menu-11.webp': R2_IMAGES.foodtruckMenu11,
  '/images/foodtruck/menu-12.webp': R2_IMAGES.foodtruckMenu12,

  // Ecotree images
  '/images/ecotree/stats-bg.webp': R2_IMAGES.ecotreeStatsBg,
  '/images/ecotree/products/brand-items.webp': R2_IMAGES.ecotreeBrandItems,
  '/images/ecotree/products/everywhere.webp': R2_IMAGES.ecotreeEverywhere,
  '/images/ecotree/products/various.webp': R2_IMAGES.ecotreeVarious,
  '/images/ecotree/products/easy.webp': R2_IMAGES.ecotreeEasy,

  // Ecotree business range
  '/images/ecotree/business-range/local-event.webp': R2_IMAGES.ecotreeLocalEvent,
  '/images/ecotree/business-range/corporate-event.webp': R2_IMAGES.ecotreeCorporateEvent,
  '/images/ecotree/business-range/sports.webp': R2_IMAGES.ecotreeSports,
  '/images/ecotree/business-range/festival.webp': R2_IMAGES.ecotreeFestival,
  '/images/ecotree/business-range/funeral.webp': R2_IMAGES.ecotreeFuneral,

  // Ecotree rental flow
  '/images/ecotree/rental-flow/step-01.webp': R2_IMAGES.ecotreeRentalStep1,
  '/images/ecotree/rental-flow/step-02.webp': R2_IMAGES.ecotreeRentalStep2,
  '/images/ecotree/rental-flow/step-03.webp': R2_IMAGES.ecotreeRentalStep3,
  '/images/ecotree/rental-flow/step-04.webp': R2_IMAGES.ecotreeRentalStep4,

  // Ecotree washing facility
  '/images/ecotree/washing-facility/facility-01.webp': R2_IMAGES.ecotreeWashingFacility1,
  '/images/ecotree/washing-facility/facility-02.webp': R2_IMAGES.ecotreeWashingFacility2,
  '/images/ecotree/washing-facility/facility-03.webp': R2_IMAGES.ecotreeWashingFacility3,
  '/images/ecotree/washing-facility/facility-04.webp': R2_IMAGES.ecotreeWashingFacility4,

  // Ecotree post washing
  '/images/ecotree/post-washing/drying-room.webp': R2_IMAGES.ecotreeDryingRoom,
  '/images/ecotree/post-washing/vacuum-packer.webp': R2_IMAGES.ecotreeVacuumPacker,

  // Ecotree icons
  '/images/ecotree/products/eco-icon.webp': R2_IMAGES.ecotreeEcoIcon,

  // Foodtruck icons
  '/images/foodtruck/menu-bg-globe.webp': R2_IMAGES.foodtruckMenuBg,
  '/images/foodtruck/icon-kitchen.webp': R2_IMAGES.foodtruckIconKitchen,
  '/images/foodtruck/icon-hygiene.webp': R2_IMAGES.foodtruckIconHygiene,
  '/images/foodtruck/icon-safety.webp': R2_IMAGES.foodtruckIconSafety,

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
  '/images/universities/서울대로고.webp': R2_IMAGES.univSeoul,
  '/images/universities/고려대로고.webp': R2_IMAGES.univKorea,
  '/images/universities/연세대로고.webp': R2_IMAGES.univYonsei,
  '/images/universities/서울시립대로고.webp': R2_IMAGES.univSeoulCity,
  '/images/universities/성균관대로고.webp': R2_IMAGES.univSungkyunkwan,
  '/images/universities/한양대로고.webp': R2_IMAGES.univHanyang,
  '/images/universities/중앙대로고.webp': R2_IMAGES.univChungang,
  '/images/universities/경희대로고.webp': R2_IMAGES.univKyunghee,
  '/images/universities/한국외대로고.webp': R2_IMAGES.univHufs,
  '/images/universities/홍익대로고.webp': R2_IMAGES.univHongik,
  '/images/universities/건국대로고.webp': R2_IMAGES.univKonkuk,
  '/images/universities/동국대로고.webp': R2_IMAGES.univDongguk,
  '/images/universities/단국대로고.webp': R2_IMAGES.univDankook,
  '/images/universities/명지대로고.webp': R2_IMAGES.univMyongji,
  '/images/universities/차의과대로고.webp': R2_IMAGES.univCha,
  '/images/universities/숭실대로고.webp': R2_IMAGES.univSoongsil,
  '/images/universities/가천대로고.webp': R2_IMAGES.univGachon,
  '/images/universities/서원대로고.webp': R2_IMAGES.univSeowon,
  '/images/universities/전북대로고.webp': R2_IMAGES.univJeonbuk,
  '/images/universities/극동대로고.webp': R2_IMAGES.univFarEast,
  '/images/universities/국립공주대로고.webp': R2_IMAGES.univGongju,
  '/images/universities/공주교육대로고.webp': R2_IMAGES.univGongjuEdu,
  '/images/universities/한국복지대로고.webp': R2_IMAGES.univKoreaWelfare,
  '/images/universities/남서울대로고.webp': R2_IMAGES.univNamseoul,
  '/images/universities/여주대로고.webp': R2_IMAGES.univYeoju,
  '/images/universities/한신대로고.webp': R2_IMAGES.univHanshin,
  '/images/universities/국제대로고.webp': R2_IMAGES.univKukje,
  '/images/universities/한세대로고.webp': R2_IMAGES.univHanse,
  '/images/universities/용인예술과학대로고.webp': R2_IMAGES.univYonginArts,
  '/images/universities/한경국립대로고.webp': R2_IMAGES.univHankyong,
  '/images/universities/중부대로고.webp': R2_IMAGES.univJoongbu,
  '/images/universities/호원대로고.webp': R2_IMAGES.univHowon,
  '/images/universities/경기대로고.webp': R2_IMAGES.univKyonggi,
  '/images/universities/수원대로고.webp': R2_IMAGES.univSuwon,
  '/images/universities/강남대로고.webp': R2_IMAGES.univKangnam,
  '/images/universities/한국공대로고.webp': R2_IMAGES.univKoreatech,
  '/images/universities/전남대로고.webp': R2_IMAGES.univJeonnam,
  '/images/universities/목원대로고.webp': R2_IMAGES.univMokwon,
  '/images/universities/충남대로고.webp': R2_IMAGES.univChungnam,
  '/images/universities/장안대로고.webp': R2_IMAGES.univJangan,
  '/images/universities/한양여대로고.webp': R2_IMAGES.univHanyangWomen,
  '/images/universities/대전대로고.webp': R2_IMAGES.univDaejeon,
  '/images/universities/한남대로고.webp': R2_IMAGES.univHannam,
  '/images/universities/한성대로고.webp': R2_IMAGES.univHansung,
  '/images/universities/아주대로고.webp': R2_IMAGES.univAjou,
};
