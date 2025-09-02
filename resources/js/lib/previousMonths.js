export default function () {
	const locale = navigator.language || 'default';
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonthIndex = now.getMonth();

	const monthNames = Array.from({ length: 12 }, (_, i) =>
		new Date(2000, i).toLocaleString(locale, { month: 'long' })
	);

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};
	
	const getMonthRange = (year, monthIndex) => {
		const start = new Date(year, monthIndex, 1);
		const end = new Date(year, monthIndex + 1, 0);
		return {
			start: formatDate(start),
			end: formatDate(end)
		};
	};

	const allMonths = Array.from({ length: currentMonthIndex + 1 }, (_, i) => {
		const { start, end } = getMonthRange(currentYear, i);
		return {
			index: i + 1,
			name: capitalize(monthNames[i]),
			start,
			end,
			is_current: i === currentMonthIndex
		};
	});

	return allMonths

}