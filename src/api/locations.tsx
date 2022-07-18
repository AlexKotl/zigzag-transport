import client from './client';

export const searchLocation = (query: string) => {
  return client.get(
    'https://efastatic.vvs.de/umweltrechner/XML_STOPFINDER_REQUEST? outputFormat=rapidJSON&SpEncId=0&coordOutputFormat=EPSG:4326&serverInfo=1&suggestApp=vvs&t ype_sf=any&version=10.2.10.139',
    {
      name_sf: query
    }
  );
};
