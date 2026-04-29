export function load({ locals }: { locals: App.Locals }) {
	console.log('LAYOUT USER:', locals.user);

	return {
		user: locals.user
	};
}