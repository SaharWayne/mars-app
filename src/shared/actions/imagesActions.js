export default {

  fetchMarsRoverImages: async (options = { earthDate: '2020-07-14' }) => {
  
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${options?.earthDate}&api_key=DEMO_KEY&page=1`);
    const data = await res.json();
    
    return data?.photos?.map(photo => ({
      alt: `curiousity rover photo from ${photo.earth_date}`,
      src: photo.img_src,
      id: photo.id,
    }));
    
  },
  
};
