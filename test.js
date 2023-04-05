const messages = [
	{ id: 1, text: 'Hello', date: new Date('2022-01-01T00:00:00') },
	{ id: 2, text: 'How are you?', date: new Date('2022-01-01T12:00:00') },
	{ id: 3, text: 'Goodbye', date: new Date('2022-01-02T00:00:00') },
	{ id: 4, text: 'See you soon', date: new Date('2022-01-02T12:00:00') },
	{ id: 5, text: 'Take care', date: new Date('2022-01-03T00:00:00') },
];

const groupedMessages = {};
messages.map(message => {
	const dateStr = message.date.toDateString();
	// console.log({ dateStr });
	if (!groupedMessages[dateStr]) {
		groupedMessages[dateStr] = [];
	}
	groupedMessages[dateStr].push(message);
});
console.log({ groupedMessages });
for (const dateStr in groupedMessages) {
	console.log(dateStr);
	const messages = groupedMessages[dateStr];
	messages.forEach(message => {
		console.log(`- ${message.text}`);
	});
}
