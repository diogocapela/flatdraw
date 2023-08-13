interface Env {
  UNSPLASH_API_ACCESS_KEY: string;
  UNSPLASH_API_SECRET_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);

    const query = url.searchParams.get('query') || '';
    const page = url.searchParams.get('page') || '1';

    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, {
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${context.env.UNSPLASH_API_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      return new Response('Internal Server Error', { status: 500 });
    }

    const responseData = await response.json<{
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
    }>();

    const images = responseData.results.map((image) => ({
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
        url: `${image.user.links.html}?utm_source=Flatdraw&utm_medium=referral`,
      },
      query,
      fetchedAt: new Date().toISOString(),
    }));

    return new Response(
      JSON.stringify({
        total: responseData.total,
        totalPages: responseData.total_pages,
        images,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
