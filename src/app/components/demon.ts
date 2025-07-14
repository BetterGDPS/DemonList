function extractYoutubeId(url: string) {
	const regExp =
		/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = url.match(regExp);
	return match ? match[1] : url;
}

// Пример данных
const demonsRaw = [
	{
		id: 1,
		lvl: 234234,
		lenght: "1:44",
		obj: 1488,
		verifed: "D",
		release: "12.12.12",
		name: "Bloodbath",
		place: 1,
		author: "Riot",
		url: "https://www.youtube.com/watch?v=u9FgRw_3EkE&ab_channel=BIGGEEK",
	},
	{
		id: 2,
		lvl: 4123124,
		lenght: "1:44",
		obj: 1488,
		verifed: "D",
		release: "12.12.12",
		name: "Tartarus",
		place: 2,
		author: "Dolphy",
		url: "https://www.youtube.com/watch?v=u9FgRw_3EkE&ab_channel=BIGGEEK",
	},
	{
		id: 3,
		lvl: 234342,
		lenght: "1:44",
		obj: 1488,
		verifed: "D",
		release: "12.12.12",
		name: "Slaughterhouse",
		place: 3,
		author: "Icedcave",
		url: "https://www.youtube.com/watch?v=u9FgRw_3EkE&ab_channel=BIGGEEK",
	},
	{
		id: 4,
		lvl: 1111,
		lenght: "1:44",
		obj: 1488,
		verifed: "D",
		release: "12.12.12",
		name: "Acheron",
		place: 4,
		author: "Ryamu",
		url: "https://www.youtube.com/watch?v=u9FgRw_3EkE&ab_channel=BIGGEEK",
	},
];

export const demons = demonsRaw.map(demon => ({
	...demon,
	url: extractYoutubeId(demon.url),
}));