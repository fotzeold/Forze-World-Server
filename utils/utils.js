function stripColorCodes(inputString) {
	const colorCodePattern = /§./g;
	const strippedString = inputString.replace(colorCodePattern, '');
	return strippedString;
}

function transformOnlineString(strippedString, roleOrder = ['Бог', 'Герой', 'Авантюрист', 'Новачок']) {
	const lines = strippedString.split('\n');

	const playerLines = lines.filter(line => line.includes(': '))
		.map(line => {
			const parts = line.split(': ');
			return parts[1].split(", ");
		});

	if (playerLines.length <= 0) {
		return "На даний момент на сервері нікого немає!"
	}

	const roleMap = new Map();
	const onlinePlayers = []

	playerLines.forEach(playerLine => {
		onlinePlayers.push(...playerLine)
	});

	onlinePlayers.forEach(playerLine => {
		const match = playerLine.match(/\[([^\]]+)\] (.+)/);
		if (match) {
			const role = match[1];
			const player = match[2];
			if (!roleMap.has(role)) {
				roleMap.set(role, []);
			}

			roleMap.get(role).push(player);
		}
	});

	const flattenedRoleMap = new Map();
	roleMap.forEach((players, role) => {
		players.forEach(player => {
			if (!flattenedRoleMap.has(role)) {
				flattenedRoleMap.set(role, []);
			}
			flattenedRoleMap.get(role).push(player);
		});
	});

	let newMessage = "Онлайн на сервері на даний момент:\n\n";

	roleOrder.forEach(role => {
		if (flattenedRoleMap.has(role)) {
			flattenedRoleMap.get(role).forEach(player => {
				newMessage += `[${role}] ${player}\n`;
			});
		}
	});

	return newMessage.trim();
}

export { stripColorCodes, transformOnlineString }