import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { UnsplashImage } from '~/config/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    total: number;
    totalPages: number;
    images: UnsplashImage[];
  }>
) {
  try {
    const query: string = (typeof req.query.query === 'string' ? req.query.query?.trim() : req.query.query?.[0]?.trim()) || '';
    const page: string = (typeof req.query.page === 'string' ? req.query.page?.trim() : req.query.page?.[0]?.trim()) || '1';

    const response = await axios<{
      total: number;
      total_pages: number;
      results: {
        id: string;
        created_at: string;
        updated_at: string;
        promoted_at: null;
        width: number;
        height: number;
        color: string;
        blur_hash: string;
        description: string | null;
        alt_description: string | null;
        urls: {
          full: string;
          raw: string;
          regular: string;
          small: string;
          small_s3: string;
          thumb: string;
        };
        links: {
          download: string;
          download_location: string;
          html: string;
          self: string;
        };
        likes: number;
        liked_by_user: boolean;
        current_user_collections: unknown[];
        sponsorship: null;
        topic_submissions: unknown;
        user: {
          accepted_tos: boolean;
          bio: string;
          first_name: string;
          for_hire: boolean;
          id: string;
          instagram_username: string;
          last_name: string;
          links: { self: string; html: string };
          location: string;
          name: string;
          portfolio_url: string;
          profile_image: unknown;
          social: { instagram_username: string; portfolio_url: string };
          total_collections: number;
          total_likes: number;
          total_photos: number;
          twitter_username: null;
          updated_at: string;
          username: string;
        };
        tags: {
          title: string;
          type: string;
        }[];
      }[];
    }>({
      method: 'GET',
      url: `https://api.unsplash.com/search/photos?page=${page}&query=${query}`,
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
      },
    });

    res.status(200).json({
      total: response.data?.total,
      totalPages: response.data?.total_pages,
      images: response.data?.results.map((image) => {
        const unsplashImage: UnsplashImage = {
          id: image.id,
          width: image.width,
          height: image.height,
          unsplashUrl: image.links.html,
          urls: {
            large: image.urls.regular,
            medium: image.urls.small,
            small: image.urls.thumb,
          },
          description: image.description || image.alt_description || '',
          author: {
            name: `${image.user.first_name ?? ''} ${image.user.last_name ?? ''}`.trim(),
          },
          query,
          fetchedAt: new Date().toISOString(),
        };
        return unsplashImage;
      }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
