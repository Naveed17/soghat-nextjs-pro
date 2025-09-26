export const useSettings = (categories: any[]) => {
  const settings = {
    speed: 300,
    dots: false,
    fade: false,
    arrows: false,
    autoplay: false,
    slidesToShow:
      categories && categories?.length >= 7 ? 7 : categories?.length,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: categories && categories?.length >= 7 ? false : true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            categories && categories?.length >= 6 ? 6 : categories?.length,
          slidesToScroll: 1,
          infinite: false,
          variableWidth: categories && categories?.length >= 6 ? false : true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            categories && categories?.length >= 4 ? 4 : categories?.length,
          slidesToScroll: 1,
          initialSlide: 1,
          variableWidth: categories && categories?.length >= 4 ? false : true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            categories && categories?.length >= 2 ? 2 : categories?.length,
          slidesToScroll: 1,
          variableWidth: categories && categories?.length >= 2 ? false : true,
        },
      },
    ],
  };
  return settings;
};
