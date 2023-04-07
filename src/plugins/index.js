const convertImageToBase64URI = async imagePath => {
	try {
		const response = await fetch(imagePath);
		const blob = await response.blob();
		const base64data = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
		});
		return base64data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
function abbreviateNumber(value) {
	if (value < 1) return '';
	if (value < 1000) return value.toString();
	else {
		const suffixes = ['', 'K+', 'M+', 'B+', 'T+'];
		const suffixNum = Math.floor(('' + value).length / 3);
		const shortValue = parseFloat(
			(suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
				2
			)
		);
		return shortValue + suffixes[suffixNum];
	}
}

var startingX, startingY, movingX, movingY;
function touchStart(evt) {
	startingX = evt.touches[0].clientX;
	startingY = evt.touches[0].clientY;
	// console.log(evt);
}
function touchMove(evt) {
	movingX = evt.touches[0].clientX;
	movingY = evt.touches[0].clientY;
}
function touchEnd() {
	if (startingX + 100 < movingX) return 1;
	if (startingX - 100 > movingX) return -1;
}

const plugin = {
	convertImageToBase64URI,
	abbreviateNumber,
	touchStart,
	touchMove,
	touchEnd,
};
export { convertImageToBase64URI, abbreviateNumber };
export { plugin };
