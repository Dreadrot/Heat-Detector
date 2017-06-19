export function forecastUrl(city, state) {
	return `http://api.wunderground.com/api/0d3d35e2bbe94a92/forecast/q/${state}/${city}.json`
}