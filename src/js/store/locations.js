import api from '../services/apiService';
import { formatDate } from '../helpers/date';

export class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = {};
        this.airlines = {};
        this.formatDate = helpers.formatDate;
    }

    async init() {

        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines()
        ]);

        const [ countries, cities, airlines ] = response;

        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCities(this.cities);
        this.airlines = this.serializeAirlines(airlines);

        return response;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find((item) => item.full_name === key);
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    createShortCities(cities) {
        // { 'City, Country': null }
        // Object.entries на каждой итерации вернет значение из объекта в формате [key, value]
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.full_name] = null;
            return acc;
        }, {})
    }

    serializeCountries(countries) {
        if (!Array.isArray(countries) || !countries.length) return {}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})
    }

    serializeCities(cities) {
        // {'City name, Country name': {...}}
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const full_name = `${city_name}, ${country_name}`;
            city.name = city.name || city.name_translations.en;
            acc[city.code] = {
                ...city,
                country_name,
                full_name
            };
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            const itemCopy = { ...item };
            itemCopy.logo = `http://pics.avs.io/200/200/${itemCopy.code}.png`;
            itemCopy.name = itemCopy.name || itemCopy.name_translations.en;
            acc[itemCopy.code] = itemCopy;
            return acc;
        }, {})
    }

    getCountryNameByCode(code) {
        // {'Country code': {...}}
        return this.countries[code].name;
    }

    getUniqueIdForTicket() {
        const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
        return id;
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        // 
        console.log(response);
        this.lastSearch = this.serializeTickets(response.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map(((ticket) => {
            return {
                ...ticket,
                id: this.getUniqueIdForTicket(),
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm')
            }
        }))
    }
}

const locations = new Locations(api, { formatDate });

export default locations;
