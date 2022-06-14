import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
	// redirect users with no valid token to the landing page
	if (event.url.pathname.startsWith('/dashboard')) {
		const cookies = cookie.parse(event.request.headers.get('cookie') || '');
		const authToken = cookies.authToken;

		if (authToken === undefined) {
			return new Response({
				status: 303,
				headers: { Location: '/' }
			});
		}

		try {
			jwt.verify(authToken, import.meta.env.VITE_ACCESS_TOKEN_SECRET);
		} catch (err) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: '/' }
			});
		}
	}

	const response = await resolve(event);
	return response;
}
