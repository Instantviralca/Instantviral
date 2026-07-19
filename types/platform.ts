export type PlatformId = 'instagram' | 'tiktok' | 'youtube' | 'facebook';

export type Platform = {
  id: PlatformId;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  /** Service ids from the Service Registry (no duplicated service objects). */
  serviceIds: string[];
};
