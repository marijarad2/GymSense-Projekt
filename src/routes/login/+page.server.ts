import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const actions = {
	default: async ({ request, cookies, url }: { 
		request: Request; 
		cookies: import('@sveltejs/kit').Cookies;
		url: URL;
	}) => {
		const data = await request.formData();

		const email = data.get('email')?.toString().trim().toLowerCase();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { error: 'Bitte E-Mail und Passwort eingeben.' });
		}

		const db = await getDb();
		const users = db.collection('users');

		const user = await users.findOne({ email });

		if (!user) {
			return fail(401, { error: 'Ungültige Anmeldedaten.' });
		}

		const validPassword = await bcrypt.compare(password, user.passwordHash);

		if (!validPassword) {
			return fail(401, { error: 'Ungültige Anmeldedaten.' });
		}

		cookies.set('session', user._id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 7
		});

		const redirectTo = url.searchParams.get('redirect') ?? '/';

		throw redirect(303, redirectTo);
	}
};