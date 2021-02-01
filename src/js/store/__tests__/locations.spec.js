import locationsInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date';
import api, { Api } from '../../services/apiService';

const countries = [{ code: 'RU', name: 'Russia' }];
const cities = [{ country_code: 'RU', name: 'Krasnodar', code: 'KRR', full_name: 'Краснодар, Россия' }];
const airlines = [{ code: 'I8', name: 'Ижавиа', logo: 'http://pics.avs.io/200/200/I8.png' }];

jest.mock('../../services/apiService', () => {
    const mockApi = {
        countries: jest.fn(() => Promise.resolve([{ code: 'RU', name: 'Russia' }])),
        cities: jest.fn(() => Promise.resolve([
            { country_code: 'RU', name: 'Krasnodar', code: 'KRR', full_name: 'Краснодар, Россия' },
            { country_code: 'RU', name: 'Sankt-Peterburg', code: 'LED', full_name: 'Санкт-Петербург, Россия' }
        ])),
        airlines: jest.fn(() => Promise.resolve([{ code: 'I8', name: 'Ижавиа'}])),
    }

    return {
        Api: jest.fn(() => mockApi)
    }
})

const apiService = new Api()

describe('Locations store tests', () => {

    beforeEach(() => {
        locationsInstance.countries = locationsInstance.serializeCountries(countries)
        locationsInstance.cities = locationsInstance.serializeCities(cities)
        locationsInstance.airlines = locationsInstance.serializeAirlines(airlines)
    })

    it('check locationInstance is instance of Locations class', () => {
        expect(locationsInstance).toBeInstanceOf(Locations);
    })

    it('success locations instance create', () => {
        const instance = new Locations(api, { formatDate })
        expect(instance.countries).toBe(null)
        expect(instance.shortCitiesList).toEqual({})
        expect(instance.formatDate).toEqual(formatDate)
    })

    // it('check correct get city code by key', () => {
        // console.log(typeof locationsInstance.getCityCodeByKey);
        // const res = locationsInstance.getCityCodeByKey('Краснодар, Россия')
        // expect(res).toEqual('KRR')
    // })

    it('check correct serialize countries', () => {
        const res = locationsInstance.serializeCountries(countries)
        const expectedData = {
            RU: { code: 'RU', name: 'Russia' }
        }
        expect(res).toEqual(expectedData)
    })

    it('check serialize countries with incorrect data', () => {
        const res = locationsInstance.serializeCountries(null)
        const expectedData = {}
        expect(res).toEqual(expectedData)
    })

    it('check correct serialize cities', () => {
        const res = locationsInstance.serializeCities(cities)
        const expectedData = {
            KRR: { country_code: 'RU', name: 'Krasnodar', code: 'KRR', country_name: 'Russia', full_name: 'Krasnodar, Russia' }
        }
        expect(res).toEqual(expectedData)
    })

    it('check correct get city by code', () => {
        const res = locationsInstance.getCityNameByCode('KRR')
        expect(res).toEqual('Krasnodar')
    })

    it('check correct get airline name by code', () => {
        const res = locationsInstance.getAirlineNameByCode('I8')
        expect(res).toEqual('Ижавиа')
    })

    it('check correct get airline logo by code', () => {
        const res = locationsInstance.getAirlineLogoByCode('I8')
        expect(res).toEqual('http://pics.avs.io/200/200/I8.png')
    })

    it('check correct call init method', () => {
        const instance = new Locations(apiService, { formatDate })
        expect(instance.init()).resolves.toEqual([countries, cities, airlines])
    })
});