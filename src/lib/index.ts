import * as gravatar from 'gravatar';

export const sanitizeWalletAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
};

export const getGravatar = (val: string) => gravatar.url(val, { s: '200', d: 'retro' }, true);

export const getImageFromUri = async (uri: string) => {
  const apiUrl = `/api/image-fetcher?url=${encodeURIComponent(uri)}`;
  const res = await fetch(apiUrl);
  const blob = await res.blob();
  const buffer = await blob.arrayBuffer();
  return buffer;
};
