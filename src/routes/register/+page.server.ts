import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const actions = {
	default: async ({ request, cookies }: { request: Request; cookies: import('@sveltejs/kit').Cookies }) => {
		const data = await request.formData();

		const firstName = data.get('firstName')?.toString().trim();
		const lastName = data.get('lastName')?.toString().trim();
		const email = data.get('email')?.toString().trim().toLowerCase();
		const password = data.get('password')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return fail(400, { error: 'Bitte alle Felder ausfüllen.' });
		}

		if (password !== confirmPassword) {
			return fail(400, { error: 'Passwörter stimmen nicht überein.' });
		}

		const passwordRegex =
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]).{11,}$/;

		if (!passwordRegex.test(password)) {
			return fail(400, {
				error: 'Passwort muss mindestens 11 Zeichen, einen Grossbuchstaben, eine Zahl und ein Sonderzeichen enthalten.'
			});
		}

		const db = await getDb();
		const users = db.collection('users');

		const existingUser = await users.findOne({ email });

		if (existingUser) {
			return fail(409, { error: 'Diese E-Mail ist bereits registriert.' });
		}

		const passwordHash = await bcrypt.hash(password, 12);

		const result = await users.insertOne({
			firstName,
			lastName,
			email,
			passwordHash,
			createdAt: new Date()
		});

		cookies.set('session', result.insertedId.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 7
		});
		cookies.set('justRegistered', 'true', {
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 10
		});
		throw redirect(303, '/?registered=true');
	}
};